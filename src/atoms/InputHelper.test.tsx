import 'jest-styled-components';
import * as React from 'react';
import renderer from 'react-test-renderer';

import { InputHelper } from './InputHelper';


test('renders InputHelper correctly', () => {
  const render = renderer
    .create(<InputHelper>111</InputHelper>)
    .toJSON();
  expect(render).toMatchSnapshot();
});
