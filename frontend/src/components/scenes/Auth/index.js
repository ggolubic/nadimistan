import React, { useEffect, useLayoutEffect, useContext } from 'react';
import { useHistory, Switch, Route } from 'react-router-dom';
import Paragraph from 'antd/lib/typography/Paragraph';

import { Title } from 'components/common/Typography';
import Hero from 'components/common/Hero';
import { AuthContext } from 'components/services/Auth/AuthProvider';
import { getCookie } from 'utils/cookie';
import { setAuthToken } from 'utils/api';
import { ROUTE_CONFIG } from 'consts/routes';

import { PageWrapper, NavBar, Banner, Brief } from './index.styled';
import { Login, Register, Activation, ResetPassword } from './scenes';

const Content = () => {
  return (
    <Switch>
      <Route exact path={ROUTE_CONFIG.AUTH.LOGIN} component={Login} />
      <Route path={ROUTE_CONFIG.AUTH.REGISTER} component={Register} />
      <Route path={ROUTE_CONFIG.AUTH.ACTIVATE} component={Activation} />
      <Route path={ROUTE_CONFIG.AUTH.RESET_PASSWORD} component={ResetPassword} />
    </Switch>
  );
};

const Landing = props => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  useLayoutEffect(() => {
    const token = getCookie('ath');

    if (token) {
      setAuthToken(token);
      authCtx.getSession();
    }
  }, []);

  useEffect(() => {
    if (!authCtx.user) {
      return;
    }

    const { from } = props.location.state || {
      from: { pathname: props.history.location.pathname || '/' },
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
          NađiMiStan
        </Title>
      </NavBar>
      <Hero>
        <Banner>
          <Content />
        </Banner>
      </Hero>
      <Brief>
        <Title level={2} primaryColor>
          Dosta Vam je svakodnevnog scrollanja po raznim oglasnicima u potrazi za stanom?
        </Title>
        <Paragraph>
          <span>NađiMiStan</span> Vam omogućava da na jednom mjestu pronađete sve što Vam treba te
          uključuje besplatnu pretplatu na kojoj postavite kriterije a mi Vas obavijestimo kada se
          takav stan pojavi na oglasniku.
        </Paragraph>
      </Brief>
    </PageWrapper>
  );
};

export default Landing;
