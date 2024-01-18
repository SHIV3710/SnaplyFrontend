import React from 'react';
import { LuLoader } from 'react-icons/lu';
import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Main = styled.div`
  height: 100svh;
  width: 100svw;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5vh;
  animation: ${fadeInAnimation} 2s ease-in-out; /* Apply the fade-in animation */
  font-size: 100px;
`;

const LoaderIcon = styled(LuLoader)`
  animation: ${spinAnimation} 5s linear infinite; /* Make the spin animation slower by setting the duration to 2 seconds */
`;

export const Loader = () => {
  return (
    <Main>
      <LoaderIcon />
    </Main>
  );
};
