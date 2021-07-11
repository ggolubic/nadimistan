import React from 'react';
import styled from 'styled-components';
import AntdTitle from 'antd/lib/typography/Title';

export const Title = styled(props => <AntdTitle {...props} />)`
  ${({ primaryColor }) => primaryColor && 'color: #4498E6 !important'};
  ${({ fontSize }) => fontSize && `font-size:${fontSize}px !important`};
`;
