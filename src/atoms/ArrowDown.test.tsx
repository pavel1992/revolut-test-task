import * as React from 'react';
import renderer from 'react-test-renderer';

import { ArrowDown } from "./ArrowDown";


test('renders arrow correctly', () => {
  const render = renderer
    .create(<ArrowDown/>)
    .toJSON();
  expect(render).toMatchSnapshot();
});
