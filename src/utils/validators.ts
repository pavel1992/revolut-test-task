import { isNumberWithTwoDecimal } from './isNumberWithTwoDecimal';

export const isEmptyString = (val: string): boolean => {
  return val === '';
};

// checking for 2. values
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

// checking for .2 values
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


// checking for 2.0 etc inputs
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

// checking for non-numeric input or third decimal
export const isInvalidInput = (val: string): boolean => {
  return !isNumberWithTwoDecimal(val)
    || (val.split('.').length > 1 && val.split('.')[1].length > 2);
};
