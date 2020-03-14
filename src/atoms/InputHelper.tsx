import styled from 'styled-components';

import { colors } from '../colors';

export const InputHelper = styled.span`
    font-size: 72px;
    line-height: 98px;
    color: ${colors.black};
    @media(max-width 768px) {
        font-size: 64px;
    }
`;
