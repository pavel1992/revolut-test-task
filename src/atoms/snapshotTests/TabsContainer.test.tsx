import 'jest-styled-components';
import * as React from 'react';
import renderer from 'react-test-renderer';

import { TabsContainer } from '../TabsContainer';

test('renders TabsContainer correctly', () => {
  const render = renderer
    .create(<TabsContainer>111</TabsContainer>)
    .toJSON();
  expect(render).toMatchSnapshot();
});
