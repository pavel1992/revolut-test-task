import { roundToTwoDecimals } from "./roundToTwoDecimals";

/**
 * This function converts any amount of money from one currency to another through base currency
 * @param amount - money amount to convert
 * @param courseToBaseCurrencySelling - exchange course from your currency to base currency
 * @param courseToBaseCurrencyBuying - exchange course from result currency to base currency, is 1 by default,
 *  what means you want to buy base currency
 */
export const convertMoney = (amount: number, courseToBaseCurrencySelling: number, courseToBaseCurrencyBuying: number = 1): number => {
  return roundToTwoDecimals(amount * courseToBaseCurrencySelling / courseToBaseCurrencyBuying);
};