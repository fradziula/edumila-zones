import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const RECIPIENT = "ciasfrancek@gmial.com";

const Schema = z.object({
  studentName: z.string().min(1).max(200),
  phone: z.string().min(1).max(50),
  email: z.string().email().max(254),
  packageId: z.string().min(1).max(100),
  lessonsCount: z.number().int().min(1).max(100),
  pricePln: z.number().int().min(1).max(100000),
});

export const sendGiftEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Schema.parse(input))
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const esc = (s: string) =>
      s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

    const html = `
      <h2>Nowe zgłoszenie — Prezent</h2>
      <p><strong>Imię ucznia:</strong> ${esc(data.studentName)}</p>
      <p><strong>Telefon:</strong> ${esc(data.phone)}</p>
      <p><strong>Email:</strong> ${esc(data.email)}</p>
      <hr />
      <p><strong>Pakiet:</strong> ${esc(data.packageId)}</p>
      <p><strong>Liczba lekcji:</strong> ${data.lessonsCount}</p>
      <p><strong>Cena:</strong> ${data.pricePln} zł</p>
    `;

    const response = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "EduMila <onboarding@resend.dev>",
        to: [RECIPIENT],
        reply_to: data.email,
        subject: `Prezent — ${data.lessonsCount} lekcji (${data.pricePln} zł) — ${data.studentName}`,
        html,
      }),
    });

    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(`Resend API failed [${response.status}]: ${JSON.stringify(body)}`);
    }
    return { ok: true as const };
  });