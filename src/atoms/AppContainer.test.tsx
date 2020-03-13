import * as React from 'react';
import renderer from 'react-test-renderer';

import { AppContainer } from "./AppСontainer";


test('renders app container correctly', () => {
  const renderedApp = renderer
    .create(<AppContainer/>)
    .toJSON();
  expect(renderedApp).toMatchSnapshot();
});
