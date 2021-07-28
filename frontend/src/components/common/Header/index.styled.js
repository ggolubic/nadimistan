import styled from 'styled-components';

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

export const UserWrapper = styled.div`
  position: absolute;
  align-items: center;
  display: flex;
  right: 0;
  top: 0;
  padding: 10px;

  .ant-typography {
    display: none;
  }

  @media only screen and (min-width: 700px) {
    .ant-typography {
      display: block;
    }
    & :not(:last-child) {
      margin-right: 10px;
    }
    height: 70px;
  }
`;
