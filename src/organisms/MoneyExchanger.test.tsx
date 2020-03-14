import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { StoreState } from '../store/store';

import { MoneyExchanger } from './MoneyExchanger';


const storeMock: StoreState = {
    userWallets: {
        userWalletCurrencies: ['CURR1', 'CURR2', 'CURR3'],
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
            CURR3: 3,
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

test('it should correctly set initial tabs value', () => {
    const mockStore = configureStore();

    const store = mockStore(storeMock);

    store.dispatch = jest.fn();

    const wrapper = mount(
        <Provider store={store}>
            <MoneyExchanger/>
        </Provider>
    );
    const sellingFirstTab = wrapper.findWhere(n => n.name() === 'CurrencyTab' && n.prop('id') === 'tab-CURR1').at(0);
    const buyingSecondTab = wrapper.findWhere(n => n.name() === 'CurrencyTab' && n.prop('id') === 'tab-CURR2').at(1);
    expect(sellingFirstTab.prop('active')).toBe(true);
    expect(buyingSecondTab.prop('active')).toBe(true);
});

test('it should change selling tabs active on click value', () => {
    const mockStore = configureStore();

    const store = mockStore(storeMock);

    store.dispatch = jest.fn();

    const wrapper = mount(
        <Provider store={store}>
            <MoneyExchanger/>
        </Provider>
    );
    let sellingFirstTab = wrapper.findWhere(n => n.name() === 'CurrencyTab' && n.prop('id') === 'tab-CURR1').at(0);
    let sellingSecondTab = wrapper.findWhere(n => n.name() === 'CurrencyTab' && n.prop('id') === 'tab-CURR2').at(0);
    expect(sellingFirstTab.prop('active')).toBe(true);
    expect(sellingSecondTab.prop('active')).toBe(false);

    sellingSecondTab.simulate('click');

    sellingFirstTab = wrapper.findWhere(n => n.name() === 'CurrencyTab' && n.prop('id') === 'tab-CURR1').at(0);
    sellingSecondTab = wrapper.findWhere(n => n.name() === 'CurrencyTab' && n.prop('id') === 'tab-CURR2').at(0);
    expect(sellingFirstTab.prop('active')).toBe(false);
    expect(sellingSecondTab.prop('active')).toBe(true);
});

test('it should change buying tabs active on click value', () => {
    const mockStore = configureStore();

    const store = mockStore(storeMock);

    store.dispatch = jest.fn();

    const wrapper = mount(
        <Provider store={store}>
            <MoneyExchanger/>
        </Provider>
    );
    let buyingFirstTab = wrapper.findWhere(n => n.name() === 'CurrencyTab' && n.prop('id') === 'tab-CURR1').at(1);
    let buyingSecondTab = wrapper.findWhere(n => n.name() === 'CurrencyTab' && n.prop('id') === 'tab-CURR2').at(1);
    expect(buyingFirstTab.prop('active')).toBe(false);
    expect(buyingSecondTab.prop('active')).toBe(true);

    buyingFirstTab.simulate('click');

    buyingFirstTab = wrapper.findWhere(n => n.name() === 'CurrencyTab' && n.prop('id') === 'tab-CURR1').at(1);
    buyingSecondTab = wrapper.findWhere(n => n.name() === 'CurrencyTab' && n.prop('id') === 'tab-CURR2').at(1);
    expect(buyingFirstTab.prop('active')).toBe(true);
    expect(buyingSecondTab.prop('active')).toBe(false);
});
