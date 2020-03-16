import 'jest-styled-components';
import * as React from 'react';
import renderer from 'react-test-renderer';

import { InputWithInfoContainer } from '../InputWithInfoContainer';


test('renders InputWithInfoContainer correctly', () => {
  const render = renderer
    .create(<InputWithInfoContainer>111</InputWithInfoContainer>)
    .toJSON();
  expect(render).toMatchSnapshot();
});
