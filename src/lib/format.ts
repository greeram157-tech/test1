export const formatPrice = (price: number, status?: string): string => {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
  return status === 'For Rent' ? `${formatted}/mo` : formatted;
};

export const formatArea = (area: number): string =>
  `${new Intl.NumberFormat('en-US').format(area)} sq ft`;

export const formatCompact = (value: number): string =>
  new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(
    value,
  );

/** Standard amortising mortgage payment. */
export const monthlyPayment = (
  principal: number,
  annualRatePercent: number,
  years: number,
): number => {
  const monthlyRate = annualRatePercent / 100 / 12;
  const payments = years * 12;
  if (monthlyRate === 0) return principal / payments;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, payments)) /
    (Math.pow(1 + monthlyRate, payments) - 1)
  );
};
