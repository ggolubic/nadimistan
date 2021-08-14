import React, { useState } from 'react';
import Tabs from 'antd/lib/tabs';
import BookOutlined from '@ant-design/icons/BookOutlined';
import HistoryOutlined from '@ant-design/icons/HistoryOutlined';

import Header from 'components/common/Header';
import useCurrentUser from 'components/services/Auth/useCurrentUser';
import NotificationDrawer from 'components/common/NotificationDrawer';

import Subscriptions from './components/Subscriptions';
import { PageWrapper, ContentWrapper } from './index.styled';

const { TabPane } = Tabs;

const Profile = () => {
  const { user } = useCurrentUser();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <PageWrapper>
      <Header onNotificationClick={() => setDrawerOpen(true)} />
      <NotificationDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <ContentWrapper>
        <Tabs defaultActiveKey="1" centered>
          <TabPane
            tab={
              <span>
                <BookOutlined /> Pretplata
              </span>
            }
            key="1"
          >
            <Subscriptions user={user} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <HistoryOutlined /> Obavijesti
              </span>
            }
            disabled
            key="2"
          >
            Tab 2
          </TabPane>
        </Tabs>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default Profile;
