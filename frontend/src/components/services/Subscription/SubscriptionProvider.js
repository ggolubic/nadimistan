import React, { createContext, useReducer } from 'react';

import api from 'utils/api';
import {
  toCreateSubscription,
  fromCreateSubscription,
  fromLoadSubscription,
} from 'mappers/subscriptions';

export const SubscriptionContext = createContext({
  subscriptions: null,
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_SUBSCRIPTION':
      return {
        ...state,
        loadingSubscription: true,
      };
    case 'LOAD_SUBSCRIPTION_SUCCESS':
      return {
        ...state,
        loadingSubscription: false,
        subscriptions: action.payload,
      };
    case 'LOAD_SUBSCRIPTION_FAIL':
      return {
        ...state,
        loadingSubscription: false,
        subscriptionError: action.error,
      };
    case 'CREATE_SUBSCRIPTION':
      return {
        ...state,
        loadingSubscription: true,
      };
    case 'CREATE_SUBSCRIPTION_SUCCESS':
      return {
        ...state,
        loadingSubscription: false,
        subscriptions: action.payload,
      };
    case 'CREATE_SUBSCRIPTION_FAIL':
      return {
        ...state,
        loadingSubscription: false,
        subscriptionError: action.error,
      };
    case 'UPDATE_SUBSCRIPTION':
      return {
        ...state,
        loadingSubscription: true,
      };
    case 'UPDATE_SUBSCRIPTION_SUCCESS':
      return {
        ...state,
        loadingSubscription: false,
        subscriptions: action.payload,
      };
    case 'UPDATE_SUBSCRIPTION_FAIL':
      return {
        ...state,
        loadingSubscription: false,
        subscriptionError: action.error,
      };
    case 'DISABLE_SUBSCRIPTION':
      return {
        ...state,
        loadingSubscription: true,
      };
    case 'DISABLE_SUBSCRIPTION_SUCCESS':
      return {
        ...state,
        loadingSubscription: false,
        subscriptions: [],
      };
    case 'DISABLE_SUBSCRIPTION_FAIL':
      return {
        ...state,
        loadingSubscription: false,
        subscriptionError: action.error,
      };
    default:
      return state;
  }
};

const SubscriptionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});

  const loadUserSubscription = async user => {
    dispatch({ type: 'LOAD_SUBSCRIPTION' });
    try {
      const { data } = await api.get(`/users/${user.id}/subscriptions`);
      dispatch({ type: 'LOAD_SUBSCRIPTION_SUCCESS', payload: fromLoadSubscription(data) });
    } catch (err) {
      dispatch({ type: 'LOAD_SUBSCRIPTION_FAIL', error: err });
    }
  };

  const createUserSubscription = async (user, values) => {
    dispatch({ type: 'CREATE_SUBSCRIPTION' });
    try {
      const { data } = await api.post(
        `/users/${user.id}/subscriptions`,
        toCreateSubscription(values),
      );
      dispatch({ type: 'CREATE_SUBSCRIPTION_SUCCESS', payload: [fromCreateSubscription(data)] });
    } catch (err) {
      dispatch({ type: 'CREATE_SUBSCRIPTION_FAIL', error: err });
    }
  };

  const updateUserSubscription = async (user, subId, values) => {
    dispatch({ type: 'UPDATE_SUBSCRIPTION' });
    try {
      const { data } = await api.put(
        `/users/${user.id}/subscriptions/${subId}`,
        toCreateSubscription(values),
      );
      dispatch({ type: 'UPDATE_SUBSCRIPTION_SUCCESS', payload: [fromCreateSubscription(data)] });
    } catch (err) {
      dispatch({ type: 'UPDATE_SUBSCRIPTION_FAIL', error: err });
    }
  };

  const disableUserSubscription = async (user, subId) => {
    dispatch({ type: 'DISABLE_SUBSCRIPTION' });
    try {
      await api.put(`/users/${user.id}/subscriptions/${subId}/disable`);
      dispatch({ type: 'DISABLE_SUBSCRIPTION_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'DISABLE_SUBSCRIPTION_FAIL', error: err });
    }
  };

  const value = {
    ...state,
    loadUserSubscription,
    createUserSubscription,
    disableUserSubscription,
    updateUserSubscription,
  };

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
};

export default SubscriptionProvider;
