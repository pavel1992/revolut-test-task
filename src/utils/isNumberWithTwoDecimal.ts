/**
 * Validates string to be integer or float number with 2 or less decimal digits
 * @param val
 */
export const isNumberWithTwoDecimal = (val: string): boolean => {
  const regExp = /^[0-9]+(\.[0-9]{1,2})?$/;
  return regExp.test(val);
};
