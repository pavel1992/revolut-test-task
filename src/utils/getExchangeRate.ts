/**
 * Returns exchange rate between two currencies, throws error if some rate is 0
 * @param sellingRateToBase
 * @param buyingRateToBase
 */
export const getExchangeRate = (sellingRateToBase: number, buyingRateToBase: number): number => {
  if (sellingRateToBase === 0 || buyingRateToBase === 0) {
    throw Error('wrong rates given, rate can not be 0');
  }
  return sellingRateToBase / buyingRateToBase;
};
