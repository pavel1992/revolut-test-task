export interface ExchangeRateModel {
  baseCurrency: string;
  exchangeRateToBaseCurrency: Record<string, number>;
  error: string | null;
}

export interface ExchangeRateResponse {
  "disclaimer": string;
  "license": string;
  "timestamp": number,
  "base": string,
  "rates": Record<string, number>
}