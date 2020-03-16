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
test('it should empty string correctly', () => {
  const mockStore = configureStore();

  const store = mockStore(storeMock);

  store.dispatch = jest.fn();

  const wrapper = mount(
    <Provider store={store}>
      <MoneyExchanger/>
    </Provider>
  );
  let sellingCurrencyInput = wrapper.find('input').at(0);

  sellingCurrencyInput.getDOMNode<HTMLInputElement>().value = '';
  sellingCurrencyInput.simulate('change');

  sellingCurrencyInput = wrapper.find('input').at(0);
  expect(sellingCurrencyInput.prop('value')).toEqual('');
});

test('it should set number with decimal part and without integer part correctly', () => {
  const mockStore = configureStore();

  const store = mockStore(storeMock);

  store.dispatch = jest.fn();

  const wrapper = mount(
    <Provider store={store}>
      <MoneyExchanger/>
    </Provider>
  );
  let sellingCurrencyInput = wrapper.find('input').at(0);

  sellingCurrencyInput.getDOMNode<HTMLInputElement>().value = '0.1';
  sellingCurrencyInput.simulate('change');
  sellingCurrencyInput.getDOMNode<HTMLInputElement>().value = '.1';
  sellingCurrencyInput.simulate('change');

  sellingCurrencyInput = wrapper.find('input').at(0);
  expect(sellingCurrencyInput.prop('value')).toEqual('.1');
});

test('it should set number with dot correctly', () => {
  const mockStore = configureStore();

  const store = mockStore(storeMock);

  store.dispatch = jest.fn();

  const wrapper = mount(
    <Provider store={store}>
      <MoneyExchanger/>
    </Provider>
  );
  let sellingCurrencyInput = wrapper.find('input').at(0);

  sellingCurrencyInput.getDOMNode<HTMLInputElement>().value = '0.';
  sellingCurrencyInput.simulate('change');

  sellingCurrencyInput = wrapper.find('input').at(0);
  expect(sellingCurrencyInput.prop('value')).toEqual('0.');
});

test('it should omit second dot', () => {
  const mockStore = configureStore();

  const store = mockStore(storeMock);

  store.dispatch = jest.fn();

  const wrapper = mount(
    <Provider store={store}>
      <MoneyExchanger/>
    </Provider>
  );
  let sellingCurrencyInput = wrapper.find('input').at(0);

  sellingCurrencyInput.getDOMNode<HTMLInputElement>().value = '0.';
  sellingCurrencyInput.simulate('change');
  sellingCurrencyInput.getDOMNode<HTMLInputElement>().value = '0..';
  sellingCurrencyInput.simulate('change');

  sellingCurrencyInput = wrapper.find('input').at(0);
  expect(sellingCurrencyInput.prop('value')).toEqual('0.');
});

test('it should omit third decimal number', () => {
  const mockStore = configureStore();

  const store = mockStore(storeMock);

  store.dispatch = jest.fn();

  const wrapper = mount(
    <Provider store={store}>
      <MoneyExchanger/>
    </Provider>
  );
  let sellingCurrencyInput = wrapper.find('input').at(0);

  sellingCurrencyInput.getDOMNode<HTMLInputElement>().value = '0.23';
  sellingCurrencyInput.simulate('change');
  sellingCurrencyInput.getDOMNode<HTMLInputElement>().value = '0.233';
  sellingCurrencyInput.simulate('change');

  sellingCurrencyInput = wrapper.find('input').at(0);
  expect(sellingCurrencyInput.prop('value')).toEqual(0.23);
});

test('it should omit entering number greater than user wallet', () => {
  const mockStore = configureStore();

  const store = mockStore(storeMock);

  store.dispatch = jest.fn();

  const wrapper = mount(
    <Provider store={store}>
      <MoneyExchanger/>
    </Provider>
  );
  let sellingCurrencyInput = wrapper.find('input').at(0);

  sellingCurrencyInput.getDOMNode<HTMLInputElement>().value = '48';
  sellingCurrencyInput.simulate('change');

  sellingCurrencyInput.getDOMNode<HTMLInputElement>().value = '480';
  sellingCurrencyInput.simulate('change');

  sellingCurrencyInput = wrapper.find('input').at(0);
  expect(sellingCurrencyInput.prop('value')).toEqual(48);
});


test('it should allow enter 0 after the dot', () => {
  const mockStore = configureStore();

  const store = mockStore(storeMock);

  store.dispatch = jest.fn();

  const wrapper = mount(
    <Provider store={store}>
      <MoneyExchanger/>
    </Provider>
  );
  let sellingCurrencyInput = wrapper.find('input').at(0);

  sellingCurrencyInput.getDOMNode<HTMLInputElement>().value = '2.';
  sellingCurrencyInput.simulate('change');

  sellingCurrencyInput.getDOMNode<HTMLInputElement>().value = '2.0';
  sellingCurrencyInput.simulate('change');

  sellingCurrencyInput = wrapper.find('input').at(0);
  expect(sellingCurrencyInput.prop('value')).toEqual('2.0');
});

it('should omit buying amount input when needed value to sell is greater when user wallet amount', () => {
  const mockStore = configureStore();

  const store = mockStore(storeMock);

  store.dispatch = jest.fn();

  const wrapper = mount(
    <Provider store={store}>
      <MoneyExchanger/>
    </Provider>
  );
  let buyingCurrencyInput = wrapper.find('input').at(1);
  buyingCurrencyInput.getDOMNode<HTMLInputElement>().value = '50';
  buyingCurrencyInput.simulate('change');
  buyingCurrencyInput.getDOMNode<HTMLInputElement>().value = '500';
  buyingCurrencyInput.simulate('change');

  buyingCurrencyInput = wrapper.find('input').at(1);
  expect(buyingCurrencyInput.prop('value')).toEqual(50);
});
