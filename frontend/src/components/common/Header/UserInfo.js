import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'antd/lib/avatar';
import Badge from 'antd/lib/badge';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Text from 'antd/lib/typography/Text';
import SmileTwoTone from '@ant-design/icons/SmileTwoTone';

import { AuthContext } from 'components/services/Auth/AuthProvider';
import useNotifications from 'components/services/Notifications/useNotifications';

import { UserWrapper } from './index.styled';

const MOCK_USER = { fullName: 'Gabrijel Golubic' };

const menu = logout => (
  <Menu>
    <Menu.Item key="0">
      <Link to="/profile">Otiđi na profil</Link>
    </Menu.Item>
    <Menu.Item key="1">
      <Text type="danger" onClick={logout}>
        Odlogiraj se
      </Text>
    </Menu.Item>
  </Menu>
);

const UserInfo = ({ user = MOCK_USER, onNotificationClick }) => {
  const { logout } = useContext(AuthContext);
  const { data } = useNotifications();

  const unreadNotifications = data.reduce((acc, cur) => {
    return cur.isRead ? acc : (acc += 1);
  }, 0);

  return (
    <UserWrapper>
      <Badge
        title="Broj notifikacija"
        count={unreadNotifications}
        dynamic
        overflowCount={10}
        offset={[-10, 2]}
        size="small"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onNotificationClick();
        }}
      >
        <Avatar gap={10} alt="user icon" icon={<SmileTwoTone style={{ fontSize: '32px' }} />} />
      </Badge>
      <Dropdown overlay={menu(logout)} trigger={['click']} arrow>
        <Text>{user?.fullName}</Text>
      </Dropdown>
    </UserWrapper>
  );
};

export default UserInfo;
