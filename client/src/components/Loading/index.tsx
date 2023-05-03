import React, { FC } from 'react';
import styled from 'styled-components';

import { COLOR } from '../../constants/style';

const Loading: FC = () => (
  <DivWrapper data-testid="app-loader">
    <svg width="34" height="12" viewBox="-1 0 33 12">
      <circle
        data-testid="circle-loader"
        className="stardust-spinner"
        cx="4"
        cy="6"
        r="4"
        fill={COLOR.BLUE_MEDIUM}
      />
      <circle
        data-testid="circle-loader"
        className="stardust-spinner"
        cx="16"
        cy="6"
        r="4"
        fill={COLOR.BLUE_MEDIUM}
      />
      <circle
        data-testid="circle-loader"
        className="stardust-spinner"
        cx="28"
        cy="6"
        r="4"
        fill={COLOR.BLUE_MEDIUM}
      />
    </svg>
  </DivWrapper>
);

const DivWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  .stardust-spinner {
    animation: 0.4s movement linear infinite;
    &:nth-child(2) {
      animation-delay: 0.1s;
    }
    &:nth-child(3) {
      animation-delay: 0.2s;
    }
  }
  @keyframes movement {
    0% {
      transform: translateY(2px);
    }
    50% {
      transform: translateY(-2px);
    }
    to {
      transform: translateY(2px);
    }
  }
`;

export default Loading;
