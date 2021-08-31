import React, { useState } from 'react';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Select from 'antd/lib/select';
import Space from 'antd/lib/space';
import Checkbox from 'antd/lib/checkbox';
import DownOutlined from '@ant-design/icons/DownOutlined';

import Button from 'components/common/Button';

const SizeOptions = ({ onValueChange, onCheckboxChange, value }) => (
  <Menu style={{ padding: '10px', borderRadius: '5px' }}>
    <Space direction="vertical">
      <Select onChange={onValueChange} name="size" value={value} style={{ width: '100%' }}>
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

      <Checkbox onChange={onCheckboxChange} disabled={!value}>
        Želim kvadrate od
      </Checkbox>
    </Space>
  </Menu>
);

const SizeFilter = ({ value, onValueChange, onCheckboxChange }) => {
  const [isGreater, setIsGreater] = useState(false);

  return (
    <Dropdown
      overlay={
        <SizeOptions
          value={value}
          onValueChange={size => onValueChange(size, isGreater)}
          onCheckboxChange={e => {
            setIsGreater(e.target.checked);
            onCheckboxChange(e.target.checked);
          }}
        />
      }
      trigger={['click']}
    >
      <Button onClick={e => e.preventDefault()} filterview>
        m2: {value && `${isGreater ? 'Od' : 'Do'} ${value}`} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default SizeFilter;
