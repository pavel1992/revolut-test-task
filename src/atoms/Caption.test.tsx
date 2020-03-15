import * as React from 'react';
import renderer from 'react-test-renderer';

import { Caption } from './Caption';


test('renders Caption correctly', () => {
  const render = renderer
    .create(<Caption>111</Caption>)
    .toJSON();
  expect(render).toMatchSnapshot();
});
