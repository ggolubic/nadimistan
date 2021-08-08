import React, { useContext, useState } from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Title from 'antd/lib/typography/Title';
import Link from 'antd/lib/typography/Link';
import Alert from 'antd/lib/alert';

import Button from 'components/common/Button';
import { AuthContext } from 'components/services/Auth/AuthProvider';
import { Wrapper, Actions } from './index.styled';
import ResetPasswordModal from 'components/scenes/Auth/scenes/ResetPassword/ResetPasswordModal';

const Login = ({ location }) => {
  const authCtx = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [resetMailSent, setResetMailSent] = useState(false);

  const handleOnFinish = async val => {
    await authCtx.login(val.email, val.password);
  };

  const handleResetPassword = async val => {
    await authCtx.requestResetPassword(val);
    setResetMailSent(true);
    setOpenModal(false);
  };

  return (
    <Wrapper>
      {openModal && (
        <ResetPasswordModal
          onClose={() => setOpenModal(false)}
          isOn={openModal}
          loading={authCtx.requestingResetPassword}
          error={authCtx.requestingResetPasswordError}
          onSubmit={handleResetPassword}
        />
      )}
      <Title level={3}>Prijava</Title>
      {!!authCtx.loginError && (
        <Alert type="error" closable message="Kombinacija emaila i lozinke nije ispravna." />
      )}
      {location.state?.activated && (
        <Alert type="success" closable message="Uspješno aktiviran račun!" />
      )}
      {location.state?.registered && (
        <Alert type="success" closable message="Provjerite email za aktivacijski link." />
      )}
      {resetMailSent && (
        <Alert
          type="success"
          closable
          onClose={() => setResetMailSent(false)}
          message="Provjerite email za daljne upute."
        />
      )}
      <Form name="login-form" layout="vertical" onFinish={handleOnFinish} requiredMark={'optional'}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Unesite email adresu' }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Lozinka"
          rules={[{ required: true, message: 'Unesite lozinku' }]}
        >
          <Input size="large" type="password" />
        </Form.Item>
        <Form.Item>
          <Actions>
            <Button type="primary" htmlType="submit" size="large" loading={authCtx.loggingIn}>
              Prijavi se
            </Button>
            <div>
              <Link href="/register">Registriraj se!</Link>
            </div>
          </Actions>
        </Form.Item>
        <Button type="link" onClick={() => setOpenModal(true)}>
          Ne znam lozinku
        </Button>
      </Form>
    </Wrapper>
  );
};

export default Login;
