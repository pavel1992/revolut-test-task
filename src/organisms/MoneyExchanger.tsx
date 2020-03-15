import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { ErrorDiv } from '../atoms/ErrorDiv';
import { ExchangeButton } from '../atoms/ExchangeButton';
import { POLLING_INTERVAL_MS } from '../constants';
import { CurrencyExchange, CurrencyExchangeViewProps } from '../molecules/CurrencyExchange';
import { fetchExchangeRateAction } from '../store/exchangeRate/actions';
import { StoreState } from '../store/store';
import { exchangeMoneyAction } from '../store/userWallets/actions';
import { getExchangeRate } from '../utils/getExchangeRate';
import { isNumberWithTwoDecimal } from '../utils/isNumberWithTwoDecimal';
import { roundToDecimals } from '../utils/roundToDecimals';

export type CurrencyExchangerState = Pick<CurrencyExchangeViewProps, 'amountToExchange'>

export interface TabsState {
  sellingCurrency: string;
  buyingCurrency: string;
}

enum OperationType {
  BUY = 'BUY',
  SELL = 'SELL',
}

const MoneyExchangerContainer = styled.div`
  width: 1160px;
  display: flex;
  flex-direction: column;

  @media(max-width: 1280px) {
    width: 100%;
    padding: 0 60px;
  }

  @media(max-width: 768px) {
    padding: 0;
  }
`;

const ButtonsRow = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 24px 0;

  @media(max-width: 768px) {
    margin-bottom: 0;
  }
`;

const ExchangersContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  @media(max-width: 768px) {
    flex-direction: column;
  }
`;

const handleAmountChange = (
  changingCurrencyStateChangeDispatcher: Dispatch<SetStateAction<CurrencyExchangerState>>,
  dependedCurrencyStateChangeDispatcher: Dispatch<SetStateAction<CurrencyExchangerState>>,
  operationType: OperationType,
  conversionRate: number,
  exchangeMaxAmount: number,
  errorStateChangeDispatcher: Dispatch<SetStateAction<string>>,
) => (amount: string): void => {
  const checkingAmount = amount.replace(',', '.');
  if (checkingAmount === '') {
    changingCurrencyStateChangeDispatcher(state => ({ ...state, amountToExchange: checkingAmount }));
    return;
  }

  // checking for 2. or 2, inputs
  if (
      checkingAmount.endsWith('.')
      && checkingAmount.split('.').length === 2
      && isNumberWithTwoDecimal(checkingAmount.slice(0, checkingAmount.length - 1))
  ) {
    changingCurrencyStateChangeDispatcher(state => ({ ...state, amountToExchange: checkingAmount }));
    return;
  }

  // checking for 2.0 etc inputs
  if (checkingAmount.split('.').length > 1 && checkingAmount.split('.')[1].length < 2 && checkingAmount.split('.')[1] === '0') {
    changingCurrencyStateChangeDispatcher(state => ({ ...state, amountToExchange: checkingAmount }));
    return;
  }

  // checking for non-numeric input or third decimal
  if (!isNumberWithTwoDecimal(checkingAmount) || (checkingAmount.split('.').length > 1 && checkingAmount.split('.')[1].length > 2)) {
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
  changingCurrencyStateChangeDispatcher(state => ({ ...state, amountToExchange: roundToDecimals(Number(checkingAmount)) }));
  dependedCurrencyStateChangeDispatcher(state => ({ ...state, amountToExchange: dependedNewAmount }));
};

const isExchangeDisabled = (buyingState: CurrencyExchangerState, sellingState: CurrencyExchangerState): boolean => {
  return !isNumberWithTwoDecimal(
      buyingState.amountToExchange.toString())
      || !isNumberWithTwoDecimal(sellingState.amountToExchange.toString());
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

  const initialExchangersState: CurrencyExchangerState = ({
    amountToExchange: '',
  });
  const [sellExchangerState, setSellExchangerState] = useState<CurrencyExchangerState>(initialExchangersState);

  const [buyExchangerState, setBuyExchangerState] = useState<CurrencyExchangerState>(initialExchangersState);

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
    setSellExchangerState,
    setBuyExchangerState,
    OperationType.SELL,
    sellExchangeRate,
    userWalletsBalance[tabsState.sellingCurrency],
    setErrorState,
  );

  const buyingAmountChangeHandler = handleAmountChange(
    setBuyExchangerState,
    setSellExchangerState,
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
    setSellExchangerState(state => ({...state, amountToExchange: ''}));
    setBuyExchangerState(state => ({ ...state, amountToExchange: ''}));
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
      soldCurrencyAmount: Number(sellExchangerState.amountToExchange),
      boughtCurrencyAmount: Number(buyExchangerState.amountToExchange),
    }));
    reset();
  };

  return (
    <MoneyExchangerContainer>
      <ButtonsRow>
        <ExchangeButton
            disabled={Boolean(errorState) || isExchangeDisabled(buyExchangerState, sellExchangerState)}
            onClick={makeExchange}
        >
          EXCHANGE
        </ExchangeButton>
        {Boolean(errorState) && <ErrorDiv>{errorState}</ErrorDiv>}
      </ButtonsRow>
      <ExchangersContainer>
        <CurrencyExchange
          {...sellExchangerState}
          {...tabsState}
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
          {...buyExchangerState}
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
