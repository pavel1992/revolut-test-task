import styled from 'styled-components';

import { colors } from '../styleConstants/colors';

export const ExchangeButton = styled.button`
  padding: 14px 50px;
  background-color: ${colors.pink};
  color: ${colors.white};
  border-radius: 24px;
  border: none;
  cursor: pointer;
  &:focus {
      outline: none;
  }

  &:hover {
    background-color: ${colors.hoveredPink};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${colors.disabledGray}
  }
`;
