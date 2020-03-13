import React from 'react';

import { ArrowDown } from "../atoms/ArrowDown";
import { CurrencyContainer, CurrencyContainerProps } from "../atoms/CurrencyContainer";

export interface CurrencyExchangeViewProps {
  sellingCurrency: string;
  buyingCurrency: string;
  userWalletAmount: number;
  exchangeRate: number;
  amountToExchange: number;
}

export interface CurrencyExchangeProps extends CurrencyContainerProps, CurrencyExchangeViewProps {
  onAmountChange: (value: string) => void;
}

export const CurrencyExchange = (props: CurrencyExchangeProps) => {
  const onAmountChange = (e: React.FormEvent<HTMLInputElement>): void => {
    props.onAmountChange(e.currentTarget.value);
  };

  return (
    <CurrencyContainer isFromCurrency={props.isFromCurrency}>
      {props.isFromCurrency && <ArrowDown/>}
      <div>{props.isFromCurrency ? props.buyingCurrency : props.sellingCurrency}</div>
      <div>{props.userWalletAmount}</div>
      <input value={props.amountToExchange} onChange={onAmountChange}/>
    </CurrencyContainer>
  )
};