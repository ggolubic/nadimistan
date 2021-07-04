import React from 'react';
import Text from 'antd/lib/typography/Text';
import SmileTwoTone from '@ant-design/icons/SmileTwoTone';

import PageContainer from 'components/common/PageContainer';
import SearchProvider from 'components/services/search';

import { Navbar, IconWrapper } from './index.styled';
import Search from './scenes/Search';

const Home = () => (
  <PageContainer>
    <Navbar>
      <Text>Logo</Text>
      <IconWrapper>
        <SmileTwoTone style={{ fontSize: '50px' }} />
        Ja sam korisnik
      </IconWrapper>
    </Navbar>
    <SearchProvider>
      <Search />
    </SearchProvider>
  </PageContainer>
);
export default Home;
