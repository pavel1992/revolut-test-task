import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk';

import { ExchangeRateModel } from "./exchangeRate/model";
import { exchangeRateReducer } from "./exchangeRate/reducer";
import { UserWalletModel } from "./userWallets/model";
import { userWalletsReducer } from "./userWallets/reducer";

export interface StoreState {
  userWallets: UserWalletModel,
  exchangeRate: ExchangeRateModel,
}

const reducers = combineReducers({
  userWallets: userWalletsReducer,
  exchangeRate: exchangeRateReducer,
});

const thunk: ThunkMiddleware<StoreState, AnyAction> = thunkMiddleware;

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));