import type { Package } from "./packages";

export type CustomerData = {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  nip?: string;
};

export type OrderPayload = {
  item: {
    packageId: string;
    name: string;
    priceGross: number;
    currency: "PLN";
    quantity: number;
    lessonsCount: number;
  };
  totalGross: number;
  customer: CustomerData;
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
};

/**
 * ⚠️ MOCK integracji Przelewy24 — JEDYNE miejsce do podmiany na prawdziwe P24.
 *
 * Jak podpiąć produkcyjne P24:
 * 1) Utwórz edge function `supabase/functions/p24-create-transaction/index.ts`,
 *    która woła `POST https://secure.przelewy24.pl/api/v1/transaction/register`
 *    (lub `https://sandbox.przelewy24.pl/...` w trybie testowym), używając
 *    secretów: P24_POS_ID, P24_MERCHANT_ID, P24_CRC, P24_API_KEY.
 *    Dodaj je w Cloud → Secrets.
 * 2) Zamień ciało tej funkcji na:
 *
 *      const { data, error } = await supabase.functions.invoke(
 *        'p24-create-transaction',
 *        { body: payload },
 *      );
 *      if (error || !data?.paymentUrl) throw new Error('P24 register failed');
 *      return { paymentUrl: data.paymentUrl };
 *
 * 3) W `src/routes/zakup.tsx` (handlePay) zamień ekran sukcesu na:
 *      window.location.href = paymentUrl;
 * 4) Dodaj drugą edge function `p24-status` (webhook), która weryfikuje
 *    transakcję przez `/api/v1/transaction/verify` i zapisuje status w bazie.
 */
export async function startPayment(payload: OrderPayload): Promise<{ paymentUrl: string }> {
  // eslint-disable-next-line no-console
  console.log("[startPayment] MOCK payload", payload);
  await new Promise((r) => setTimeout(r, 700));
  // TODO(P24): zamień na realne wywołanie edge function `p24-create-transaction`.
  return { paymentUrl: "/zakup?status=mock-success" };
}

export function buildOrderPayload(
  pkg: Package,
  quantity: number,
  customer: CustomerData,
  acceptedTerms: boolean,
  acceptedPrivacy: boolean,
): OrderPayload {
  return {
    item: {
      packageId: pkg.id,
      name: pkg.name,
      priceGross: pkg.priceGross,
      currency: "PLN",
      quantity,
      lessonsCount: pkg.lessonsCount,
    },
    totalGross: pkg.priceGross * quantity,
    customer,
    acceptedTerms,
    acceptedPrivacy,
  };
}