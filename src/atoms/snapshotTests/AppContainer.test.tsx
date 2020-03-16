import 'jest-styled-components';
import * as React from 'react';
import renderer from 'react-test-renderer';

import { AppContainer } from "../AppСontainer";


test('renders app container correctly', () => {
  const render = renderer
    .create(<AppContainer/>)
    .toJSON();
  expect(render).toMatchSnapshot();
});
