import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { StoreState } from '../store/store';

import { MoneyExchanger } from './MoneyExchanger';


const storeMock: StoreState = {
    userWallets: {
        userWalletCurrencies: ['CURR1', 'CURR2'],
        userWalletsBalance: {
            CURR1: 50,
            CURR2: 50,
        }
    },
    exchangeRate: {
        baseCurrency: 'ZZZ',
        exchangeRateToBaseCurrency: {
            CURR1: 1,
            CURR2: 2,
        },
        error: null,
    }
};

test('it should correctly change buying amount when changing selling amount', () => {
    const mockStore = configureStore();

    const store = mockStore(storeMock);

    store.dispatch = jest.fn();

    const wrapper = mount(
        <Provider store={store}>
            <MoneyExchanger/>
        </Provider>
    );
    const sellingCurrencyInput = wrapper.find('input').at(0);

    // unfortunately, i hadn't found the other way to change inputs value
    sellingCurrencyInput.getDOMNode<HTMLInputElement>().value = '10';
    sellingCurrencyInput.simulate('change');

    const buyingCurrencyInput = wrapper.find('input').at(1);
    expect(buyingCurrencyInput.prop('value')).toEqual(20);
});

test('it should correctly change selling amount when changing bying amount', () => {
    const mockStore = configureStore();

    const store = mockStore(storeMock);

    store.dispatch = jest.fn();

    const wrapper = mount(
        <Provider store={store}>
            <MoneyExchanger/>
        </Provider>
    );
    const buyingCurrencyInput = wrapper.find('input').at(1);
    buyingCurrencyInput.getDOMNode<HTMLInputElement>().value = '10';
    buyingCurrencyInput.simulate('change');

    const sellingCurrencyInput = wrapper.find('input').at(0);
    expect(sellingCurrencyInput.prop('value')).toEqual(5);
});
