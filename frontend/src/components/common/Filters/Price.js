import React from 'react';
import styled from 'styled-components';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Radio from 'antd/lib/radio';
import Space from 'antd/lib/space';
import Input from 'antd/lib/input-number';
import DownOutlined from '@ant-design/icons/DownOutlined';

import Button from 'components/common/Button';

const StyledInput = styled(props => <Input {...props} />)`
  border: none;
  border-bottom: 1px solid #cccaca;
`;

const PriceOptions = ({ onChange, value }) => (
  <Menu style={{ padding: '10px', borderRadius: '5px' }}>
    <Space direction="vertical">
      <Radio.Group
        defaultValue={1500}
        onChange={e => {
          onChange(e.target.value);
        }}
        name="price"
        value={value}
      >
        <Space direction="vertical">
          <Radio value={1500}>1500 kn</Radio>
          <Radio value={2000}>2000 kn</Radio>
          <Radio value={3000}>3000 kn</Radio>
        </Space>
      </Radio.Group>

      <StyledInput
        type="number"
        min={1}
        max={20000}
        step={50}
        placeholder="Cijena do..."
        style={{ width: '100px' }}
        onChange={onChange}
      />
    </Space>
  </Menu>
);

const PriceFilter = ({ value, onChange }) => {
  return (
    <Dropdown overlay={<PriceOptions value={value} onChange={onChange} />} trigger={['click']}>
      <Button onClick={e => e.preventDefault()} filterview>
        Cijena: {value && `${value} kn`} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default PriceFilter;
