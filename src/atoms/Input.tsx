import styled from 'styled-components';

import { colors } from '../styleConstants/colors';
import { TABLET_BREAKPOINT } from '../styleConstants/mediaConstants';

export const Input = styled.input`
  font-size: 72px;
  line-height: 98px;
  color: ${colors.black};
  border: none;
  max-width: 230px;
  &:focus {
    outline: none;
  }

  @media(max-width: ${TABLET_BREAKPOINT}) {
    font-size: 64px;
    line-height: 87px;
    max-width: 170px;
  }
`;

