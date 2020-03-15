import styled from 'styled-components';

import { colors } from '../styleConstants/colors';
import { TABLET_BREAKPOINT } from '../styleConstants/mediaConstants';

export interface CurrencyTabProps {
    active: boolean;
}

export const CurrencyTab = styled.div<CurrencyTabProps>`
  line-height: 25px;
  cursor: pointer;
  padding-bottom: 10px;
  color: ${props => props.active ? colors.black : colors.disabledGray};
  border-bottom: 2px solid ${props => props.active ? colors.pink : 'transparent'};
  margin-right: 24px;

  @media(max-width: ${TABLET_BREAKPOINT}) {
    padding: 8px 0 8px 8px;
    margin-right: 0;
    margin-bottom: 4px;
    border-bottom: 0;
    border-left: 2px solid ${props => props.active ? colors.pink : 'transparent'};
  }
`;

CurrencyTab.displayName = 'CurrencyTab';
