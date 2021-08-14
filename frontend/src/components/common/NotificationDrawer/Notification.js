import React from 'react';
import styled from 'styled-components';
import Text from 'antd/lib/typography/Text';
import CheckOutlined from '@ant-design/icons/CheckOutlined';

import useNotifications from 'components/services/Notifications/useNotifications';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ isRead }) => (isRead ? '#e2e2e2' : 'white')};
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 15px;
`;

const SecondaryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Notification = ({ id, isRead, listingIds, createdAt, index }) => {
  const { updateUserNotification } = useNotifications();
  const dateString = new Date(createdAt).toLocaleDateString();

  return (
    <Wrapper isRead={isRead}>
      <Text strong>{`Pronašli smo ${listingIds.length} nova oglasa!`}</Text>
      <SecondaryWrapper>
        <Text type="secondary">{dateString}</Text>
        {!isRead && (
          <CheckOutlined size="large" onClick={() => updateUserNotification(id, index)} />
        )}
      </SecondaryWrapper>
    </Wrapper>
  );
};

export default Notification;
