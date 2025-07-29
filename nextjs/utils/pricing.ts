export const calculatePrice = (totalBodies: number): number => {
  return Math.ceil(totalBodies / 20) * 1000; // $1,000 per 20 governing bodies
};

export const getTotalBodies = (selectedBodies: Record<string, string[]>): number => {
  return Object.values(selectedBodies).reduce(
    (total: number, bodies: string[]) => total + (bodies?.length || 0), 
    0
  );
};