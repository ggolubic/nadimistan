import React, { useState } from 'react';

import { Title } from 'components/common/Typography';
import useSearch from 'components/services/Search/useSearch';
import Hero from 'components/common/Hero';
import Button from 'components/common/Button';

import PriceFilter from 'components/common/Filters/Price';
import SizeFilter from 'components/common/Filters/Size';
import Header from 'components/common/Header';

import {
  PageWrapper,
  HeroContent,
  FormBackground,
  FiltersWrapper,
  SearchInputsWrapper,
} from './index.styled';
import FormInput from './components/FormInput';
import SearchResults from './components/SearchResults';

const Search = () => {
  const { loadOglasi, loadingOglasi } = useSearch();
  const [form, setForm] = useState({});
  // const notifications=useUnreadNotifications(user.id)

  return (
    <PageWrapper>
      <Header />
      <Hero>
        <HeroContent>
          <Title customColor="#fff">Pronađite budući smještaj već danas</Title>
          <FormBackground>
            <FiltersWrapper>
              <PriceFilter value={form.price} onChange={val => setForm({ ...form, price: val })} />
              <SizeFilter
                value={form.size}
                onChange={(val, isGreater) =>
                  setForm({ ...form, size: val, sizeGreater: isGreater })
                }
              />
            </FiltersWrapper>
            <SearchInputsWrapper>
              <FormInput prefix="Županija:" onChange={val => setForm({ ...form, zupanija: val })} />
              <FormInput prefix="Grad:" onChange={val => setForm({ ...form, grad: val })} />
            </SearchInputsWrapper>
            <Button
              type="primary"
              size="large"
              loading={loadingOglasi}
              onClick={() => loadOglasi(form)}
            >
              Pronađi
            </Button>
          </FormBackground>
        </HeroContent>
      </Hero>
      <SearchResults />
    </PageWrapper>
  );
};

export default Search;
