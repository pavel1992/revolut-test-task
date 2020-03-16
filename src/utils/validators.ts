import { isNumberWithTwoDecimal } from './isNumberWithTwoDecimal';

export const isEmptyString = (val: string): boolean => {
  return val === '';
};

/**
 * Checks if given value is string ended with decimal separator and has valid integer part
 * valid value example '.2'
 * @param val
 */
export const isFloatWithoutDecimalPart = (val: string): boolean => {
  const [integerPart, decimalPart, ...rest] = val.split('.');
  if (!isNumberWithTwoDecimal(integerPart)) {
    return false;
  }

  if (decimalPart !== '') {
    return false;
  }

  return rest.length === 0;

};

/**
 * Checks if given value is string started with decimal separator and has valid decomal part
 * @param val
 */
export const isFloatWithoutIntegerPart = (val: string): boolean => {
  const [integerPart, decimalPart, ...rest] = val.split('.');
  if (!isNumberWithTwoDecimal(decimalPart)) {
    return false;
  }

  if (integerPart !== '') {
    return false;
  }

  return rest.length === 0;
};


/**
 * Checks if given value is valid float string with 0 in decimal part
 * @param val
 */
export const isFloatEndingWithZero = (val: string): boolean => {
  const [integerPart, decimalPart, ...rest] = val.split('.');
  if (!isNumberWithTwoDecimal(integerPart)) {
    return false;
  }

  if (decimalPart !== '0') {
    return false;
  }

  return rest.length === 0;
};

/**
 * Checks if given value is not a float string
 * @param val
 */
export const isInvalidInput = (val: string): boolean => {
  return !isNumberWithTwoDecimal(val)
    || (val.split('.').length > 1 && val.split('.')[1].length > 2);
};
