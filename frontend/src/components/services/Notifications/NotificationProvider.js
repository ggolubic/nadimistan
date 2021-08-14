import React, { createContext, useReducer, useRef } from 'react';

import api from 'utils/api';
import { fromLoadNotifications } from 'mappers/notifications';

export const NotificationContext = createContext({
  notifications: null,
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_NOTIFICATIONS':
      return {
        ...state,
        loadingNotifications: true,
      };
    case 'LOAD_NOTIFICATIONS_SUCCESS':
      return {
        ...state,
        loadingNotifications: false,
        notifications: action.payload,
      };
    case 'LOAD_NOTIFICATIONS_FAIL':
      return {
        ...state,
        loadingNotifications: false,
        notificationError: action.error,
      };
    case 'UPDATE_NOTIFICATION':
      return {
        ...state,
        updatingNotification: true,
      };
    case 'UPDATE_NOTIFICATION_SUCCESS':
      const updatedNotifications = [...state.notifications];
      updatedNotifications[action.payload.index].isRead = true;
      return {
        ...state,
        updatingNotification: false,
        notifications: updatedNotifications,
      };
    case 'UPDATE_NOTIFICATION_FAIL':
      return {
        ...state,
        updatingNotification: false,
        notificationError: action.error,
      };
    default:
      return state;
  }
};

const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});
  const loadingNotifications = useRef();

  const loadUserNotifications = async () => {
    if (loadingNotifications.current) {
      return;
    }
    dispatch({ type: 'LOAD_NOTIFICATIONS' });
    loadingNotifications.current = true;
    try {
      const { data } = await api.get(`/notifications/`);
      dispatch({ type: 'LOAD_NOTIFICATIONS_SUCCESS', payload: fromLoadNotifications(data) });
      loadingNotifications.current = false;
    } catch (err) {
      dispatch({ type: 'LOAD_NOTIFICATIONS_FAIL', error: err });
      loadingNotifications.current = false;
    }
  };

  const updateUserNotification = async (id, index) => {
    dispatch({ type: 'UPDATE_NOTIFICATION' });
    try {
      await api.put(`/notifications/${id}`);
      dispatch({ type: 'UPDATE_NOTIFICATION_SUCCESS', payload: { index } });
    } catch (err) {
      dispatch({ type: 'UPDATE_NOTIFICATION_FAIL', error: err });
    }
  };

  const value = {
    ...state,
    loadUserNotifications,
    updateUserNotification,
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export default NotificationProvider;
