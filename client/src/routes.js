/**
 * Created by uzysjung on 2016. 10. 31..
 */

import React from 'react'
import { Route, Router, IndexRoute  } from 'react-router'
import { routerActions } from 'react-router-redux'

import { UserAuthWrapper } from 'redux-auth-wrapper'

import NotFoundPage from './containers/pages/NotFoundPage'
import Layout from './containers/layout'
import HomePage from './containers/pages/HomePage'
import GithubPage from './containers/pages/GithubPage'
import LoginPage from './containers/pages/LoginPage'
import SignupPage from './containers/pages/SignupPage.js'
import SamplePage from './containers/pages/SamplePage.js'


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


export default function (props = {}) {
    let history = props.history;

    return (
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
    )
}