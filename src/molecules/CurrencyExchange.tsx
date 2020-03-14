import React from 'react';

import { ArrowDown } from "../atoms/ArrowDown";
import { Caption } from '../atoms/Caption';
import { CurrencyContainer, CurrencyContainerProps } from "../atoms/CurrencyContainer";
import { Input } from '../atoms/Input';
import { InputHelper } from '../atoms/InputHelper';
import { CURRENCY_SIGNS } from '../constants';
import { isNumberWithTwoDecimal } from '../utils/isNumberWithTwoDecimal';

import { CurrencyTabs } from './CurrencyTabs';

export interface CurrencyExchangeViewProps {
  sellingCurrency: string;
  buyingCurrency: string;
  userWalletAmount: number;
  exchangeRate: number;
  amountToExchange: number | string;
}

export interface CurrencyExchangeProps extends CurrencyContainerProps, CurrencyExchangeViewProps {
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
    ? `-${CURRENCY_SIGNS[sellingCurrency] || sellingCurrency}`
    : `+${CURRENCY_SIGNS[buyingCurrency] || buyingCurrency}`;

const showExchangeHelper = (amountToExchange: string | number): boolean =>
    isNumberWithTwoDecimal(amountToExchange.toString()) && Number(amountToExchange) !== 0;

export const CurrencyExchange = (props: CurrencyExchangeProps) => {
    const onAmountChange = (e: React.FormEvent<HTMLInputElement>): void => {
        props.onAmountChange(e.currentTarget.value);
    };

    return (
        <CurrencyContainer isFromCurrency={props.isFromCurrency}>
            <CurrencyTabs/>
            {props.isFromCurrency && <ArrowDown/>}
            <Caption>{getCurrencyHelperText(props)}</Caption>
            <div>
                {showExchangeHelper(props.amountToExchange) && <InputHelper>{getInputHelperText(props)}</InputHelper>}
                <Input value={props.amountToExchange} onChange={onAmountChange}/>
            </div>
            <Caption>{getUserWalletInfoText(props)}</Caption>
        </CurrencyContainer>
    )
};
