import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducers from './reducers';
import Register from './components/Register';
import Login from './components/Login';
import Users from './components/Users';

const store = createStore(rootReducers);
store.subscribe(() => console.log("store updated", store.getState()));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/users' component={Users} />
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));