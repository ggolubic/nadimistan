import { useContext } from 'react';
import { SearchCtx } from './';

const useSearch = () => {
  const ctx = useContext(SearchCtx);

  return ctx;
};

export default useSearch;
