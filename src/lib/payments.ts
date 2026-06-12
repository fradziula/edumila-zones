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
 * MOCK integracji Przelewy24.
 *
 * Docelowo: ta funkcja powinna wywoływać własną edge function
 * (np. POST /functions/v1/p24-create-transaction) z `payload`.
 * Edge function tworzy transakcję w API Przelewy24 (endpoint
 * `/api/v1/transaction/register`), używając sekretnych: P24_POS_ID,
 * P24_CRC, P24_API_KEY, P24_MERCHANT_ID. W odpowiedzi dostaje token,
 * z którego buduje paymentUrl:
 *   https://secure.przelewy24.pl/trnRequest/{token}    (live)
 *   https://sandbox.przelewy24.pl/trnRequest/{token}   (sandbox)
 * Zwróć `{ paymentUrl }` do frontendu, a tu zrób `window.location.href = paymentUrl`.
 *
 * Webhook statusu (POST z P24) -> osobna edge function /p24-status,
 * która weryfikuje transakcję (`/api/v1/transaction/verify`) i zapisuje
 * status zamówienia w bazie.
 */
export async function startPayment(payload: OrderPayload): Promise<{ paymentUrl: string }> {
  // eslint-disable-next-line no-console
  console.log("[startPayment] MOCK payload", payload);
  await new Promise((r) => setTimeout(r, 700));
  // TODO: zamień na realne wywołanie backendu Przelewy24.
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