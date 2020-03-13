import styled from 'styled-components';

import { colors } from "../colors";

export interface CurrencyContainerProps {
  isFromCurrency?: boolean;
}

export const CurrencyContainer = styled.div<CurrencyContainerProps>`
  background-color: ${(props: CurrencyContainerProps) => props.isFromCurrency ? colors.lightBlue : colors.darkBlue};
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;