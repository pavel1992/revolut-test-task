/**
 * rounds any number to two decimals.
 * @param numberToRound
 * @param decimalsLength how many decimals numbers should be
 */
export const roundToDecimals = (numberToRound: number, decimalsLength: number = 2): number => {
  return Math.round(numberToRound * Math.pow(10 , decimalsLength)) / Math.pow(10 , decimalsLength);
};
