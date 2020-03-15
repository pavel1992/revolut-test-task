import styled from 'styled-components';

import { colors } from '../styleConstants/colors';
import { TABLET_BREAKPOINT } from '../styleConstants/mediaConstants';

export const Caption = styled.div`
  color: ${colors.captionWhite};
  font-size: 14px;
  @media(max-width: ${TABLET_BREAKPOINT}) {
    font-size: 12px;
  }
`;
