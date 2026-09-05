import { splitViaPayment, VIA_PAYMENT_CONFIG } from "./payment-routing";

const cases = [
  { total: 0, ouwepiet: 0, desomunt: 0 },
  { total: 499, ouwepiet: 499, desomunt: 0 },
  { total: 500, ouwepiet: 500, desomunt: 0 },
  { total: 501, ouwepiet: 500, desomunt: 1 },
  { total: 1250, ouwepiet: 500, desomunt: 750 },
] as const;

for (const testCase of cases) {
  const result = splitViaPayment(testCase.total);
  if (
    result.ouwePietCents !== testCase.ouwepiet ||
    result.desomuntCents !== testCase.desomunt
  ) {
    throw new Error(`Unexpected split for ${testCase.total} cents`);
  }
}

if (VIA_PAYMENT_CONFIG.thresholdCents !== 500) {
  throw new Error("VIA threshold must be EUR 5,00");
}
