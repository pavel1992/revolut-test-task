/**
 * rounds any number to two decimals. Floor is used because we are talking about money, and I think it's better to loose
 * pennies than pay to customer by yourself
 * @param numberToRound
 */
export const roundToTwoDecimals = (numberToRound: number): number => {
  return Math.floor(numberToRound * 100) / 100;
};
