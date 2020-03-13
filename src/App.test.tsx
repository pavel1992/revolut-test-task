import * as React from 'react';
import renderer from 'react-test-renderer';

import { App } from './App';

test('renders app correctly', () => {
  const renderedApp = renderer
    .create(<App/>)
    .toJSON();
  expect(renderedApp).toMatchSnapshot();
});
