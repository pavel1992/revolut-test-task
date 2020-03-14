import { roundToDecimals } from "./roundToDecimals";

describe('test roundToDecimals', () => {
  it('should do nothing with number with no decimal part', () => {
    const testNumber = 1;
    expect(roundToDecimals(testNumber)).toEqual(testNumber);
  });

  it('should do nothing with number with 2 decimals when decimals number unchanged', () => {
    const testNumber = 1.11;
    expect(roundToDecimals(testNumber)).toEqual(testNumber);
  });

  it('should correctly round number with more than 2 decimals down when decimals number unchanged', () => {
    const testNumber = 1.15234;
    const expectedResult = 1.15;
    expect(roundToDecimals(testNumber)).toEqual(expectedResult);
  });

  it('should correctly round number with more than 2 decimals up when decimals number unchanged', () => {
    const testNumber = 1.15634;
    const expectedResult = 1.16;
    expect(roundToDecimals(testNumber)).toEqual(expectedResult);
  });

  it('should correctly round number with 3 decimals when decimals number is 3', () => {
    const testNumber = 1.15634;
    const expectedResult = 1.156;
    expect(roundToDecimals(testNumber, 3)).toEqual(expectedResult);
  });
});
