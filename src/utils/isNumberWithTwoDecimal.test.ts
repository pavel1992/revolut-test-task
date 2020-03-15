import { isNumberWithTwoDecimal } from './isNumberWithTwoDecimal';

describe('isNumberWithTwoDecimal test', () => {
  it('should be true for single digit number strings', () => {
    const testval = '0';
    expect(isNumberWithTwoDecimal(testval)).toBe(true);
  });

  it('should be true for multi digit number strings', () => {
    const testval = '21';
    expect(isNumberWithTwoDecimal(testval)).toBe(true);
  });

  it('should be false for strings with non numeric symbols in start', () => {
    const testval = '+21';
    expect(isNumberWithTwoDecimal(testval)).toBe(false);
  });

  it('should be false for strings with non numeric symbols in the middle', () => {
    const testval = '2+1';
    expect(isNumberWithTwoDecimal(testval)).toBe(false);
  });

  it('should be false for strings with non numeric symbols in the end', () => {
    const testval = '21+';
    expect(isNumberWithTwoDecimal(testval)).toBe(false);
  });

  it('should be false for strings with dot in the end', () => {
    const testval = '21.';
    expect(isNumberWithTwoDecimal(testval)).toBe(false);
  });

  it('should be true for strings with 1 decimal', () => {
    const testval = '21.2';
    expect(isNumberWithTwoDecimal(testval)).toBe(true);
  });

  it('should be true for strings with 2 decimal', () => {
    const testval = '21.22';
    expect(isNumberWithTwoDecimal(testval)).toBe(true);
  });

  it('should be false for strings with 3 decimal', () => {
    const testval = '21.222';
    expect(isNumberWithTwoDecimal(testval)).toBe(false);
  });
});
