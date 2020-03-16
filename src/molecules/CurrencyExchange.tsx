import React from 'react';

import { Caption } from '../atoms/Caption';
import { CurrencyContainer, CurrencyContainerProps } from '../atoms/CurrencyContainer';
import { Input } from '../atoms/Input';
import { InputHelper } from '../atoms/InputHelper';
import { InputWithInfoContainer } from '../atoms/InputWithInfoContainer';
import { CURRENCY_SIGNS } from '../constants';

import { CurrencyTabs, CurrencyTabsProps } from './CurrencyTabs';

export interface CurrencyExchangeViewProps {
  sellingCurrency: string;
  buyingCurrency: string;
  userWalletAmount: number;
  exchangeRate: number;
  amountToExchange: number | string;
}

export interface CurrencyExchangeProps extends CurrencyContainerProps, CurrencyExchangeViewProps, CurrencyTabsProps {
  onAmountChange: (value: string) => void;
}

const getCurrencyHelperText = (
  {sellingCurrency, buyingCurrency, exchangeRate, isFromCurrency}: CurrencyExchangeProps,
): string => isFromCurrency
  ? `${CURRENCY_SIGNS[sellingCurrency] || sellingCurrency}1 = ${CURRENCY_SIGNS[buyingCurrency] || buyingCurrency}${exchangeRate}`
  : `${CURRENCY_SIGNS[buyingCurrency] || buyingCurrency}1 = ${CURRENCY_SIGNS[sellingCurrency] || sellingCurrency}${exchangeRate}`;

const getUserWalletInfoText = (
  { buyingCurrency, sellingCurrency, isFromCurrency, userWalletAmount }: CurrencyExchangeProps
): string => isFromCurrency
  ? `You have ${CURRENCY_SIGNS[sellingCurrency] || sellingCurrency}${userWalletAmount}`
  : `You have ${CURRENCY_SIGNS[buyingCurrency] || buyingCurrency}${userWalletAmount}`;

const getInputHelperText = (
  { buyingCurrency, sellingCurrency, isFromCurrency }: CurrencyExchangeProps
): string => isFromCurrency
  ? `${CURRENCY_SIGNS[sellingCurrency] || sellingCurrency}`
  : `${CURRENCY_SIGNS[buyingCurrency] || buyingCurrency}`;

export const CurrencyExchange = (props: CurrencyExchangeProps) => {
  const onAmountChange = (e: React.FormEvent<HTMLInputElement>): void => {
    props.onAmountChange(e.currentTarget.value);
  };

  return (
    <CurrencyContainer isFromCurrency={props.isFromCurrency}>
      <CurrencyTabs
        activeTabName={props.activeTabName}
        tabNames={props.tabNames}
        onTabClick={props.onTabClick}
      />
      <InputWithInfoContainer>
        <Caption>{getCurrencyHelperText(props)}</Caption>
        <div>
          <InputHelper>{getInputHelperText(props)}</InputHelper>
          <Input value={props.amountToExchange} onChange={onAmountChange}/>
        </div>
        <Caption>{getUserWalletInfoText(props)}</Caption>
      </InputWithInfoContainer>
    </CurrencyContainer>
  )
};
