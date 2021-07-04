import React from 'react';
import Input from 'antd/lib/input';
import AutoComplete from 'antd/lib/auto-complete';
import Button from 'components/common/Button';

import { SearchWrapper } from './index.styled';
import useSearch from 'components/services/search/useSearch';

const Search = () => {
  const ctx = useSearch();
  return (
    <SearchWrapper>
      <AutoComplete options={[]}>
        <Input prefix="Zupanija" placeholder="Unesite ime zupanije" size="large" />
      </AutoComplete>
      <AutoComplete options={[]}>
        <Input prefix="Grad" placeholder="Unesite ime grada" size="large" />
      </AutoComplete>
      <AutoComplete options={[]}>
        <Input prefix="Naselje" placeholder="Unesite ime naselja" size="large" />
      </AutoComplete>
      <Button type="primary" size="large">
        Search
      </Button>
    </SearchWrapper>
  );
};

export default Search;
