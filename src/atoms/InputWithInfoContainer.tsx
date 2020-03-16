import styled from 'styled-components';

import { TABLET_BREAKPOINT } from '../styleConstants/mediaConstants';

export const InputWithInfoContainer = styled.div`
  margin-top: 30px;

  @media(max-width: ${TABLET_BREAKPOINT}) {
    margin-top: 0;
  }
`;
