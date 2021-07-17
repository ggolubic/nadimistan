import React from 'react';
import styled from 'styled-components';
import Avatar from 'antd/lib/avatar';
import Badge from 'antd/lib/badge';
import Text from 'antd/lib/typography/Text';
import SmileTwoTone from '@ant-design/icons/SmileTwoTone';

const UserWrapper = styled.div`
  position: absolute;
  align-items: center;
  display: flex;
  right: 0;
  top: 0;
  padding: 10px;

  .ant-typography {
    display: none;
  }

  @media only screen and (min-width: 700px) {
    .ant-typography {
      display: block;
    }
    & :not(:last-child) {
      margin-right: 10px;
    }
    height: 70px;
  }
`;

const MOCK_USER = { fullName: 'Gabrijel Golubic' };

const UserInfo = ({ user = MOCK_USER }) => {
  return (
    <UserWrapper>
      <Badge title="Broj notifikacija" count={5} size="small">
        <Avatar gap={10} alt="user icon" icon={<SmileTwoTone style={{ fontSize: '32px' }} />} />
      </Badge>
      <Text>{user?.fullName}</Text>
    </UserWrapper>
  );
};

export default UserInfo;
