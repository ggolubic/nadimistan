import React, { useReducer, createContext } from 'react';

export const SearchCtx = createContext({});

const reducer = (action, state) => {
  switch (action.type) {
    case 'placeholder':
      return {};
    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});

  const loadOglase = () => {};

  const value = { ...state, loadOglase };

  return <SearchCtx.Provider value={value}>{children}</SearchCtx.Provider>;
};

export default SearchProvider;
