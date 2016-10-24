/**
 * Created by uzysjung on 16. 7. 9..
 */

import React ,{ Component, PropTypes }from 'react'
import { Route, Router, IndexRoute } from 'react-router'
import { routerActions } from 'react-router-redux'
import { Provider } from 'react-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { store , history } from './store'
import localStore from '../../node_modules/store/store.js'
import 'font-awesome-webpack2'
// import '../../node_modules/bootstrap/dist/js/bootstrap'
import NotFoundPage from './containers/pages/NotFoundPage'
import Layout from './containers/layout'
import HomePage from './containers/pages/HomePage'
import GithubPage from './containers/pages/GithubPage'
import LoginPage from './containers/pages/LoginPage'
import SignupPage from './containers/pages/SignupPage.js'
import SamplePage from './containers/pages/SamplePage.js'
import { authUser } from './actions/user.js';

const UserIsAuthenticated = UserAuthWrapper({
    authSelector: state => state.auth,
    redirectAction: routerActions.replace,
    failureRedirectPath: '/login',
    predicate: auth => auth.authenticated,
    wrapperDisplayName: 'UserIsAuthenticated',
    allowRedirectBack: false
});
const UserIsAdmin = UserAuthWrapper({
    authSelector: state => state.auth,
    redirectAction: routerActions.replace,
    failureRedirectPath: '/',
    wrapperDisplayName: 'UserIsAdmin',
    predicate: auth => auth.isAdmin,
    allowRedirectBack: false
});

if(localStore.get('token')) {
    store.dispatch(authUser());
}

export default function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Route path='/' component={Layout}>
                    <IndexRoute component={HomePage} />
                    <Route path='/github' component={UserIsAuthenticated(GithubPage)} />
                    <Route path='/sample/:id' component={UserIsAuthenticated(SamplePage)} />

                </Route>
                <Route path='/login' component={LoginPage} />
                <Route path='/signup' component={SignupPage} />
                <Route path='*' component={NotFoundPage} />
            </Router>
        </Provider>
    );
}
const propTypes = {
    store: PropTypes.object,
    history : PropTypes.object,
    // layout : PropTypes.component
};
App.propTypes = propTypes;

