// Edge function: wysyła wiadomości z formularzy (kontakt + prezent)
// przez Resend connector gateway. RESEND_API_KEY i LOVABLE_API_KEY
// są dostarczone przez Lovable Cloud — NIE używamy żadnego klucza po
// stronie frontendu.
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.23.8';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend/emails';

const ContactSchema = z.object({
  kind: z.literal('contact'),
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().max(200).optional().default(''),
  message: z.string().trim().min(1).max(5000),
});

const GiftSchema = z.object({
  kind: z.literal('gift'),
  studentName: z.string().trim().min(1).max(200),
  phone: z.string().trim().min(1).max(50),
  email: z.string().trim().email().max(254),
  packageId: z.string().trim().min(1).max(100),
  lessonsCount: z.number().int().min(1).max(100),
  pricePln: z.number().int().min(1).max(100000),
});

const BodySchema = z.discriminatedUnion('kind', [ContactSchema, GiftSchema]);

// === KONFIGURACJA ADRESÓW (jedno miejsce) ===
// MAIL_FROM  — nadawca. MUSI być z domeny zweryfikowanej w Resend.
//              Po weryfikacji edumila.pl ustaw w Cloud → Secrets:
//                MAIL_FROM = "EduMila <kontakt@edumila.pl>"
//              Dopóki secret nie jest ustawiony, używamy sandboxowego
//              `onboarding@resend.dev` (działa zawsze, ale tylko w trybie testowym).
// MAIL_TO    — odbiorca (skrzynka, na którą trafiają wiadomości z formularzy).
//              Domyślnie `edumila.kontakt@gmail.com`. Zmień przez secret
//                MAIL_TO = "biuro@edumila.pl"
const FROM = Deno.env.get('MAIL_FROM') ?? 'EduMila <onboarding@resend.dev>';
const TO = Deno.env.get('MAIL_TO') ?? 'edumila.kontakt@gmail.com';

function esc(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
}

function renderHtml(payload: z.infer<typeof BodySchema>): { subject: string; html: string; replyTo: string } {
  if (payload.kind === 'contact') {
    const subject = `[edumila.pl] Wiadomość od ${payload.name}${payload.subject ? ` — ${payload.subject}` : ''}`;
    const html = `
      <h2>Nowa wiadomość z formularza kontaktowego</h2>
      <p><b>Imię:</b> ${esc(payload.name)}</p>
      <p><b>E-mail:</b> ${esc(payload.email)}</p>
      ${payload.subject ? `<p><b>Temat:</b> ${esc(payload.subject)}</p>` : ''}
      <p><b>Wiadomość:</b></p>
      <pre style="white-space:pre-wrap;font-family:inherit">${esc(payload.message)}</pre>
    `;
    return { subject, html, replyTo: payload.email };
  }
  const subject = `[edumila.pl] Nowe zamówienie prezentu — ${payload.lessonsCount} lekcji (${payload.pricePln} zł)`;
  const html = `
    <h2>Nowe zgłoszenie z formularza Prezent</h2>
    <p><b>Uczeń:</b> ${esc(payload.studentName)}</p>
    <p><b>Telefon:</b> ${esc(payload.phone)}</p>
    <p><b>E-mail:</b> ${esc(payload.email)}</p>
    <p><b>Pakiet:</b> ${esc(payload.packageId)} — ${payload.lessonsCount} lekcji</p>
    <p><b>Kwota:</b> ${payload.pricePln} zł</p>
  `;
  return { subject, html, replyTo: payload.email };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ ok: false, error: 'missing_resend_connection' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const raw = await req.json();
    const parsed = BodySchema.safeParse(raw);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ ok: false, error: 'invalid_input', details: parsed.error.flatten() }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const { subject, html, replyTo } = renderHtml(parsed.data);

    const res = await fetch(GATEWAY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: replyTo,
        subject,
        html,
      }),
    });

    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error('[send-form-email] Resend error', res.status, body);
      return new Response(
        JSON.stringify({ ok: false, error: 'resend_failed', status: res.status, details: body }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }
    return new Response(JSON.stringify({ ok: true, id: body?.id ?? null }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[send-form-email] unexpected error', err);
    return new Response(
      JSON.stringify({ ok: false, error: 'unexpected', message: String((err as Error)?.message ?? err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});