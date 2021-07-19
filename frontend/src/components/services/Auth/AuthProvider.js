import React, { useReducer, createContext } from 'react';

import { fromLogin } from 'mappers/auth';
import api, { setAuthToken } from 'utils/api';
import { removeCookie, setCookie } from 'utils/cookie';

export const AuthContext = createContext({});

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loggingIn: true,
        loginError: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        loginError: false,
        loggingIn: false,
      };
    case 'LOGIN_FAIL':
      return {
        ...state,
        loginError: action.error,
        loggingIn: false,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});

  const login = async (email, password) => {
    dispatch({ type: 'LOGIN' });
    try {
      //TODO: look into why BE accepts formdata instead of json
      const form = new FormData();
      form.append('username', email);
      form.append('password', password);
      const res = await api.post('http://0.0.0.0:8000/login', form, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      });
      setAuthToken(res.data.access_token);
      setCookie('ath', res.data.access_token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: fromLogin(res.data) });
    } catch (err) {
      removeCookie('ath');
      dispatch({ type: 'LOGIN_FAIL', error: err });
    }
  };

  const getSession = async () => {
    dispatch({ type: 'LOGIN' });
    try {
      const res = await api.get('http://0.0.0.0:8000/session');
      dispatch({ type: 'LOGIN_SUCCESS', payload: fromLogin(res.data) });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAIL', error });
    }
  };

  const value = { ...state, login, getSession };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
