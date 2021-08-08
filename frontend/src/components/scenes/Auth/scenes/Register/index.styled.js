import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 15px 20px;
  & > h3 {
    text-align: left;
  }
  & > form > div {
    margin-bottom: 10px;
  }
  input {
    font-weight: 600;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
