import { useContext, useEffect } from 'react';

import { SubscriptionContext } from './SubscriptionProvider';

const useSubscription = user => {
  const {
    subscriptions,
    loadingSubscription,
    loadUserSubscription,
    createUserSubscription,
    disableUserSubscription,
    updateUserSubscription,
  } = useContext(SubscriptionContext);

  useEffect(() => {
    if (!subscriptions) {
      loadUserSubscription(user);
    }
  }, [user]);

  return subscriptions
    ? {
        data: subscriptions,
        loading: loadingSubscription,
        createUserSubscription,
        disableUserSubscription,
        updateUserSubscription,
      }
    : {
        loading: true,
        data: [],
        createUserSubscription,
        disableUserSubscription,
        updateUserSubscription,
      };
};

export default useSubscription;
