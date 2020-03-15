import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { StoreState } from '../store/store';
import { exchangeMoneyAction } from '../store/userWallets/actions';

import { MoneyExchanger } from './MoneyExchanger';


const storeMock: StoreState = {
  userWallets: {
    userWalletCurrencies: ['CURR1', 'CURR2', 'CURR3'],
    userWalletsBalance: {
      CURR1: 50,
      CURR2: 50,
      CURR3: 50,
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

test('it should correctly change selling amount when changing buying amount', () => {
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

test('it should disable exchange button when exchanging value is invalid', () => {
  const mockStore = configureStore();

  const store = mockStore(storeMock);

  store.dispatch = jest.fn();

  const wrapper = mount(
    <Provider store={store}>
        <MoneyExchanger/>
    </Provider>
  );
  const sellingCurrencyInput = wrapper.find('input').at(0);
  sellingCurrencyInput.getDOMNode<HTMLInputElement>().value = '0';
  sellingCurrencyInput.simulate('change');
  const exchangeButton = wrapper.find('button').at(0);

  expect(exchangeButton.prop('disabled')).toBe(true);
});

test('it should enable exchange button when exchanging value are valid', () => {
  const mockStore = configureStore();

  const store = mockStore(storeMock);

  store.dispatch = jest.fn();

  const wrapper = mount(
    <Provider store={store}>
      <MoneyExchanger/>
    </Provider>
  );
  const sellingCurrencyInput = wrapper.find('input').at(0);
  sellingCurrencyInput.getDOMNode<HTMLInputElement>().value = '10';
  sellingCurrencyInput.simulate('change');
  const exchangeButton = wrapper.find('button').at(0);

expect(exchangeButton.prop('disabled')).toBe(false);
});

test('it should dispatch correct exchange action on button click', () => {
  const mockStore = configureStore();

  const store = mockStore(storeMock);

  store.dispatch = jest.fn();

  const wrapper = mount(
    <Provider store={store}>
      <MoneyExchanger/>
    </Provider>
  );
  const sellingCurrencyInput = wrapper.find('input').at(0);
  sellingCurrencyInput.getDOMNode<HTMLInputElement>().value = '10';
  sellingCurrencyInput.simulate('change');
  const exchangeButton = wrapper.find('button').at(0);
  exchangeButton.simulate('click');

  const expectedExchangeAction = exchangeMoneyAction({
    sellingCurrency: 'CURR1',
    soldCurrencyAmount: 10,
    buyingCurrency: 'CURR2',
    boughtCurrencyAmount: 20,
  });

  expect(store.dispatch).toHaveBeenCalledWith(expectedExchangeAction);
});

test('it should show no exchange rate div when no exchange data', () => {
  const emptyCurrencyMock: StoreState = {
    userWallets: {
      userWalletCurrencies: ['CURR1', 'CURR2', 'CURR3'],
      userWalletsBalance: {
        CURR1: 50,
        CURR2: 50,
        CURR3: 50,
      }
    },
    exchangeRate: {
      baseCurrency: 'ZZZ',
      exchangeRateToBaseCurrency: {},
      error: null,
    }
  };
  const mockStore = configureStore();

  const store = mockStore(emptyCurrencyMock);

  store.dispatch = jest.fn();

  const wrapper = mount(
    <Provider store={store}>
      <MoneyExchanger/>
    </Provider>
  );

  const noExchangeRateDiv = wrapper.find('#no-currency');
  expect(noExchangeRateDiv.length).toBe(1);
  expect(noExchangeRateDiv.at(0).text()).toBe('Couldn\'t get exchange rates for exchange');
});

test('it should show no wallets div when not enough userWallets', () => {
  const emptyCurrencyMock: StoreState = {
    userWallets: {
      userWalletCurrencies: ['CURR1'],
      userWalletsBalance: {
        CURR1: 50,
      }
    },
    exchangeRate: {
      baseCurrency: 'ZZZ',
      exchangeRateToBaseCurrency: {},
      error: null,
    }
  };
  const mockStore = configureStore();

  const store = mockStore(emptyCurrencyMock);

  store.dispatch = jest.fn();

  const wrapper = mount(
    <Provider store={store}>
      <MoneyExchanger/>
    </Provider>
  );

  const noExchangeRateDiv = wrapper.find('#no-wallets');
  expect(noExchangeRateDiv.length).toBe(1);
  expect(noExchangeRateDiv.at(0).text()).toBe('Not enough wallets for exchange');
});
