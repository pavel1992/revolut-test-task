import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonsRow } from '../atoms/ButtonsRow';
import { ErrorDiv } from '../atoms/ErrorDiv';
import { ExchangeButton } from '../atoms/ExchangeButton';
import { ExchangersContainer } from '../atoms/ExchangersContainer';
import { MoneyExchangerContainer } from '../atoms/MoneyExchangerContainer';
import { POLLING_INTERVAL_MS } from '../constants';
import { CurrencyExchange } from '../molecules/CurrencyExchange';
import { fetchExchangeRateAction } from '../store/exchangeRate/actions';
import { StoreState } from '../store/store';
import { exchangeMoneyAction } from '../store/userWallets/actions';
import { getExchangeRate } from '../utils/getExchangeRate';
import { isNumberWithTwoDecimal } from '../utils/isNumberWithTwoDecimal';
import { roundToDecimals } from '../utils/roundToDecimals';
import {
  isEmptyString,
  isFloatEndingWithZero,
  isFloatWithoutDecimalPart,
  isFloatWithoutIntegerPart,
  isInvalidInput
} from '../utils/validators';

export interface TabsState {
  sellingCurrency: string;
  buyingCurrency: string;
}

enum OperationType {
  BUY = 'BUY',
  SELL = 'SELL',
}

const handleAmountChange = (
  changingCurrencyStateChangeDispatcher: Dispatch<SetStateAction<string | number>>,
  dependedCurrencyStateChangeDispatcher: Dispatch<SetStateAction<string | number>>,
  operationType: OperationType,
  conversionRate: number,
  exchangeMaxAmount: number,
  errorStateChangeDispatcher: Dispatch<SetStateAction<string>>,
) => (amount: string): void => {
  const checkingAmount = amount.replace(',', '.');
  if (
    isEmptyString(checkingAmount)
    || isFloatWithoutDecimalPart(checkingAmount)
    || isFloatWithoutIntegerPart(checkingAmount)
  ) {
    changingCurrencyStateChangeDispatcher(checkingAmount);
    return;
  }

  if (isInvalidInput(checkingAmount)) {
    return;
  }
  const dependedNewAmount = roundToDecimals(Number(checkingAmount) * conversionRate);

  if (operationType === OperationType.BUY && dependedNewAmount > exchangeMaxAmount ) {
    return;
  }

  if (operationType === OperationType.SELL && Number(checkingAmount) > exchangeMaxAmount ) {
    return;
  }

  if (dependedNewAmount < 0.1 || Number(checkingAmount) < 0.1) {
    errorStateChangeDispatcher('Buying or selling amount could not be less than 0.1');
  }
  else {
    errorStateChangeDispatcher('');
  }
  if (isFloatEndingWithZero(checkingAmount)) {
    changingCurrencyStateChangeDispatcher(checkingAmount);
    dependedCurrencyStateChangeDispatcher(dependedNewAmount);
    return;
  }

  changingCurrencyStateChangeDispatcher(roundToDecimals(Number(checkingAmount)));
  dependedCurrencyStateChangeDispatcher(dependedNewAmount);
};

const isExchangeDisabled = (buyingState: string | number, sellingState: string | number): boolean => {
  return !isNumberWithTwoDecimal(
    buyingState.toString())
    || !isNumberWithTwoDecimal(sellingState.toString());
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


  const initialTabsState = ({
    buyingCurrency: userWalletCurrencies[1],
    sellingCurrency: userWalletCurrencies[0],
  });

  const [sellingAmountValueState, setSellingAmountValueStateState] = useState<string | number>('');

  const [buyingAmountValueState, setBuyingAmountValueStateState] = useState<string | number>('');

  const [tabsState, setTabsState] = useState<TabsState>(initialTabsState);

  const [errorState, setErrorState] = useState<string>('');

  const buyExchangeRate = roundToDecimals(
    getExchangeRate(
      exchangeRateToBaseCurrency[tabsState.sellingCurrency],
      exchangeRateToBaseCurrency[tabsState.buyingCurrency],
    ),
    4,
  );

  const sellExchangeRate = roundToDecimals(
    getExchangeRate(
      exchangeRateToBaseCurrency[tabsState.buyingCurrency],
      exchangeRateToBaseCurrency[tabsState.sellingCurrency],
    ),
    4,
  );

  const sellingAmountChangeHandler = handleAmountChange(
    setSellingAmountValueStateState,
    setBuyingAmountValueStateState,
    OperationType.SELL,
    sellExchangeRate,
    userWalletsBalance[tabsState.sellingCurrency],
    setErrorState,
  );

  const buyingAmountChangeHandler = handleAmountChange(
    setBuyingAmountValueStateState,
    setSellingAmountValueStateState,
    OperationType.BUY,
    buyExchangeRate,
    userWalletsBalance[tabsState.sellingCurrency],
    setErrorState,
  );

  if (userWalletCurrencies.length < 2) {
    return <div id='no-wallets'>Not enough wallets for exchange</div>
  }

  if (
    !exchangeRateToBaseCurrency[userWalletCurrencies[0]]
    || !exchangeRateToBaseCurrency[userWalletCurrencies[1]]
  ) {
    return <div id='no-currency'>Couldn't get exchange rates for exchange</div>
  }


  const reset = () => {
    setSellingAmountValueStateState('');
    setBuyingAmountValueStateState('');
  };


  const changeSellingTab = (val: string): void => {
    setTabsState(state => ({...state, sellingCurrency: val}));
    reset();
  };
  const changeBuyingTab = (val: string): void => {
    setTabsState(state => ({...state, buyingCurrency: val}));
    reset();
  };

  const makeExchange = () => {
    dispatch(exchangeMoneyAction({
      sellingCurrency: tabsState.sellingCurrency,
      buyingCurrency: tabsState.buyingCurrency,
      soldCurrencyAmount: Number(sellingAmountValueState),
      boughtCurrencyAmount: Number(buyingAmountValueState),
    }));
    reset();
  };

  return (
    <MoneyExchangerContainer>
      <ButtonsRow>
        <ExchangeButton
          disabled={Boolean(errorState) || isExchangeDisabled(buyingAmountValueState, sellingAmountValueState)}
          onClick={makeExchange}
        >
          EXCHANGE
        </ExchangeButton>
        {Boolean(errorState) && <ErrorDiv>{errorState}</ErrorDiv>}
      </ButtonsRow>
      <ExchangersContainer>
        <CurrencyExchange
          {...tabsState}
          amountToExchange={sellingAmountValueState}
          tabNames={userWalletCurrencies}
          activeTabName={tabsState.sellingCurrency}
          onTabClick={changeSellingTab}
          userWalletAmount={userWalletsBalance[tabsState.sellingCurrency]}
          onAmountChange={sellingAmountChangeHandler}
          exchangeRate={sellExchangeRate}
          isFromCurrency={true}
        />
        <CurrencyExchange
          {...tabsState}
          amountToExchange={buyingAmountValueState}
          tabNames={userWalletCurrencies}
          onTabClick={changeBuyingTab}
          activeTabName={tabsState.buyingCurrency}
          userWalletAmount={userWalletsBalance[tabsState.buyingCurrency]}
          exchangeRate={buyExchangeRate}
          onAmountChange={buyingAmountChangeHandler}
        />
      </ExchangersContainer>
    </MoneyExchangerContainer>
  )}
);
