import { getExchangeRate } from "./getExchangeRate";

describe('get exchange rate test', () => {
  it('should throw error when selling rate to base is 0', () => {
    const testSellingRate = 0;
    const testBuyingRate = 1;

    expect(() => getExchangeRate(testSellingRate, testBuyingRate)).toThrowError();
  });

  it('should throw error when buying rate to base is 0', () => {
    const testSellingRate = 1;
    const testBuyingRate = 0;

    expect(() => getExchangeRate(testSellingRate, testBuyingRate)).toThrowError();
  });

  it('should return exchange rate when two non-0 params given', () => {
    const testSellingRate = 1;
    const testBuyingRate = 2;

    expect(getExchangeRate(testSellingRate, testBuyingRate)).toBe(0.5);
  });
});