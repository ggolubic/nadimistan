import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import 'antd/dist/antd.dark.css';
import 'antd/dist/antd.css';
import Landing from 'components/scenes/Landing';
import Search from 'components/scenes/Search';
import AuthProvider from 'components/services/Auth/AuthProvider';
import useCurrentUser from 'components/services/Auth/useCurrentUser';

const ProtectedRoute = props => {
  const { user } = useCurrentUser();

  if (user) {
    return <Route path={props.path} render={() => <Redirect to="/" />} />;
  }

  return <Route {...props} />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <Switch>
        <Route path="/" exact component={Landing} />
        <ProtectedRoute path="/search" component={Search} />
      </Switch>
    </Router>
  </AuthProvider>
);

export default App;
