import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import 'antd/dist/antd.dark.css';
import 'antd/dist/antd.css';
import Auth from 'components/scenes/Auth';
import Home from 'components/scenes/Home';

const App = () => (
  <Router>
    <Switch>
      <Route path="/login" render={props => <Auth {...props} />} />
      <Route path="/" exact render={props => <Home {...props} />} />
    </Switch>
  </Router>
);

export default App;
