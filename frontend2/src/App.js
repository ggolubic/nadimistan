import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.css';

import Auth from 'components/scenes/Auth';

const App = () => (
  <Router>
    <Switch>
      <Route path="/login" render={props => <Auth {...props} />} />
    </Switch>
  </Router>
);

export default App;
