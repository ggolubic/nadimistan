import React, { useReducer, createContext } from 'react';

export const AuthContext = createContext({});

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userLoggingIn: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        userLoggingIn: false,
      };
    case 'LOGIN_FAIL':
      return {
        ...state,
        errorLoggingIn: action.error,
        userLoggingIn: false,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});

  const value = { state };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
