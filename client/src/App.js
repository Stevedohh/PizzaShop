import React from 'react';

import {Header} from './components';
import {Home, Cart, SignUp, SignIn} from './pages';
import {Route} from 'react-router-dom';
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";

function App() {
    return (
        <div className="wrapper">
            <Header/>
            <Route exact path="/" component={Home}/>
            <Route path="/cart" component={Cart}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/signin" component={SignIn}/>
            <Route path="/admin" component={Admin}/>
            <Route path="/profile" component={Profile}/>
        </div>
    );
}

export default App;
