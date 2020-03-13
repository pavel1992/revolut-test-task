import { roundToTwoDecimals } from "./roundToTwoDecimals";

describe('test roundToTwoDecimals', () => {
  it('should do nothing with number with no decimal part', () => {
    const testNumber = 1;
    expect(roundToTwoDecimals(testNumber)).toEqual(testNumber);
  });

  it('should do nothing with number with 2 decimals', () => {
    const testNumber = 1.11;
    expect(roundToTwoDecimals(testNumber)).toEqual(testNumber);
  });

  it('should correctly round number with more than 2 decimals down', () => {
    const testNumber = 1.15234;
    const expectedResult = 1.15;
    expect(roundToTwoDecimals(testNumber)).toEqual(expectedResult);
  });

  it('should correctly round number with more than 2 decimals up', () => {
    const testNumber = 1.15634;
    const expectedResult = 1.16;
    expect(roundToTwoDecimals(testNumber)).toEqual(expectedResult);
  });
});
