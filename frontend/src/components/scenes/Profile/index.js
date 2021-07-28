import React from 'react';
import Tabs from 'antd/lib/tabs';
import BookOutlined from '@ant-design/icons/BookOutlined';
import HistoryOutlined from '@ant-design/icons/HistoryOutlined';

import Header from 'components/common/Header';
import useCurrentUser from 'components/services/Auth/useCurrentUser';
import Subscriptions from './components/Subscriptions';
import { PageWrapper, ContentWrapper } from './index.styled';

const { TabPane } = Tabs;

const Profile = () => {
  const { user } = useCurrentUser();

  return (
    <PageWrapper>
      <Header />
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
