import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import 'antd/dist/antd.dark.css';
import 'antd/dist/antd.css';
import Auth from 'components/scenes/Auth';
import Search from 'components/scenes/Search';
import Profile from 'components/scenes/Profile';
import AuthProvider from 'components/services/Auth/AuthProvider';
import useCurrentUser from 'components/services/Auth/useCurrentUser';
import SearchProvider from './components/services/Search/SearchProvider';
import SubscriptionProvider from 'components/services/Subscription/SubscriptionProvider';
import NotificationProvider from 'components/services/Notifications/NotificationProvider';
import { ROUTE_CONFIG } from 'consts/routes';

const ProtectedRoute = props => {
  const { user } = useCurrentUser();

  if (user) {
    return <Route {...props} />;
  }

  return <Route path={props.path} render={() => <Redirect to="/" />} />;
};

const App = () => (
  <AuthProvider>
    <SubscriptionProvider>
      <NotificationProvider>
        <SearchProvider>
          <Router>
            <Suspense fallback={<div />}>
              <Switch>
                <Route
                  path={[
                    ROUTE_CONFIG.AUTH.LOGIN,
                    ROUTE_CONFIG.AUTH.ACTIVATE,
                    ROUTE_CONFIG.AUTH.REGISTER,
                    ROUTE_CONFIG.AUTH.RESET_PASSWORD,
                  ]}
                  exact
                  component={Auth}
                />
                <ProtectedRoute path={ROUTE_CONFIG.SEARCH} component={Search} />
                <ProtectedRoute path={ROUTE_CONFIG.PROFILE} component={Profile} />
                <Route render={() => <Redirect to={ROUTE_CONFIG.AUTH.LOGIN} />} />
              </Switch>
            </Suspense>
          </Router>
        </SearchProvider>
      </NotificationProvider>
    </SubscriptionProvider>
  </AuthProvider>
);

export default App;
