import React from 'react';
import styled from 'styled-components';

import heroImage from 'images/bg_v1.jpeg';

const HeroWrapper = styled.div`
  position: relative;
  flex: 0 1 100%;
  width: 100%;
`;
const Overlay = styled.div`
  position: absolute;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
`;

const HeroBackground = styled.div`
  display: flex;
  height: 100%;
  min-height: 400px;
  z-index: 2;
  background-image: url(${heroImage});
  background-size: cover;
  background-position: 92%;
`;

const Hero = ({ children }) => {
  return (
    <HeroWrapper>
      <Overlay />
      <HeroBackground>{children}</HeroBackground>
    </HeroWrapper>
  );
};

export default Hero;
