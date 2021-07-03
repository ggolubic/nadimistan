import styled from 'styled-components';
import heroImage from 'images/bg_v1.jpeg';

export const AuthContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export const BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 60%;
  background-image: url(${heroImage});
  background-size: cover;
  background-position: 92%;
`;

export const RouteContainer = styled.div`
  flex: 0 1 40%;
`;

export const RouteWrapper = styled.div``;
