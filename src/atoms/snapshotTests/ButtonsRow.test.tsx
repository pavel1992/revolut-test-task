import 'jest-styled-components';
import * as React from 'react';
import renderer from 'react-test-renderer';

import { ButtonsRow } from '../ButtonsRow';

test('renders ButtonsRow correctly', () => {
  const render = renderer
    .create(<ButtonsRow>111</ButtonsRow>)
    .toJSON();
  expect(render).toMatchSnapshot();
});
