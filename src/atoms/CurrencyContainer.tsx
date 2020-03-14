import styled from 'styled-components';

import { colors } from "../colors";

export interface CurrencyContainerProps {
  isFromCurrency?: boolean;
}

export const CurrencyContainer = styled.div<CurrencyContainerProps>`
  display: flex;
  border: 1px solid ${colors.thinBorderWhite};
  border-radius: 8px 0 0 8px;
  flex-direction: column;
  position: relative;
  padding: 48px 0 54px 48px;
`;
