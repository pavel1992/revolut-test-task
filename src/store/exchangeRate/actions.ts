import actionCreatorFactory from "typescript-fsa";
import { asyncFactory } from 'typescript-fsa-redux-thunk';

import { fetchExchangeRate } from "../../api/openExchangeRatesApi";

import { ExchangeRateResponse } from "./model";

const exchangeRateActionCreatorFactory = actionCreatorFactory('USER_WALLET_ACTION');
const exchangeRateAsyncActionCreatorFactory = asyncFactory(exchangeRateActionCreatorFactory);

export const fetchExchangeRateAction = exchangeRateAsyncActionCreatorFactory<void, ExchangeRateResponse>(
  'FETCH_EXCHANGE_RATE',
  async () => {
    const result = await fetchExchangeRate();
    if (!result.ok) {
      throw new Error(`Error ${result.status}: ${result.statusText}`);
    }
    return result.json();
  }
);