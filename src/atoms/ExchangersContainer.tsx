import styled from 'styled-components';

import { TABLET_BREAKPOINT } from '../styleConstants/mediaConstants';

export const ExchangersContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  @media(max-width: ${TABLET_BREAKPOINT}) {
    flex-direction: column;
  }
`;
