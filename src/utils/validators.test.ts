import { isEmptyString, isFloatEndingWithZero, isFloatWithoutDecimalPart, isFloatWithoutIntegerPart, isInvalidInput } from './validators';

describe('validators test', () => {
  describe('empty string validator', () => {
    it('should return true for empty string', () => {
      const testVal = '';

      expect(isEmptyString(testVal)).toBe(true);
    });

    it('should return false for any non-empty value', () => {
      const testVal = '21';

      expect(isEmptyString(testVal)).toBe(false);
    });
  });

  describe('is float without decimal part', () => {
    it('should return true for values with numeric integer part and delimiter at the end', () => {
      const testVal = '2.';

      expect(isFloatWithoutDecimalPart(testVal)).toBe(true);
    });

    it('should return false for values with non-numeric integer part and delimiter at the end', () => {
      const testVal = 's.';

      expect(isFloatWithoutDecimalPart(testVal)).toBe(false);
    });

    it('should return false for values with numeric integer part and more than one delimiter at the end', () => {
      const testVal = '2..';

      expect(isFloatWithoutDecimalPart(testVal)).toBe(false);
    });
  });

  describe('is float without integer part', () => {
    it('should return true for values with valid decimal started by 1 delimiter', () => {
      const testVal = '.2';

      expect(isFloatWithoutIntegerPart(testVal)).toBe(true);
    });

    it('should return false for values with valid decimal started by more than 1 delimiters', () => {
      const testVal = '..2';

      expect(isFloatWithoutIntegerPart(testVal)).toBe(false);
    });

    it('should return false for values with valid decimal with invalid integer part', () => {
      const testVal = '2s.2';

      expect(isFloatWithoutIntegerPart(testVal)).toBe(false);
    })
  });

  describe('is float with 0 in decimal part', () => {
    it('should return true for numbers with valid integer and 0 in decimal parts', () => {
      const testVal = '2.0';

      expect(isFloatEndingWithZero(testVal)).toBe(true);
    });

    it('should return false for any other value', () => {
      const testValWithMultiZeroDecimal = '2.00';
      const testValDecimalNonNumber = '2.0s';
      const testValIntegerNonNumber = 's3.0';

      expect(isFloatEndingWithZero(testValWithMultiZeroDecimal)).toBe(false);
      expect(isFloatEndingWithZero(testValDecimalNonNumber)).toBe(false);
      expect(isFloatEndingWithZero(testValIntegerNonNumber)).toBe(false);
    });
  });

  describe('is invalid input', () => {
    it('should return false for correct integer', () => {
      const testVal = '2';

      expect(isInvalidInput(testVal)).toBe(false);
    });

    it('should return false for correct float', () => {
      const testVal = '2.0';

      expect(isInvalidInput(testVal)).toBe(false);
    });

    it('should return true for any other values', () => {
      const testValString = 'ss';
      const testValNegative = '-20';
      const testValDecimalNonNumber = '2.s';
      const testValIntegerNonNumber = 's3.0';

      expect(isInvalidInput(testValString)).toBe(true);
      expect(isInvalidInput(testValNegative)).toBe(true);
      expect(isInvalidInput(testValDecimalNonNumber)).toBe(true);
      expect(isInvalidInput(testValIntegerNonNumber)).toBe(true);
    })
  })
});
