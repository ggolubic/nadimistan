import React from 'react';
import styled, { css } from 'styled-components';
import AntdButton from 'antd/lib/button';

const Button = styled(props => <AntdButton {...props} />)`
  font-weight: 600;
  ${({ type }) =>
    type === 'link' &&
    css`
      padding-left: 0;
      > span {
        text-decoration: underline;
      }
    `}
`;

export default Button;
