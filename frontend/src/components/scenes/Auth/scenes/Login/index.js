import React from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Typography from 'antd/lib/typography';
import Title from 'antd/lib/typography/Title';
import Link from 'antd/lib/typography/Link';

import Button from 'components/common/Button';
import { Wrapper, Actions } from './index.styled';

const Login = () => {
  const history = useHistory();

  const handleOnFinish = val => {
    history.push('/');
    console.log(val);
  };

  const handleResetPassword = val => {
    console.log(val);
  };

  return (
    <Wrapper>
      <Typography>
        <Title>Login</Title>
      </Typography>
      <Form name="login-form" layout="vertical" onFinish={handleOnFinish} requiredMark={'optional'}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please fill in your email address' }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please fill in your password' }]}
        >
          <Input size="large" type="password" />
        </Form.Item>
        <Form.Item>
          <Actions>
            <Button type="primary" htmlType="submit" size="large">
              Log in
            </Button>
            <div>
              Don't have an account? <Link href="/register">Register now!</Link>
            </div>
          </Actions>
        </Form.Item>
        <Button type="link" onClick={handleResetPassword}>
          I forgot my password
        </Button>
      </Form>
    </Wrapper>
  );
};

export default Login;
