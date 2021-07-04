import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthContainer, BackgroundContainer, RouteContainer, RouteWrapper } from './Auth.styled';

import Login from './scenes/Login';

const Content = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      {/* <Route path='/register' component={Register} />
      <Route path='/activate' component={Landing} />
      <Route path='/reset-password' component={ResetPassword} /> */}
    </Switch>
  );
};

const Auth = () => {
  return (
    <AuthContainer>
      <BackgroundContainer></BackgroundContainer>
      <RouteContainer>
        <RouteWrapper>
          <Content />
        </RouteWrapper>
      </RouteContainer>
    </AuthContainer>
  );
};

export default Auth;
