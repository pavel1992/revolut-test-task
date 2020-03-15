import * as React from 'react';
import renderer from 'react-test-renderer';

import { ExchangeButton } from './ExchangeButton';


test('renders ExchangeButton correctly', () => {
  const render = renderer
    .create(<ExchangeButton>111</ExchangeButton>)
    .toJSON();
  expect(render).toMatchSnapshot();
});
