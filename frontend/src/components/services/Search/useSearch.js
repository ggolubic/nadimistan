import { useContext } from 'react';

import { SearchContext } from './SearchProvider';

const useSearch = () => {
  const searchCtx = useContext(SearchContext);

  return searchCtx;
};

export default useSearch;
