import React from 'react';
import { Link } from 'react-router-dom';

import { Title } from 'components/common/Typography';
import useCurrentUser from 'components/services/Auth/useCurrentUser';
import UserInfo from './UserInfo';

import { NavBar } from './index.styled';

const Header = ({ onNotificationClick }) => {
  const { user } = useCurrentUser();
  return (
    <NavBar>
      <Link to="/search">
        <Title fontSize={36} primaryColor>
          NađiMiStan
        </Title>
      </Link>
      <UserInfo user={user} onNotificationClick={onNotificationClick} />
    </NavBar>
  );
};

export default Header;
