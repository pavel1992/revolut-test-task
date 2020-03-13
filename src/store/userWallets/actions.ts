import actionCreatorFactory from "typescript-fsa";

import { MoneyExchangePayload } from "./model";

const userWalletActionCreatorFactory = actionCreatorFactory('USER_WALLET_ACTION');

export const exchangeMoneyAction = userWalletActionCreatorFactory<MoneyExchangePayload>('EXCHANGE_MONEY');