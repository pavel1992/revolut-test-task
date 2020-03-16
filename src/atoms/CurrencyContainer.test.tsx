import 'jest-styled-components';
import * as React from 'react';
import renderer from 'react-test-renderer';

import { CurrencyContainer } from "./CurrencyContainer";


test('renders currency container correctly', () => {
  const render = renderer
    .create(<CurrencyContainer/>)
    .toJSON();
  expect(render).toMatchSnapshot();
});
