export const getExchangeRate = (sellingRateToBase: number, buyingRateToBase: number): number => {
  if (sellingRateToBase === 0 || buyingRateToBase === 0) {
    throw Error('wrong rates given, rate can not be 0');
  }
  return sellingRateToBase / buyingRateToBase;
};
