import styled from 'styled-components';
import heroImage from 'images/bg_v1.jpeg';

export const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const NavBar = styled.div`
  height: auto;
  width: 100%;
  text-align: center;
  & > h1 {
    margin: 0;
    padding: 10px 0;
  }
`;

export const HeroWrapper = styled.div`
  position: relative;
  flex: 0 1 100%;
  width: 100%;
`;
export const Overlay = styled.div`
  position: absolute;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
`;

export const Hero = styled.div`
  display: flex;
  height: 100%;
  min-height: 400px;
  z-index: 2;
  background-image: url(${heroImage});
  background-size: cover;
  background-position: 92%;
`;

export const Banner = styled.div`
  align-self: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  min-width: 350px;
  background-color: #fffbf4;
  border-radius: 5px;
  z-index: 4;
`;

export const Brief = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 30px;
  height: 100%;
  width: 60%;
  max-width: 660px;
  margin: 30px auto;
  & > h2 {
    margin-bottom: 30px;
  }
  & > div {
    font-size: 20px;
    text-align: justify;
  }
  span {
    color: #4498e6;
    font-weight: 600;
  }
`;
