import React from 'react';
import styled from 'styled-components';
import AntdTitle from 'antd/lib/typography/Title';

export const Title = styled(props => <AntdTitle {...props} />)`
  ${({ primaryColor }) => primaryColor && 'color: #4498E6 !important'};
  ${({ customColor }) => customColor && `color: ${customColor} !important`};
  ${({ fontSize }) => fontSize && `font-size:${fontSize}px !important`};

  @media only screen and (min-width: 320px) and (max-width: 700px) {
    //no level means its h1
    ${({ level }) => !level && 'font-size: 24px !important'};
  }
`;
