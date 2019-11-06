import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Reader from '../Reader/Reader';

const App = () => (
  <div className="App">
    <Switch>
      <Route path="/reader" component={Reader} />
      <Redirect to="/reader" />
    </Switch>
  </div>
);

export default App;
