import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import 'antd/dist/antd.dark.css';
import 'antd/dist/antd.css';
import Landing from 'components/scenes/Landing';
import Search from 'components/scenes/Search';
import Profile from 'components/scenes/Profile';
import AuthProvider from 'components/services/Auth/AuthProvider';
import useCurrentUser from 'components/services/Auth/useCurrentUser';
import SearchProvider from './components/services/Search/SearchProvider';
import SubscriptionProvider from 'components/services/Subscription/SubscriptionProvider';

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
      <SearchProvider>
        <Router>
          <Suspense fallback={<div />}>
            <Switch>
              <Route path="/" exact component={Landing} />
              <ProtectedRoute path="/search" component={Search} />
              <ProtectedRoute path="/profile" component={Profile} />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </Suspense>
        </Router>
      </SearchProvider>
    </SubscriptionProvider>
  </AuthProvider>
);

export default App;
