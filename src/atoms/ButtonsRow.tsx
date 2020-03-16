import styled from 'styled-components';

import { TABLET_BREAKPOINT } from '../styleConstants/mediaConstants';

export const ButtonsRow = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 24px 0;

  @media(max-width: ${TABLET_BREAKPOINT}) {
    margin-bottom: 0;
  }
`;
