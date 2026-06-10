// NOTE: This was a TanStack Start server function.
// On GitHub Pages (static hosting), email sending requires a separate backend
// (e.g., Vercel Functions, Netlify Functions, or Cloudflare Workers).
// This stub allows the frontend to compile. Replace with your backend API URL.

import { z } from 'zod';

const Schema = z.object({
  studentName: z.string().min(1).max(200),
  phone: z.string().min(1).max(50),
  email: z.string().email().max(254),
  packageId: z.string().min(1).max(100),
  lessonsCount: z.number().int().min(1).max(100),
  pricePln: z.number().int().min(1).max(100000),
});

export type SendGiftEmailInput = z.infer<typeof Schema>;

// Replace BACKEND_URL with your actual backend endpoint when ready.
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? '';

export const sendGiftEmail = async ({ data }: { data: SendGiftEmailInput }) => {
  const parsed = Schema.parse(data);

  if (!BACKEND_URL) {
    // In static deploy without backend, skip email sending
    console.warn('VITE_BACKEND_URL not set — email sending disabled in static mode.');
    return { ok: true as const };
  }

  const response = await fetch(`${BACKEND_URL}/emails`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed),
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`API failed [${response.status}]: ${JSON.stringify(body)}`);
  }
  return { ok: true as const };
};
