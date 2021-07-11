import { useContext } from 'react';

import { AuthContext } from './AuthProvider';

const useCurrentUser = () => {
  const authCtx = useContext(AuthContext);

  return { user: authCtx.user } || { user: null };
};

export default useCurrentUser;
