
export type PriceLevel = 'low' | 'medium' | 'high';

export const priceLevelToSymbol: Record<PriceLevel, string> = {
  low: '₹',
  medium: '₹₹',
  high: '₹₹₹',
};

// reverse mapping
export const symbolToPriceLevel: Record<string, PriceLevel> = {
  '₹': 'low',
  '₹₹': 'medium',
  '₹₹₹': 'high',
};
