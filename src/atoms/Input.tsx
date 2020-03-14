import styled from 'styled-components';

import { colors } from '../colors';

export const Input = styled.input`
    font-size: 72px;
    line-height: 98px;
    color: ${colors.black};
    border: none;
    max-width: 300px;
    &:focus {
        outline: none;
    }

    @media(max-width: 768px) {
        font-size: 64px;
        line-height: 87px;
    }
`;

