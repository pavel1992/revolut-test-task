import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ExchangeButton } from '../atoms/ExchangeButton';

import { POLLING_INTERVAL_MS } from '../constants';
import { CurrencyExchange, CurrencyExchangeViewProps } from '../molecules/CurrencyExchange';
import { fetchExchangeRateAction } from '../store/exchangeRate/actions';
import { StoreState } from '../store/store';
import { exchangeMoneyAction } from '../store/userWallets/actions';
import { getExchangeRate } from '../utils/getExchangeRate';
import { isNumberWithTwoDecimal } from '../utils/isNumberWithTwoDecimal';
import { roundToTwoDecimals } from '../utils/roundToTwoDecimals';

export type CurrencyExchangerState = Pick<CurrencyExchangeViewProps, 'sellingCurrency' | 'buyingCurrency' | 'amountToExchange'>

enum OperationType {
  BUY = 'BUY',
  SELL = 'SELL',
}

const handleAmountChange = (
  changingCurrencyStateChangeDispatcher: Dispatch<SetStateAction<CurrencyExchangerState>>,
  dependedCurrencyStateChangeDispatcher: Dispatch<SetStateAction<CurrencyExchangerState>>,
  operationType: OperationType,
  conversionRate: number,
  exchangeMaxAmount: number,
) => (amount: string): void => {
  if (amount === '') {
    changingCurrencyStateChangeDispatcher(state => ({ ...state, amountToExchange: amount }));
    return;
  }

  // checking for 2. or 2, inputs
  if ((amount.endsWith(',') || amount.endsWith('.')) && isNumberWithTwoDecimal(amount.slice(0, amount.length - 1))) {
    changingCurrencyStateChangeDispatcher(state => ({ ...state, amountToExchange: amount.replace(',', '.') }));
    return;
  }

  // checking for 2.0 etc inputs
  if (amount.split('.').length > 1 && amount.split('.')[1].length < 2 && amount.split('.')[1] === '0') {
    changingCurrencyStateChangeDispatcher(state => ({ ...state, amountToExchange: amount }));
    return;
  }

  // checking for non-numeric input or third decimal
  if (!isNumberWithTwoDecimal(amount) || (amount.split('.').length > 1 && amount.split('.')[1].length > 2)) {
    return;
  }

  const dependedNewAmount = roundToTwoDecimals(Number(amount) * conversionRate);

  if (operationType === OperationType.BUY && dependedNewAmount > exchangeMaxAmount ) {
    return;
  }

  if (operationType === OperationType.SELL && Number(amount) > exchangeMaxAmount ) {
    return;
  }

  changingCurrencyStateChangeDispatcher(state => ({ ...state, amountToExchange: roundToTwoDecimals(Number(amount)) }));
  dependedCurrencyStateChangeDispatcher(state => ({ ...state, amountToExchange: dependedNewAmount }));
};

export const MoneyExchanger = React.memo(() => {
  const userWalletsBalance = useSelector<StoreState, Record<string, number>>(state => state.userWallets.userWalletsBalance);
  const userWalletCurrencies = useSelector<StoreState, string[]>(state => state.userWallets.userWalletCurrencies);
  const exchangeRateToBaseCurrency = useSelector<StoreState, Record<string, number>>(
      state => state.exchangeRate.exchangeRateToBaseCurrency
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExchangeRateAction())
  }, [dispatch]);

  useEffect(() => {
    const pollingRateInterval = setInterval(
        () => dispatch(fetchExchangeRateAction()),
        POLLING_INTERVAL_MS,
    );
    return () => clearInterval(pollingRateInterval);
  });


  const initialExchangersState: CurrencyExchangerState = ({
    buyingCurrency: userWalletCurrencies[1],
    sellingCurrency: userWalletCurrencies[0],
    amountToExchange: '',
  });

  const buyExchangeRate = getExchangeRate(
    exchangeRateToBaseCurrency[userWalletCurrencies[0]],
    exchangeRateToBaseCurrency[userWalletCurrencies[1]],
  );

  const sellExchangeRate = getExchangeRate(
    exchangeRateToBaseCurrency[userWalletCurrencies[1]],
    exchangeRateToBaseCurrency[userWalletCurrencies[0]],
  );
  const [sellExchangerState, setSellExchangerState] = useState<CurrencyExchangerState>(initialExchangersState);

  const [buyExchangerState, setBuyExchangerState] = useState<CurrencyExchangerState>(initialExchangersState);

  const sellingAmountChangeHandler = handleAmountChange(
    setSellExchangerState,
    setBuyExchangerState,
    OperationType.SELL,
    sellExchangeRate,
    userWalletsBalance[sellExchangerState.sellingCurrency],
  );

  const buyingAmountChangeHandler = handleAmountChange(
    setBuyExchangerState,
    setSellExchangerState,
    OperationType.BUY,
    buyExchangeRate,
    userWalletsBalance[sellExchangerState.sellingCurrency],
  );

  if (userWalletCurrencies.length < 2) {
    return <div> Not enough wallets for exchange </div>
  }

  if (
    !exchangeRateToBaseCurrency[userWalletCurrencies[0]]
    || !exchangeRateToBaseCurrency[userWalletCurrencies[1]]
  ) {
    return <div>Couldn't get exchange rates for exchange</div>
  }

  const reset = () => {
    setSellExchangerState(state => ({...state, amountToExchange: ''}));
    setBuyExchangerState(state => ({ ...state, amountToExchange: ''}));
  };

  const makeExchange = () => {
    dispatch(exchangeMoneyAction({
      sellingCurrency: sellExchangerState.sellingCurrency,
      buyingCurrency: sellExchangerState.buyingCurrency,
      soldCurrencyAmount: Number(sellExchangerState.amountToExchange),
      boughtCurrencyAmount: Number(buyExchangerState.amountToExchange),
    }));
    reset();
  };

  return (
    <div>
      <div>
        <ExchangeButton onClick={makeExchange}>EXCHANGE</ExchangeButton>
      </div>
      <div>
        <CurrencyExchange
          {...sellExchangerState}
          userWalletAmount={userWalletsBalance[sellExchangerState.sellingCurrency]}
          onAmountChange={sellingAmountChangeHandler}
          exchangeRate={sellExchangeRate}
          isFromCurrency={true}
        />
        <CurrencyExchange
          {...buyExchangerState}
          userWalletAmount={userWalletsBalance[buyExchangerState.buyingCurrency]}
          exchangeRate={buyExchangeRate}
          onAmountChange={buyingAmountChangeHandler}
        />
      </div>
    </div>
  )}
  );
