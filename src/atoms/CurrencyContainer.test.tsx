import * as React from 'react';
import renderer from 'react-test-renderer';

import { CurrencyContainer } from "./CurrencyContainer";


test('renders currency container correctly', () => {
  const renderedApp = renderer
    .create(<CurrencyContainer/>)
    .toJSON();
  expect(renderedApp).toMatchSnapshot();
});
