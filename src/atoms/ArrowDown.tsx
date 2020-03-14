import styled from "styled-components";

import { colors } from "../colors";

export const ArrowDown = styled.div`
  position: absolute;
  left: calc(50% - 25px);
  bottom: -25px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 25px 25px 0 25px;
  border-color: ${colors.thinBorderWhite} transparent transparent transparent;
  z-index: 1;
`;
