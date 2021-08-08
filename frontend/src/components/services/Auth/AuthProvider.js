import React, { useReducer, createContext } from 'react';

import { fromLogin, toRegistration } from 'mappers/auth';
import api, { setAuthToken, removeAuthToken } from 'utils/api';
import { removeCookie, setCookie } from 'utils/cookie';

export const AuthContext = createContext({});

const reducer = (state, action) => {
  switch (action.type) {
    case 'REGISTRATION':
      return {
        ...state,
        registeringUser: true,
        registrationError: false,
      };
    case 'REGISTRATION_SUCCESS':
      return {
        ...state,
        user: action.payload,
        registrationError: false,
        registeringUser: false,
      };
    case 'REGISTRATION_FAIL':
      return {
        ...state,
        registrationError: action.error,
        registeringUser: false,
      };
    case 'ACTIVATION':
      return {
        ...state,
        activatingUser: true,
        activationError: false,
      };
    case 'ACTIVATION_SUCCESS':
      return {
        ...state,
        activationError: false,
        activatingUser: false,
      };
    case 'ACTIVATION_FAIL':
      return {
        ...state,
        activationError: action.error,
        activatingUser: false,
      };
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
    case 'LOGOUT':
      return {
        ...state,
      };
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        user: null,
      };
    case 'LOGOUT_FAIL':
      return {
        ...state,
        logoutError: action.error,
      };
    case 'REQUEST_RESET_PASSWORD':
      return {
        ...state,
        requestingResetPassword: true,
      };
    case 'REQUEST_RESET_PASSWORD_SUCCESS':
      return {
        ...state,
        requestingResetPassword: false,
        passwordResetRequested: true,
      };
    case 'REQUEST_RESET_PASSWORD_FAIL':
      return {
        ...state,
        requestingResetPassword: false,
        requestingResetPasswordError: action.error,
      };
    case 'RESET_PASSWORD':
      return {
        ...state,
        resettingPassword: true,
      };
    case 'RESET_PASSWORD_SUCCESS':
      return {
        ...state,
        resettingPassword: false,
      };
    case 'RESET_PASSWORD_FAIL':
      return {
        ...state,
        resettingPassword: false,
        resetPasswordError: action.error,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});

  const register = async user => {
    dispatch({ type: 'REGISTRATION' });
    try {
      const data = toRegistration(user);

      await api.post('http://0.0.0.0:8000/registration', data);

      dispatch({ type: 'REGISTRATION_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'REGISTRATION_FAIL', error: err.response.data });
    }
  };

  const activate = async token => {
    dispatch({ type: 'ACTIVATION' });
    try {
      await api.post(`http://0.0.0.0:8000/activate?token=${token}`);

      dispatch({ type: 'ACTIVATION_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'ACTIVATION_FAIL', error: err.response.data });
    }
  };

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
      dispatch({ type: 'LOGIN_FAIL', error: err.response.data });
    }
  };

  const getSession = async () => {
    dispatch({ type: 'LOGIN' });
    try {
      const res = await api.get('http://0.0.0.0:8000/session');
      dispatch({ type: 'LOGIN_SUCCESS', payload: fromLogin(res.data) });
    } catch (err) {
      dispatch({ type: 'LOGIN_FAIL' });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    try {
      removeAuthToken();
      removeCookie('ath');
      dispatch({ type: 'LOGOUT_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'LOGOUT_FAIL', error: err.response.data });
    }
  };

  const requestResetPassword = async email => {
    dispatch({ type: 'REQUEST_RESET_PASSWORD' });
    try {
      await api.post('http://0.0.0.0:8000/reset-password', { email });
      dispatch({ type: 'REQUEST_RESET_PASSWORD_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'REQUEST_RESET_PASSWORD_FAIL', error: err.response.data });
      throw err;
    }
  };

  const resetPassword = async (token, password) => {
    dispatch({ type: 'RESET_PASSWORD' });
    try {
      await api.put(`http://0.0.0.0:8000/reset-password?token=${token}`, { password });
      dispatch({ type: 'RESET_PASSWORD_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'RESET_PASSWORD_FAIL', error: err.response.data });
      throw err;
    }
  };

  const value = {
    ...state,
    register,
    activate,
    login,
    getSession,
    logout,
    requestResetPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
