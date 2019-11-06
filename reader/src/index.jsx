import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import './index.css';
import App from './Components/App/App';

ReactDOM.render(
  <HashRouter basename="/">
    <Route component={App} />
  </HashRouter>,
  document.getElementById('root'),
);
