export interface UserWalletModel {
  userWalletCurrencies: string[];
  userWalletsBalance: Record<string, number>
}

export interface MoneyExchangePayload {
  sellingCurrency: string;
  buyingCurrency: string;
  soldCurrencyAmount: number;
  boughtCurrencyAmount: number;
}