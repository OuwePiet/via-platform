export const VIA_PAYMENT_CONFIG = {
  currency: "EUR",
  baseRecipient: {
    name: "OuwePiet",
    publicKey:
      "BC1YLiYZREAeJgL4337px5oGWDr1c5KKRNdd4mU5b4DKTG6MdMzqt3Q",
  },
  excessRecipient: {
    name: "desomunt",
    publicKey:
      "BC1YLgeR5kPmvUf2cX3cG7DArso7Dch7w8pFdUMtfAg9kSS8vxZx9At",
  },
  thresholdCents: 500,
} as const;

export type ViaPaymentSplit = {
  totalCents: number;
  ouwePietCents: number;
  desomuntCents: number;
};

/**
 * Splitst een VIA-bedrag volgens de voorlopige basisregel:
 * - de eerste EUR 5,00 gaat naar OuwePiet;
 * - alles boven EUR 5,00 gaat naar desomunt.
 *
 * Gebruik uitsluitend bedragen in hele eurocenten. Valuta-omrekening naar EUR
 * hoort vóór deze functie plaats te vinden tegen de koers die voor de
 * transactie is vastgezet.
 */
export function splitViaPayment(totalCents: number): ViaPaymentSplit {
  if (!Number.isSafeInteger(totalCents) || totalCents < 0) {
    throw new RangeError("totalCents must be a non-negative safe integer");
  }

  const ouwePietCents = Math.min(
    totalCents,
    VIA_PAYMENT_CONFIG.thresholdCents,
  );
  const desomuntCents = Math.max(
    totalCents - VIA_PAYMENT_CONFIG.thresholdCents,
    0,
  );

  return {
    totalCents,
    ouwePietCents,
    desomuntCents,
  };
}
