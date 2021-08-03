import React, { useState } from 'react';
import styled from 'styled-components';
import Empty from 'antd/lib/empty';
import Alert from 'antd/lib/alert';
import Checkbox from 'antd/lib/checkbox';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Spin from 'antd/lib/spin';
import Select from 'antd/lib/select';
import Slider from 'antd/lib/slider';

import Button from 'components/common/Button';
import useSubscriptions from 'components/services/Subscription/useSubscriptions';

const Wrapper = styled.div`
  margin: 20px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 95%;
  max-width: 600px;
  text-align: center;
  @media only screen and (min-width: 650px) {
    flex-direction: row;
    margin: 40px auto;
    padding: 50px;
  }
`;

const SizeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0 auto;
  justify-content: space-between;
  & > :first-child {
    margin-bottom: 15px;
  }
`;

const Subscriptions = ({ user }) => {
  const [canCreateNewSub, setCanCreateNewSub] = useState(!!data.length || false);
  const [m2, setM2] = useState(null);
  const { data, loading, createUserSubscription, updateUserSubscription, disableUserSubscription } =
    useSubscriptions(user);
  const [actionSuccess, setActionSuccess] = useState(false);

  const handleRemoveSub = () => {
    disableUserSubscription(user, data[0].subId);
    setActionSuccess('Pretplata uspješno obrisana!');
    setCanCreateNewSub(true);
  };

  const handleFinish = values => {
    if (!data.length) {
      createUserSubscription(user, values);
      setActionSuccess('Pretplata uspješno kreirana!');
    } else {
      updateUserSubscription(user, data[0].subId, values);
      setActionSuccess('Pretplata uspješno promjenjena!');
    }
  };

  if (loading) {
    return (
      <Wrapper>
        <Spin tip="Loading..." />
      </Wrapper>
    );
  }
  if (canCreateNewSub) {
    return (
      <Wrapper>
        {actionSuccess && (
          <Alert
            type="success"
            message={actionSuccess}
            closable
            onClose={() => setActionSuccess(false)}
          />
        )}
        <Empty description="Nema postojećih pretplata">
          <Button type="primary" onClick={() => setCanCreateNewSub(false)}>
            Napravi novu pretplatu
          </Button>
        </Empty>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {actionSuccess && (
        <Alert
          type="success"
          message={actionSuccess}
          closable
          banner
          onClose={() => setActionSuccess(false)}
        />
      )}
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        initialValues={{
          ...data?.[0]?.config,
          interval: data?.[0]?.interval,
        }}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Županija"
          name="zupanija"
          dependencies={['grad']}
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value || getFieldValue('grad')) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('Morate unijeti županiju ili grad'));
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Grad"
          name="grad"
          dependencies={['zupanija']}
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value || getFieldValue('zupanija')) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('Morate unijeti županiju ili grad'));
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Veličina">
          <SizeWrapper>
            <Form.Item name="m2">
              <Select style={{ width: '100%' }} onChange={setM2}>
                <Select.Option value={30}>30 m2</Select.Option>
                <Select.Option value={40}>40 m2</Select.Option>
                <Select.Option value={50}>50 m2</Select.Option>
                <Select.Option value={60}>60 m2</Select.Option>
                <Select.Option value={70}>70 m2</Select.Option>
                <Select.Option value={80}>80 m2</Select.Option>
                <Select.Option value={90}>90 m2</Select.Option>
                <Select.Option value={100}>100 m2</Select.Option>
                <Select.Option value={120}>120 m2</Select.Option>
                <Select.Option value={150}>150 m2</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="m2_greater" valuePropName="checked" noStyle>
              <Checkbox disabled={!m2}>Traži stanove s više kvadrata</Checkbox>
            </Form.Item>
          </SizeWrapper>
        </Form.Item>
        <Form.Item name="cijena" label="Cijena">
          <Slider min={0} max={10000} step={100} marks={{ 0: '0 kn', 20000: '20000 kn' }} />
        </Form.Item>
        <Form.Item
          name="interval"
          label="Javi mi o novim stanovima"
          labelCol={{ span: 10 }}
          rules={[
            {
              required: true,
              message: 'Unesite koliko često želite dobivati obavijesti',
            },
          ]}
        >
          <Select>
            <Select.Option value={86400}>Svaki dan</Select.Option>
            <Select.Option value={43200}>Svako pola dana</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <ActionWrapper>
            {!!data.length && (
              <Button type="danger" onClick={handleRemoveSub}>
                Obriši pretplatu
              </Button>
            )}

            <Button type="primary" htmlType="submit">
              {!data.length ? 'Dodaj pretplatu' : ' Promijeni pretplatu'}
            </Button>
          </ActionWrapper>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default Subscriptions;
