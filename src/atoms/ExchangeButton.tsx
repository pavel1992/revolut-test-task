import styled from 'styled-components';

import { colors } from '../colors';

export const ExchangeButton = styled.button`
    padding: 14px 50px;
    background-color: ${colors.pink};
    color: ${colors.white};
    border-radius: 24px;
    border: none;
    &:focus {
        outline: none;
    }
`;
