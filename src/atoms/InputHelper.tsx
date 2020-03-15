import styled from 'styled-components';

import { colors } from '../styleConstants/colors';
import { TABLET_BREAKPOINT } from '../styleConstants/mediaConstants';

export const InputHelper = styled.span`
  font-size: 72px;
  line-height: 98px;
  color: ${colors.black};
  @media(max-width: ${TABLET_BREAKPOINT}) {
    font-size: 64px;
  }
`;
