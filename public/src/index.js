import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { Route } from 'react-router'
import reduxThunk from 'redux-thunk';

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'


import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';

import reducers from './reducers';
import history from './history';
import { AUTH_USER } from './actions/types';
import registerServiceWorker from './registerServiceWorker';

const middleware = routerMiddleware(history);
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware, reduxThunk)
);

const token = localStorage.getItem('token');
const username = localStorage.getItem('username');
if (token && username) {
  store.dispatch({
    type: AUTH_USER,
    payload: {
      username: username
    }
  });
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App>
          <Route exact path="/" component={Welcome}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/signout" component={Signout}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/feature" component={RequireAuth(Feature)}/>
        </App>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();