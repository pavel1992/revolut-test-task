export const isNumberWithTwoDecimal = (val: string): boolean => {
  const regExp = /^[0-9]+(\.[0-9]{1,2})?$/;
  return regExp.test(val);
};
