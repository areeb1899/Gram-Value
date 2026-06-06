import { Unit } from '../types';

export const calculatePrice = (pricePerKg: string, weight: string, unit: Unit): number => {
  const price = parseFloat(pricePerKg);
  const w = parseFloat(weight);

  if (isNaN(price) || isNaN(w) || price < 0 || w < 0) {
    return 0;
  }

  let weightInGrams = 0;
  if (unit === 'kg') {
    weightInGrams = w * 1000;
  } else if (unit === 'g') {
    weightInGrams = w;
  } else if (unit === 'mg') {
    weightInGrams = w / 1000;
  }

  return (price * weightInGrams) / 1000;
};

export const calculateWeightFromPrice = (pricePerKg: string, totalPrice: string, unit: Unit): number => {
  const price = parseFloat(pricePerKg);
  const total = parseFloat(totalPrice);

  if (isNaN(price) || isNaN(total) || price <= 0 || total < 0) {
    return 0;
  }

  // total = (price * weightInGrams) / 1000
  // weightInGrams = (total * 1000) / price
  const weightInGrams = (total * 1000) / price;

  if (unit === 'kg') {
    return weightInGrams / 1000;
  } else if (unit === 'g') {
    return weightInGrams;
  } else if (unit === 'mg') {
    return weightInGrams * 1000;
  }
  
  return 0;
};

export const formatCurrency = (amount: number): string => {
  return `₹ ${amount.toFixed(2).replace(/\\d(?=(\\d{3})+\\.)/g, '$&,')}`;
};
