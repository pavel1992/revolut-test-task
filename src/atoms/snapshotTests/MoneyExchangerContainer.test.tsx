import 'jest-styled-components';
import * as React from 'react';
import renderer from 'react-test-renderer';

import { MoneyExchangerContainer } from '../MoneyExchangerContainer';

test('renders MoneyExchangerContainer correctly', () => {
  const render = renderer
    .create(<MoneyExchangerContainer>111</MoneyExchangerContainer>)
    .toJSON();
  expect(render).toMatchSnapshot();
});
