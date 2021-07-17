import React, { useReducer, createContext } from 'react';
import qs from 'query-string';
import api from 'utils/api';

import { toSearch, fromSearch } from 'mappers/search';

export const SearchContext = createContext({});

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_OGLASI':
      return {
        ...state,
        loadingOglasi: true,
      };
    case 'LOAD_OGLASI_SUCCESS':
      return {
        ...state,
        loadingOglasi: false,
        data: action.payload,
      };
    case 'LOAD_OGLASI_FAIL':
      return {
        ...state,
        loadingOglasi: false,
        error: action.error,
      };
    default:
      return state;
  }
};
const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});

  const loadOglasi = async params => {
    try {
      dispatch({ type: 'LOAD_OGLASI' });
      const query = qs.stringify(toSearch(params));
      const { data } = await api.get(`/oglasi?${query}`);
      dispatch({ type: 'LOAD_OGLASI_SUCCESS', payload: fromSearch(data) });
    } catch (err) {
      dispatch({ type: 'LOAD_OGLASI_FAIL', error: err });
    }
  };

  const value = { ...state, loadOglasi };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export default SearchProvider;
