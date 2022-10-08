import { ThreeCircles } from 'react-loader-spinner';
import styled from '@emotion/styled';
export const SpinerWraper = styled.div`
  position: fixed;
  /* bottom: 20px; */

  z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* right: 30px; */
`;
export const Spiner = styled(ThreeCircles)``;
