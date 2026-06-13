// Wysyłka maila z formularza Prezent.
// Wywołuje edge function `send-form-email`, która używa Resend po stronie
// serwera (RESEND_API_KEY nigdy nie trafia do frontu).
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';

const Schema = z.object({
  studentName: z.string().min(1).max(200),
  phone: z.string().min(1).max(50),
  email: z.string().email().max(254),
  packageId: z.string().min(1).max(100),
  lessonsCount: z.number().int().min(1).max(100),
  pricePln: z.number().int().min(1).max(100000),
});

export type SendGiftEmailInput = z.infer<typeof Schema>;

export const sendGiftEmail = async (data: SendGiftEmailInput) => {
  const parsed = Schema.parse(data);
  const { data: res, error } = await supabase.functions.invoke('send-form-email', {
    body: { kind: 'gift', ...parsed },
  });
  if (error) {
    throw new Error(error.message || 'Nie udało się wysłać wiadomości.');
  }
  if (!res?.ok) {
    throw new Error(
      `Wysyłka nie powiodła się: ${res?.error ?? 'unknown'}${res?.details ? ` (${JSON.stringify(res.details)})` : ''}`,
    );
  }
  return { ok: true as const };
};
