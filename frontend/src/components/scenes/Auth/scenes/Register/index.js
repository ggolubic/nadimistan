import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Alert from 'antd/lib/alert';

import Button from 'components/common/Button';
import { Title } from 'components/common/Typography';
import { AuthContext } from 'components/services/Auth/AuthProvider';
import { ROUTE_CONFIG } from 'consts/routes';

import { Wrapper, Actions } from './index.styled';

const Register = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const handleOnFinish = async val => {
    await authCtx.register({ fullName: val.fullName, email: val.email, password: val.password1 });
    history.push('/', { registered: true });
  };

  return (
    <Wrapper>
      <Title level={3}>Registracija</Title>
      {!!authCtx.registrationError && (
        <Alert type="error" closable message={authCtx.registrationError.detail} />
      )}
      <Form
        name="register-form"
        layout="vertical"
        onFinish={handleOnFinish}
        requiredMark={'optional'}
      >
        <Form.Item
          name="fullName"
          label="Ime i Prezime"
          rules={[{ required: true, message: 'Unesite ime' }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: 'email',
              message: 'Nije unesena ispravna email adresa!',
            },
            { required: true, message: 'Unesite email adresu' },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="password1"
          label="Password"
          rules={[
            { required: true, message: 'Unesite lozinku' },
            { min: 8, message: 'Lozinka mora imati bar 8 znakova' },
          ]}
        >
          <Input size="large" type="password" />
        </Form.Item>
        <Form.Item
          name="password2"
          label="Confirm password"
          dependencies={['password1']}
          rules={[
            { required: true, message: 'Potvrdite lozinku' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password1') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('Lozinke koje ste unijeli se ne podudaraju!'));
              },
            }),
          ]}
        >
          <Input size="large" type="password" />
        </Form.Item>
        <Form.Item>
          <Actions>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={authCtx.registeringUser}
            >
              Registriraj se
            </Button>
          </Actions>
        </Form.Item>
        <Button type="link" href={ROUTE_CONFIG.AUTH.LOGIN}>
          Natrag na prijavu
        </Button>
      </Form>
    </Wrapper>
  );
};

export default Register;
