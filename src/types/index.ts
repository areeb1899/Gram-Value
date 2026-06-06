export type Unit = 'mg' | 'g' | 'kg';

export interface CalculationRecord {
  id: string;
  pricePerKg: string;
  weight: string;
  unit: Unit;
  totalPrice: number;
  timestamp: number;
}

export type ThemeType = 'light' | 'dark' | 'system';
