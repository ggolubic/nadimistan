import React from 'react';

import { Title } from 'components/common/Typography';
import useCurrentUser from 'components/services/Auth/useCurrentUser';
import UserInfo from './UserInfo';

import { NavBar } from './index.styled';

const Header = () => {
  const { user } = useCurrentUser();
  return (
    <NavBar>
      <Title fontSize={36} primaryColor>
        NađiMiStan
      </Title>
      <UserInfo user={user} />
    </NavBar>
  );
};

export default Header;
