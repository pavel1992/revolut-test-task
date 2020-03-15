import styled, { css } from 'styled-components';

import { colors } from "../styleConstants/colors";
import { TABLET_BREAKPOINT } from '../styleConstants/mediaConstants';

export interface CurrencyContainerProps {
  isFromCurrency?: boolean;
}

export const CurrencyContainer = styled.div<CurrencyContainerProps>`
  display: flex;
  flex-grow: 1;
  border: 1px solid ${colors.thinBorderWhite};
  border-radius: ${props => props.isFromCurrency ? '8px 0 0 8px' : '0 8px 8px 0'};
  flex-direction: column;
  position: relative;
  padding: 48px 0 54px 48px;
  border-collapse: collapse;

  @media(max-width: ${TABLET_BREAKPOINT}) {
    border: none;
    flex-direction: row;
    justify-content: space-between;
    ${props => props.isFromCurrency &&
      css`
        border-bottom: 1px solid ${colors.thinBorderWhite};
      `
    }
  }

  ${props => !props.isFromCurrency &&
    css`
    border-left: none;
  `
  }

  ${props => props.isFromCurrency &&
    css`
      &:after, &:before {
        left: 100%;
        top: 50%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
      }

      &:after {
        border-color: rgba(255, 255, 255, 0);
        border-left-color: ${colors.white};
        border-width: 15px;
        margin-top: -15px;
      }
      &:before {
        border-color: rgba(194, 225, 245, 0);
        border-left-color: ${colors.thinBorderWhite};
        border-width: 16px;
        margin-top: -16px;
      }

      @media(max-width: ${TABLET_BREAKPOINT}) {
        &:after, &:before {
          top: 100%;
          left: 50%;
          border: solid transparent;
          content: " ";
          height: 0;
          width: 0;
          position: absolute;
          pointer-events: none;
        }

        &:after {
          border-color: rgba(255, 255, 255, 0);
          border-top-color: ${colors.white};
          border-width: 15px;
          margin-top: 0;
          margin-left: -15px;
        }
        &:before {
          border-color: rgba(194, 225, 245, 0);
          border-top-color: ${colors.thinBorderWhite};
          border-width: 16px;
          margin-top: 0;
          margin-left: -16px;
        }
      }
  `}
`;
