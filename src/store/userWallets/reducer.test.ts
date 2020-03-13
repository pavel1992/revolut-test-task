import { exchangeMoneyAction } from "./actions";
import { userWalletsReducer, USER_WALLET_INITIAL_STATE } from "./reducer";

describe('userWalletsReducerTests', () => {
  it('expect reducer to return own state when unknown action', () => {
    expect(userWalletsReducer(USER_WALLET_INITIAL_STATE, {type: ''})).toEqual(USER_WALLET_INITIAL_STATE)
  });

  it('expect reducer to return own state when trying to sell unknown currency', () => {
    const mockedReducerState = {
      userWalletCurrencies: ['CURR1', 'CURR2'],
      userWalletsBalance: {
        CURR1: 2,
        CURR2: 2,
      }
    };

    const mockedAction = exchangeMoneyAction({
      sellingCurrency: 'CURR3',
      buyingCurrency: 'CURR2',
      boughtCurrencyAmount: 1,
      soldCurrencyAmount: 2,
    });
    expect(userWalletsReducer(mockedReducerState, mockedAction)).toEqual(mockedReducerState)
  });

  it('expect reducer to return own state when trying to buy unknown currency', () => {
    const mockedReducerState = {
      userWalletCurrencies: ['CURR1', 'CURR2'],
      userWalletsBalance: {
        CURR1: 2,
        CURR2: 2,
      }
    };

    const mockedAction = exchangeMoneyAction({
      sellingCurrency: 'CURR1',
      buyingCurrency: 'CURR3',
      boughtCurrencyAmount: 1,
      soldCurrencyAmount: 2,
    });
    expect(userWalletsReducer(mockedReducerState, mockedAction)).toEqual(mockedReducerState)
  });

  it('expect reducer to return correct result state when all fine', () => {
    const mockedReducerState = {
      userWalletCurrencies: ['CURR1', 'CURR2'],
      userWalletsBalance: {
        CURR1: 10,
        CURR2: 10,
      }
    };

    const mockedAction = exchangeMoneyAction({
      sellingCurrency: 'CURR1',
      buyingCurrency: 'CURR2',
      boughtCurrencyAmount: 5,
      soldCurrencyAmount: 5,
    });

    const expectedResultState = {
      userWalletCurrencies: ['CURR1', 'CURR2'],
      userWalletsBalance: {
        CURR1: 5,
        CURR2: 15,
      }
    };
    expect(userWalletsReducer(mockedReducerState, mockedAction)).toEqual(expectedResultState)
  })
});