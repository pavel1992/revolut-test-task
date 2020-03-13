/**
 * rounds any number to two decimals.
 * @param numberToRound
 */
export const roundToTwoDecimals = (numberToRound: number): number => {
  return Math.round(numberToRound * 100) / 100;
};
