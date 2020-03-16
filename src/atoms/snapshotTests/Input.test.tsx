import 'jest-styled-components';
import * as React from 'react';
import renderer from 'react-test-renderer';

import { Input } from '../Input';


test('renders Input correctly', () => {
  const render = renderer
    .create(<Input/>)
    .toJSON();
  expect(render).toMatchSnapshot();
});
