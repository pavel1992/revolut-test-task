import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { POLLING_INTERVAL_MS } from "../constants";
import { CurrencyExchange, CurrencyExchangeViewProps } from "../molecules/CurrencyExchange";
import { fetchExchangeRateAction } from "../store/exchangeRate/actions";
import { ExchangeRateModel } from "../store/exchangeRate/model";
import { StoreState } from "../store/store";
import { UserWalletModel } from "../store/userWallets/model";
import { getExchangeRate } from "../utils/getExchangeRate";
import { roundToTwoDecimals } from "../utils/roundToTwoDecimals";

export interface MoneyExchangerMapDispatchToProps {
  dispatchFetchRatesAction: () => void;
}

export type MoneyExchangerMapStateToProps = Pick<ExchangeRateModel, 'exchangeRateToBaseCurrency' | 'baseCurrency'> &
  Pick<UserWalletModel, 'userWalletCurrencies' | 'userWalletsBalance'>

export type MoneyExchangerProps = MoneyExchangerMapDispatchToProps & MoneyExchangerMapStateToProps;

export type CurrencyExchangerState = Pick<CurrencyExchangeViewProps, 'sellingCurrency' | 'buyingCurrency' | 'amountToExchange'>

const handleSellingAmountChange = (
  setSellExchangerState: Dispatch<SetStateAction<CurrencyExchangerState>>,
  setBuyExchangerState: Dispatch<SetStateAction<CurrencyExchangerState>>,
  conversionRate: number,
) => (amount: string): void => {
  setSellExchangerState(state => ({ ...state, amountToExchange: Number(amount) }));
  setBuyExchangerState(state => ({ ...state, amountToExchange: roundToTwoDecimals(Number(amount) * conversionRate )}));
};

const handleBuyingAmountChange = (
  setSellExchangerState: Dispatch<SetStateAction<CurrencyExchangerState>>,
  setBuyExchangerState: Dispatch<SetStateAction<CurrencyExchangerState>>,
  conversionRate: number,
) => (amount: string): void => {
  setBuyExchangerState(state => ({ ...state, amountToExchange: Number(amount) }));
  setSellExchangerState(state => ({ ...state, amountToExchange: roundToTwoDecimals(Number(amount) * conversionRate )}));
};

export const MoneyExchanger = React.memo((props: MoneyExchangerProps) => {
  const initialExchangersState: CurrencyExchangerState = ({
    buyingCurrency: props.userWalletCurrencies[0],
    sellingCurrency: props.userWalletCurrencies[1],
    amountToExchange: 0,
  });

  const buyExchangeRate = getExchangeRate(
    props.exchangeRateToBaseCurrency[props.userWalletCurrencies[0]],
    props.exchangeRateToBaseCurrency[props.userWalletCurrencies[1]],
  );

  const sellExchangeRate = getExchangeRate(
    props.exchangeRateToBaseCurrency[props.userWalletCurrencies[1]],
    props.exchangeRateToBaseCurrency[props.userWalletCurrencies[0]],
  );
  const [sellExchangerState, setSellExchangerState] = useState<CurrencyExchangerState>(initialExchangersState);

  const [buyExchangerState, setBuyExchangerState] = useState<CurrencyExchangerState>(initialExchangersState);

  const sellingAmountChangeHandler = handleSellingAmountChange(
    setSellExchangerState,
    setBuyExchangerState,
    sellExchangeRate
  );
  const buyingAmountChangeHandler = handleBuyingAmountChange(
    setSellExchangerState,
    setBuyExchangerState,
    buyExchangeRate,
  );

  useEffect(() => {
    const pollingRateInterval = setInterval(
      () => props.dispatchFetchRatesAction(),
      POLLING_INTERVAL_MS,
    );
    return () => clearInterval(pollingRateInterval);
  });

  if (props.userWalletCurrencies.length < 2) {
    return <div> Not enough wallets for exchange </div>
  }

  if (
    !props.exchangeRateToBaseCurrency[props.userWalletCurrencies[0]]
    || !props.exchangeRateToBaseCurrency[props.userWalletCurrencies[1]]
  ) {
    return <div>Couldn't get exchange rates for exchange</div>
  }

  return (
    <>
      <CurrencyExchange
        {...sellExchangerState}
        userWalletAmount={props.userWalletsBalance[sellExchangerState.sellingCurrency]}
        onAmountChange={sellingAmountChangeHandler}
        exchangeRate={sellExchangeRate}
        isFromCurrency={true}
      />
      <CurrencyExchange
        {...buyExchangerState}
        userWalletAmount={props.userWalletsBalance[buyExchangerState.buyingCurrency]}
        exchangeRate={buyExchangeRate}
        onAmountChange={buyingAmountChangeHandler}
      />
    </>
  )});


const mapDispatchToProps = (dispatch: ThunkDispatch<null, null, any>): MoneyExchangerMapDispatchToProps => ({
  dispatchFetchRatesAction: () => dispatch(fetchExchangeRateAction()),
});

const mapStateToProps = (state: StoreState): MoneyExchangerMapStateToProps => ({
  userWalletsBalance: state.userWallets.userWalletsBalance,
  userWalletCurrencies: state.userWallets.userWalletCurrencies,
  exchangeRateToBaseCurrency: state.exchangeRate.exchangeRateToBaseCurrency,
  baseCurrency: state.exchangeRate.baseCurrency,
});

export const ConnectedMoneyExchanger = connect(mapStateToProps, mapDispatchToProps)(MoneyExchanger);