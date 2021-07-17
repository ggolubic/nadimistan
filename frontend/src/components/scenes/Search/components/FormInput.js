import React from 'react';
import styled from 'styled-components';

import Input from 'antd/lib/input';

const StyledFormInput = styled(props => <Input {...props} />)`
  border-radius: 5px;
`;

const FormInput = ({ prefix, onChange }) => {
  return <StyledFormInput prefix={prefix} size="large" onChange={e => onChange(e.target.value)} />;
};

export default FormInput;
