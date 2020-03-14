import styled from 'styled-components';

import { colors } from '../colors';

export const Caption = styled.div`
    color: ${colors.captionWhite};
    font-size: 14px;
    @media(max-width: 768px) {
      font-size: 12px;
    }
`;
