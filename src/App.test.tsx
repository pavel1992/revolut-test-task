import * as React from 'react';
import renderer from 'react-test-renderer';

import { App } from './App';

test('renders app correctly', () => {
  const render = renderer
    .create(<App/>)
    .toJSON();
  expect(render).toMatchSnapshot();
});
