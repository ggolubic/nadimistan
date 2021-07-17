import React, { useReducer, useState, createContext } from 'react';
import qs from 'query-string';
import api from 'utils/api';

import { toSearch } from 'mappers/search';

export const SearchContext = createContext({});

const SearchProvider = ({ children }) => {
  const fetchOglasi = async params => {
    try {
      const query = qs.stringify(toSearch(params));
      const { data } = await api.get(`/oglasi?${query}`);
    } catch (err) {
      console.log(err);
    }
  };

  const value = { fetchOglasi };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export default SearchProvider;
