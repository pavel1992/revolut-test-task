import styled from 'styled-components';

import { SMALL_DESKTOP_BREAKPOINT, TABLET_BREAKPOINT } from '../styleConstants/mediaConstants';

export const MoneyExchangerContainer = styled.div`
  width: 1160px;
  display: flex;
  flex-direction: column;

  @media(max-width: ${SMALL_DESKTOP_BREAKPOINT}) {
    width: 100%;
    padding: 0 60px;
  }

  @media(max-width: ${TABLET_BREAKPOINT}) {
    padding: 0;
  }
`;
