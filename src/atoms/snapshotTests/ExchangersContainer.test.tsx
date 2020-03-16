import 'jest-styled-components';
import * as React from 'react';
import renderer from 'react-test-renderer';

import { ExchangersContainer } from '../ExchangersContainer';

test('renders ExchangersContainer correctly', () => {
  const render = renderer
    .create(<ExchangersContainer>111</ExchangersContainer>)
    .toJSON();
  expect(render).toMatchSnapshot();
});
