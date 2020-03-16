import styled from 'styled-components';

import { TABLET_BREAKPOINT } from '../styleConstants/mediaConstants';

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media(max-width: ${TABLET_BREAKPOINT}) {
    flex-direction: column;
  }
`;
