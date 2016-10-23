/**
 * Created by uzysjung on 2016. 10. 21..
 */
/**
 * Created by uzysjung on 2016. 10. 21..
 */
/**
 * Created by uzysjung on 2016. 10. 21..
 */
import React, { PropTypes,Component } from 'react';
import Box from '../../components/widget/Box'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Grid , Panel, Jumbotron, Form , FormGroup, Col, Button, FormControl, Checkbox, ControlLabel , PageHeader} from 'react-bootstrap'
import Radium from 'radium'
import Pkg from '../../../../package.json'

const style = {

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

class SignupPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }
    componentDidMount() {
    }
    render() {
        return (
            <div style={style.panel}>
                <PageHeader style={style.header}>UzysReactBoilerplate <small>{Pkg.version}</small></PageHeader>
                <Box
                    title="Signup"
                    status="success"
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

                        <FormGroup controlId="formHorizontalPassword">
                            <Col style={{paddingTop : 0}} componentClass={ControlLabel} sm={2}>
                                Confirm Password
                            </Col>
                            <Col sm={10}>
                                <FormControl type="password" placeholder="Password Confirm" />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button type="submit">
                                    Sign up
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                    <div style={{marginLeft : 10 , marginTop : 20}}><Link to={`/login`}>I already have a membership</Link> </div>

                </Box>



            </div>
        );
    }

}

SignupPage.propTypes = {
    selectedItem : PropTypes.func
};


function mapStateToProps(state, ownProps) {

    return {};

}

export default connect(mapStateToProps, { })(Radium(SignupPage));


