import React, { useEffect, useLayoutEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Paragraph from 'antd/lib/typography/Paragraph';

import { Title } from 'components/common/Typography';
import Hero from 'components/common/Hero';
import Login from 'components/scenes/Auth/scenes/Login';
import { AuthContext } from 'components/services/Auth/AuthProvider';
import { getCookie } from 'utils/cookie';
import { setAuthToken } from 'utils/api';

import { PageWrapper, NavBar, Banner, Brief } from './index.styled';

const Landing = ({ location }) => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  useLayoutEffect(() => {
    const token = getCookie('ath');

    if (token) {
      setAuthToken(token);
    }
  }, []);

  useEffect(() => {
    if (!authCtx.user) {
      return;
    }

    const { from } = location.state || {
      from: { pathname: '/' },
    };

    if (from.pathname === '/') {
      history.push(`/search`);
      return;
    }

    if (!authCtx.loggingIn && !authCtx.loginError && authCtx.user) {
      history.push(from.pathname);
    }
  }, [authCtx.loggingIn]);

  return (
    <PageWrapper>
      <NavBar>
        <Title fontSize={36} primaryColor>
          NadiMiStan
        </Title>
      </NavBar>
      <Hero>
        <Banner>
          <Login />
        </Banner>
      </Hero>
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
