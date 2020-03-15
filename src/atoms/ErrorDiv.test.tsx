import * as React from 'react';
import renderer from 'react-test-renderer';

import { ErrorDiv } from './ErrorDiv';


test('renders ErrorDiv correctly', () => {
  const render = renderer
    .create(<ErrorDiv>111</ErrorDiv>)
    .toJSON();
  expect(render).toMatchSnapshot();
});
