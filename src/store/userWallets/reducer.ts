import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { roundToDecimals } from '../../utils/roundToDecimals';

import { exchangeMoneyAction } from "./actions";
import { MoneyExchangePayload, UserWalletModel } from "./model";

export const USER_WALLET_INITIAL_STATE: UserWalletModel = {
  userWalletCurrencies: ['EUR', 'GBP', 'USD'],
  userWalletsBalance: {
    EUR: 100,
    GBP: 100,
    USD: 100,
  }
};

const handleExchangeMoneyAction = (state: UserWalletModel, payload: MoneyExchangePayload): UserWalletModel => {
  if (!state.userWalletsBalance.hasOwnProperty(payload.buyingCurrency)) {
    return state;
  }

  if (!state.userWalletsBalance.hasOwnProperty(payload.sellingCurrency)) {
    return state;
  }

  const newSoldCurrencyAmount = roundToDecimals(state.userWalletsBalance[payload.sellingCurrency] - payload.soldCurrencyAmount);
  const newBoughtCurrencyAmount = roundToDecimals(state.userWalletsBalance[payload.buyingCurrency] + payload.boughtCurrencyAmount);
  return {
    ...state,
    userWalletsBalance: {
      ...state.userWalletsBalance,
      [payload.sellingCurrency]: newSoldCurrencyAmount,
      [payload.buyingCurrency]: newBoughtCurrencyAmount,
    }
  }
};

export const userWalletsReducer = reducerWithInitialState(USER_WALLET_INITIAL_STATE)
  .case(exchangeMoneyAction, handleExchangeMoneyAction)
  .build();
