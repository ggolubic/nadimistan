import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'antd/lib/avatar';
import Badge from 'antd/lib/badge';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Text from 'antd/lib/typography/Text';
import SmileTwoTone from '@ant-design/icons/SmileTwoTone';

import { AuthContext } from 'components/services/Auth/AuthProvider';

import { UserWrapper } from './index.styled';

const MOCK_USER = { fullName: 'Gabrijel Golubic' };

const menu = logout => (
  <Menu>
    <Menu.Item key="0">
      <Link to="/profile">Otidi na profil</Link>
    </Menu.Item>
    <Menu.Item key="1">
      <Text type="danger" onClick={logout}>
        Odlogiraj se
      </Text>
    </Menu.Item>
  </Menu>
);

const UserInfo = ({ user = MOCK_USER }) => {
  const { logout } = useContext(AuthContext);

  return (
    <Dropdown overlay={menu(logout)} trigger={['click']} arrow>
      <UserWrapper>
        <Badge title="Broj notifikacija" count={5} size="small">
          <Avatar gap={10} alt="user icon" icon={<SmileTwoTone style={{ fontSize: '32px' }} />} />
        </Badge>
        <Text>{user?.fullName}</Text>
      </UserWrapper>
    </Dropdown>
  );
};

export default UserInfo;
