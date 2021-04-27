import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import store from './redux/store';

import './scss/app.scss';
import App from './App';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ReactNotification />
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
);
