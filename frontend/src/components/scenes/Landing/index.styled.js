import styled from 'styled-components';

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

export const Banner = styled.div`
  align-self: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  background-color: #fffbf4;
  border-radius: 5px;
  z-index: 4;
  @media only screen and (min-width: 320px) and (max-width: 400px) {
    min-width: 320px;
  }
  @media only screen and (min-width: 400px) {
    min-width: 350px;
  }
`;

export const Brief = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 30px;
  height: 100%;
  width: 80%;
  max-width: 660px;
  margin: 30px auto;

  span {
    color: #4498e6;
    font-weight: 600;
  }
  & > div {
    font-size: 14px;
    text-align: justify;
  }
  & > h2 {
    font-size: 20px;
    margin-bottom: 30px;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: 60%;
    & > h2 {
      font-size: 28px;
      margin-bottom: 30px;
    }
    & > div {
      font-size: 16px;
      text-align: justify;
    }
  }
  @media only screen and (min-width: 1024px) {
    & > h2 {
      font-size: 32px;
    }
    & > div {
      font-size: 20px;
      text-align: justify;
    }
  }
`;
