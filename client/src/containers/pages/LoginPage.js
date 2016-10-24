
/**
 * Created by uzysjung on 2016. 10. 21..
 */
import React, { PropTypes,Component } from 'react';
import Box from '../../components/widget/Box'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { routerActions } from 'react-router-redux'
import { signinUser , failedUserData } from '../../actions/user'

import { Grid , Panel, Jumbotron, Form , FormGroup, Col, Button, FormControl, Checkbox, ControlLabel , PageHeader, Alert } from 'react-bootstrap'
import Radium from 'radium'
import Pkg from '../../../../package.json'

const styleLogin = {

    panel : {
        maxWidth : 600,
        position : 'absolute',
        top : '50%',
        left : '50%',
        transform : 'translate(-50%,-50%)'
    },
    header : {
        maxHeight : 40,
        bottomMargin : 100,
        borderBottom : '1px solid #bababa'

    }
};

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : ''
        }
    }

    componentWillMount() {
        const { authenticated, replace, redirect } = this.props;
        if (authenticated) {
            replace(redirect)
        }
    }
    componentDidMount() {
    }

    componentWillUnmount() {
        this.props.failedUserData(null);
    }

    componentWillReceiveProps(nextProps) {
        // console.log('nextProps',nextProps);
        const { authenticated, replace, redirect } = nextProps;
        const { authenticated: wasAuthenticated } = this.props;

        if (!wasAuthenticated && authenticated) {
            replace(redirect)
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;

        if ( !email || email.length < 1) {
            this.props.failedUserData('Insert Email address');
            return;
        }

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            this.props.failedUserData('Please check whether this email is valid');
            return
        }
        if (!password) {
            this.props.failedUserData('Insert Password');
            return;
        }
        if ( password && password.length < 8 ) {
            this.props.failedUserData('Password must be longer than 8 charaters');
            return;
        }


        this.props.signinUser({ email, password });

    };
    handleForChange = (e) => {
        console.log('e.target.id',e.target.id);
        switch(e.target.id) {
            case 'formHorizontalEmail' :
                this.setState( { email : e.target.value } );
                break;
            case 'formHorizontalPassword' :
                this.setState( { password : e.target.value } );
                break;
        }
    };

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <Alert bsStyle="danger">
                    {this.props.errorMessage}
                </Alert>
            )
        }
        return null;
    }
    render() {
        return (
                <div style={styleLogin.panel}>
                    <PageHeader style={styleLogin.header}>UzysReactBoilerplate <small>{Pkg.version}</small></PageHeader>
                    <Box
                        title="Login"
                        status="info"
                        solid
                        >


                        <Form onSubmit={this.handleFormSubmit} horizontal>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Email
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="email" placeholder="Email" value={this.state.email} onChange={this.handleForChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Password
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="password" placeholder="Password"  value={this.state.password} onChange={this.handleForChange}  />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Checkbox>Remember me</Checkbox>
                                </Col>
                            </FormGroup>
                            {this.renderAlert()}
                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button type="submit">
                                        Sign in
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                        <div style={{marginLeft : 10 , marginTop : 20}}><Link to={`/signUp`}>Register a new membership</Link> </div>
                    </Box>



                </div>
        );
    }

}

LoginPage.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    replace: PropTypes.func.isRequired,
    errorMessage : PropTypes.string
};


function mapStateToProps(state, ownProps) {

    const redirect = ownProps.location.query.redirect || '/';
    return {
        authenticated : state.auth.authenticated,
        redirect : redirect,
        errorMessage: state.auth.error
    };

}

export default connect(mapStateToProps, { replace: routerActions.replace , signinUser , failedUserData } )(Radium(LoginPage));


