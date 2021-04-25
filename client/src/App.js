import React from 'react';

import { Header } from './components';
import {Home, Cart, SignUp, SignIn} from './pages';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route path="/" component={Home} exact />
        <Route path="/cart" component={Cart} exact />
        <Route path="/signup" component={SignUp} exact />
        <Route path="/signin" component={SignIn} exact />
      </div>
    </div>
  );
}

export default App;
