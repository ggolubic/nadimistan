import React from 'react';
import styled, { css } from 'styled-components';
import AntdButton from 'antd/lib/button';

const Button = styled(props => <AntdButton {...props} />)`
  font-weight: 600;
  ${({ type }) =>
    type === 'link' &&
    css`
      > span {
        text-decoration: underline;
      }
    `}
  ${({ filterView }) =>
    filterView &&
    css`
      border: none;
    `}
`;

export default Button;
