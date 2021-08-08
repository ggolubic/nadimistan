import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Alert from 'antd/lib/alert';

import Button from 'components/common/Button';
import { Title } from 'components/common/Typography';
import { AuthContext } from 'components/services/Auth/AuthProvider';

export const Wrapper = styled.div`
  margin: 15px 20px;
  & > h3 {
    text-align: left;
  }
`;

const ResetPassword = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const params = useParams();

  const handleOnFinish = async val => {
    await authCtx.resetPassword(params.token, val.password1);
    history.push('/', { resettedPassword: true });
  };

  return (
    <Wrapper>
      <Title level={3}>Promjena Lozinke</Title>
      {!!authCtx.resetPasswordError && (
        <Alert type="error" closable message="Nešto je pošlo po zlu, probajte ponovno kasnije." />
      )}
      <Form
        name="reset-password-form"
        layout="vertical"
        onFinish={handleOnFinish}
        requiredMark={'optional'}
      >
        <Form.Item
          name="password1"
          label="Lozinka"
          rules={[
            { required: true, message: 'Unesite lozinku' },
            { min: 8, message: 'Zaporka mora imati bar 8 znakova' },
          ]}
        >
          <Input size="large" type="password" />
        </Form.Item>
        <Form.Item
          name="password2"
          label="Potvrda lozinke"
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
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={authCtx.resettingPassword}
          >
            Promijeni lozinku
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default ResetPassword;
