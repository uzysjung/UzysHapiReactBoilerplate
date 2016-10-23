
/**
 * Created by uzysjung on 2016. 10. 21..
 */
import React, { PropTypes,Component } from 'react';
import Box from '../../components/widget/Box'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { routerActions } from 'react-router-redux'

import { Grid , Panel, Jumbotron, Form , FormGroup, Col, Button, FormControl, Checkbox, ControlLabel , PageHeader} from 'react-bootstrap'
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
    }

    componentWillMount() {
        const { authenticated, replace, redirect } = this.props;
        if (authenticated) {
            replace(redirect)
        }
    }
    componentDidMount() {
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


                        <Form horizontal>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Email
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="email" placeholder="Email" />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Password
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="password" placeholder="Password" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Checkbox>Remember me</Checkbox>
                                </Col>
                            </FormGroup>

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
    errorMessage : PropTypes.object
};


function mapStateToProps(state, ownProps) {

    const redirect = ownProps.location.query.redirect || '/';
    return {
        authenticated : state.auth.authenticated,
        redirect : redirect,
        errorMessage: state.auth.error
    };

}

export default connect(mapStateToProps, { replace: routerActions.replace } )(Radium(LoginPage));


