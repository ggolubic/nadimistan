import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import 'antd/dist/antd.dark.css';
import 'antd/dist/antd.css';
import Auth from 'components/scenes/Auth';
import Landing from 'components/scenes/Landing';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/login" render={props => <Auth {...props} />} />
    </Switch>
  </Router>
);

export default App;
