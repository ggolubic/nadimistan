import styled from 'styled-components';

export const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const NavBar = styled.div`
  position: relative;
  display: flex;
  height: 80px;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  & > h1 {
    margin: 0;
    padding: 10px 0;
  }
`;

export const HeroContent = styled.div`
  width: 80%;
  height: 200px;
  margin: 50px auto;
  z-index: 5;
  text-align: center;
`;

export const FormBackground = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: 150px;
  width: 80%;
  padding: 20px;
  margin: 30px auto 0;
  border-radius: 10px;
`;

export const SearchInputsWrapper = styled.div`
  display: flex;
  > span {
    margin-bottom: 20px;
    &:not(:last-child) {
      margin-right: 15px;
    }
  }
`;
