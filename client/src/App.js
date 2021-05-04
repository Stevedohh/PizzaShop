import React from 'react';

import {Header} from './components';
import {AdminPage, CartPage, HomePage, OrderPage, ProfilePage, SignInPage, SignUpPage} from './pages';
import {Route} from 'react-router-dom';

function App() {
    return (
        <div className="wrapper">
            <Header/>
            <Route exact path="/" component={HomePage}/>
            <Route path="/cart" component={CartPage}/>
            <Route path="/signup" component={SignUpPage}/>
            <Route path="/signin" component={SignInPage}/>
            <Route path="/admin" component={AdminPage}/>
            <Route path="/profile" component={ProfilePage}/>
            <Route path="/order" component={OrderPage}/>
        </div>
    );
}

export default App;
