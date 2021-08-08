import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Title from 'antd/lib/typography/Title';

import Button from 'components/common/Button';
import { AuthContext } from 'components/services/Auth/AuthProvider';

const Wrapper = styled.div`
  > h1 {
    margin-bottom: 30px;
  }
`;

const Activation = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const params = useParams();

  const handleActivate = async () => {
    await authCtx.activate(params.token);
    history.replace('/', { activated: true });
  };

  return (
    <Wrapper>
      <Title level={1}>Aktivacija</Title>
      <Button type="primary" onClick={handleActivate}>
        Aktiviraj račun
      </Button>
    </Wrapper>
  );
};

export default Activation;
