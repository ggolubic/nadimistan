import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import 'antd/dist/antd.dark.css';
import 'antd/dist/antd.css';
import Landing from 'components/scenes/Landing';
import Search from 'components/scenes/Search';
import AuthProvider from 'components/services/Auth/AuthProvider';
import useCurrentUser from 'components/services/Auth/useCurrentUser';
import SearchProvider from './components/services/Search/SearchProvider';

const ProtectedRoute = props => {
  const { user } = useCurrentUser();

  if (user) {
    return <Route {...props} />;
  }

  return <Route path={props.path} render={() => <Redirect to="/" />} />;
};

const App = () => (
  <AuthProvider>
    <SearchProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          <ProtectedRoute path="/search" component={Search} />
        </Switch>
      </Router>
    </SearchProvider>
  </AuthProvider>
);

export default App;
