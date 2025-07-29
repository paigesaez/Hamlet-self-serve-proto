// Pricing: $50 per governing body (City Council or Planning Commission)
export const PRICE_PER_GOVERNING_BODY = 50;

export const calculatePrice = (totalBodies: number): number => {
  return totalBodies * PRICE_PER_GOVERNING_BODY;
};

export const getTotalBodies = (selectedBodies: Record<string, string[]>): number => {
  return Object.values(selectedBodies).reduce(
    (total: number, bodies: string[]) => total + (bodies?.length || 0), 
    0
  );
};