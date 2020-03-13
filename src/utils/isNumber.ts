export const isNumber = (val: string): boolean => {
  const regExp = /^[1-9]\d*(\.\d+)?$/;
  return regExp.test(val);
}