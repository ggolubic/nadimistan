import React from 'react';
import styled from 'styled-components';
import AntdButton from 'antd/lib/button';

const Button = styled(props => <AntdButton {...props} />)`
  font-weight: 600;
`;

export default Button;