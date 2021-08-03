import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'antd/lib/avatar';
import Badge from 'antd/lib/badge';
import Text from 'antd/lib/typography/Text';
import SmileTwoTone from '@ant-design/icons/SmileTwoTone';

import { UserWrapper } from './index.styled';

const MOCK_USER = { fullName: 'Gabrijel Golubic' };

const UserInfo = ({ user = MOCK_USER }) => {
  return (
    <UserWrapper>
      <Badge title="Broj notifikacija" count={5} size="small">
        <Avatar gap={10} alt="user icon" icon={<SmileTwoTone style={{ fontSize: '32px' }} />} />
      </Badge>
      <Link to="/profile">
        <Text>{user?.fullName}</Text>
      </Link>
    </UserWrapper>
  );
};

export default UserInfo;
