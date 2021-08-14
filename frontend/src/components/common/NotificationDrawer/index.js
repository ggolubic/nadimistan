import React from 'react';
import Drawer from 'antd/lib/drawer';
import Spin from 'antd/lib/spin';
import Empty from 'antd/lib/empty';

import useNotifications from 'components/services/Notifications/useNotifications';
import Notification from './Notification';

const Content = ({ data, loading }) => {
  if (loading) {
    return <Spin tip="Loading..." />;
  }
  if (!data.length) {
    return <Empty description="Nemate obavijesti" />;
  }
  return data.map((n, i) => <Notification key={i} {...n} index={i} />);
};

const NotificationDrawer = ({ isOpen, onClose }) => {
  const { data, loading } = useNotifications();
  return (
    <Drawer
      title="Obavijesti"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={isOpen}
    >
      <Content data={data} loading={loading} />
    </Drawer>
  );
};

export default NotificationDrawer;
