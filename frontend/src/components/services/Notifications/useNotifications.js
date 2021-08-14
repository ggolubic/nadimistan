import { useContext, useEffect } from 'react';

import { NotificationContext } from './NotificationProvider';

const useNotifications = () => {
  const {
    notifications,
    loadingNotifications,
    notificationError,
    loadUserNotifications,
    updateUserNotification,
  } = useContext(NotificationContext);

  useEffect(() => {
    if (!notifications) {
      loadUserNotifications();
    }
  }, []);

  return notifications
    ? {
        data: notifications,
        loading: loadingNotifications,
        error: notificationError,
        updateUserNotification,
      }
    : {
        loading: true,
        error: notificationError,
        data: [],
        updateUserNotification,
      };
};

export default useNotifications;
