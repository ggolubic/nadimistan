import styled from 'styled-components';

export const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  width: 95%;
  margin: 0 auto;

  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: 90%;
  }
  @media only screen and (min-width: 1024px) {
    width: 80%;
  }
`;
