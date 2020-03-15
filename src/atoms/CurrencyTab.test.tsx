import * as React from 'react';
import renderer from 'react-test-renderer';

import { CurrencyTab } from './CurrencyTab';


test('renders CurrencyTab correctly', () => {
  const render = renderer
    .create(<CurrencyTab active={false}>111</CurrencyTab>)
    .toJSON();
  expect(render).toMatchSnapshot();
});
