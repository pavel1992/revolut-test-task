import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { fetchExchangeRateAction } from "./actions";
import { ExchangeRateModel } from "./model";

export const EXCHANGE_RATE_INITIAL_STATE: ExchangeRateModel = {
  error: null,
  baseCurrency: '',
  exchangeRateToBaseCurrency: {},
};

export const exchangeRateReducer = reducerWithInitialState<ExchangeRateModel>(EXCHANGE_RATE_INITIAL_STATE)
  .case(fetchExchangeRateAction.async.done, (state, { result: exchangeRateResponse }) => ({
    error: null,
    baseCurrency: exchangeRateResponse.base,
    exchangeRateToBaseCurrency: exchangeRateResponse.rates
  }))
  .case(fetchExchangeRateAction.async.failed,  (state, { error }) => ({
    ...state,
    error,
  }))
  .build();