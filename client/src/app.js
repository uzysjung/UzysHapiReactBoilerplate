/**
 * Created by uzysjung on 16. 7. 9..
 */

import React ,{ Component, PropTypes }from 'react'
import { Route, Router, IndexRoute } from 'react-router'
import { routerActions } from 'react-router-redux'
import { Provider } from 'react-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { store , history } from './store'

import 'font-awesome-webpack2'
// import '../../node_modules/bootstrap/dist/js/bootstrap'
import NotFoundPage from './containers/pages/NotFoundPage'
import Layout from './components/layout/Layout'
import HomePage from './containers/pages/HomePage'


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
    failureRedirectPath: '/login',
    wrapperDisplayName: 'UserIsAdmin',
    predicate: auth => auth.isAdmin,
    allowRedirectBack: false
});

if(localStorage.getItem('token')) {
    store.dispatch(authUser());
}

export default function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Route path='/' component={Layout}>
                    <IndexRoute component={HomePage} />
                    {/*<IndexRoute component={UserIsAuthenticated(HomePage)} />*/}
                    {/*<Route path='examples/blank-page' component={BlankPage} />*/}
                    {/*<Route path='profile' component={UserIsAuthenticated(ProfilePage)} />*/}
                </Route>
                {/*<Route path='/login' component={HomePage} />*/}
                {/*<Route path='/register' component={RegisterPage} />*/}
                <Route path='*' component={NotFoundPage} />
            </Router>
        </Provider>
    );
}
const propTypes = {
    store: PropTypes.object,
    history : PropTypes.object,
    // Layout : PropTypes.component
};
App.propTypes = propTypes;

