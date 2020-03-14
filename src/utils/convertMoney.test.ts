import { convertMoney } from "./convertMoney";

const EUR_TO_EUR_COURSE = 1;

describe('convertMoneyFunctionTest', () => {
  it('should correctly convert money to EUR with no decimals result', () => {
    const amount = 100;
    const sellingCurrencyRateToEur = 0.8;
    const expectedResult = 80;
    expect(convertMoney(amount, sellingCurrencyRateToEur)).toEqual(expectedResult);
  });

  it('should correctly convert money to EUR with 2 or less decimals result', () => {
    const amount = 1;
    const sellingCurrencyRateToEur = 0.8;
    const expectedResult = 0.8;
    expect(convertMoney(amount, sellingCurrencyRateToEur)).toEqual(expectedResult);
  });

  it('should correctly convert money to EUR with more than 2 decimals result', () => {
    const amount = 1;
    const sellingCurrencyRateToEur = 0.888;
    const expectedResult = 0.89;
    expect(convertMoney(amount, sellingCurrencyRateToEur)).toEqual(expectedResult);
  });

  it('should correctly convert money from EUR to other currency with no decimals result', () => {
    const amount = 100;
    const buyingCurrencyRateToEur = 2;
    const expectedResult = 50;
    expect(convertMoney(amount, EUR_TO_EUR_COURSE, buyingCurrencyRateToEur)).toEqual(expectedResult);
  });

  it('should correctly convert money from EUR with 2 or less decimals result', () => {
    const amount = 1;
    const buyingCurrencyRateToEur = 2.5;
    const expectedResult = 0.4;
    expect(convertMoney(amount, EUR_TO_EUR_COURSE, buyingCurrencyRateToEur)).toEqual(expectedResult);
  });

  it('should correctly convert money from EUR with periodic result', () => {
    const amount = 1;
    const buyingCurrencyRateToEur = 3;
    const expectedResult = 0.33;
    expect(convertMoney(amount, EUR_TO_EUR_COURSE, buyingCurrencyRateToEur)).toEqual(expectedResult);
  });

  it('should correctly exchange from one currency to other', () => {
    const amount = 10;
    const sellingCurrencyRateToEur = 0.5;
    const buyingCurrencyRateToEur = 0.8;
    const expectedResult = 6.25;
    expect(convertMoney(amount, sellingCurrencyRateToEur, buyingCurrencyRateToEur)).toEqual(expectedResult);
  })
});
