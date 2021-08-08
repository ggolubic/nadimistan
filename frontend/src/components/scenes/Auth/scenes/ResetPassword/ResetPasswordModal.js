import React, { useState } from 'react';
import Modal from 'antd/lib/modal';
import Text from 'antd/lib/typography/Text';
import Alert from 'antd/lib/alert';
import Input from 'antd/lib/input';

import Button from 'components/common/Button';

const ResetPasswordModal = ({ isOn, loading, error, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  return (
    <Modal
      title="Zatraži promjenu lozinke"
      centered
      visible={isOn}
      onOk={onSubmit}
      onCancel={onClose}
      destroyOnClose
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          disabled={email.length < 3}
          onClick={() => onSubmit(email)}
        >
          Potvrdi
        </Button>,
      ]}
    >
      {error && (
        <Alert
          type="error"
          closable
          message="Nešto je pošlo po zlu, probajte ponovno kasnije."
          style={{ marginBottom: '20px' }}
        />
      )}
      <Text>Unesite Vaš email</Text>
      <Input
        name="email"
        type="email"
        size="large"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.currentTarget.value)}
      />
    </Modal>
  );
};

export default ResetPasswordModal;
