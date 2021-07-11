import React from 'react';
import Paragraph from 'antd/lib/typography/Paragraph';

import { PageWrapper, NavBar, HeroWrapper, Hero, Overlay, Banner, Brief } from './index.styled';
import { Title } from 'components/common/Typography';
import Login from 'components/scenes/Auth/scenes/Login';

const Landing = () => {
  return (
    <PageWrapper>
      <NavBar>
        <Title fontSize={36} primaryColor>
          NadiMiStan
        </Title>
      </NavBar>
      <HeroWrapper>
        <Overlay />
        <Hero>
          <Banner>
            <Login />
          </Banner>
        </Hero>
      </HeroWrapper>
      <Brief>
        <Title level={2} primaryColor>
          Dosta Vam je svakodnevnog scrollanja po raznim oglasnicima u potrazi za stanom?
        </Title>
        <Paragraph>
          <span>NadiMiStan</span> Vam omogucava da na jednom mjestu pronadete sve sto Vam treba te
          ukljucuje besplatnu pretplatu na kojoj postavite kriterije a mi Vas obavijestimo kada se
          takav stan pojavi na oglasniku.
        </Paragraph>
      </Brief>
    </PageWrapper>
  );
};

export default Landing;
