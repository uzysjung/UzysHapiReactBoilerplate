/**
 * Created by uzysjung on 2016. 10. 21..
 */
import React, { PropTypes,Component } from 'react';
import PageWrapper from '../../components/page/PageWrapper'
import PageHeader from '../../components/page/PageHeader'
import PageContent from '../../components/page/PageContent'
import Box from '../../components/widget/Box'
import { connect } from 'react-redux'
import { FormGroup , InputGroup, FormControl, Button, Grid , Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }
    componentDidMount() {
        console.log('this.props.route',this.props.route)
    }
    render() {
        return (
            <PageWrapper>
                <PageHeader
                    title="Github User Search"
                    description="Welcome to the Home page"
                >
                </PageHeader>
                <PageContent>
                    <Box
                        title="Welcome"
                        status="primary"
                        expandable
                        removable
                    >
                            <Row>
                                <Col md={12} xs={12}>
                                    <form>
                                        <FormGroup>
                                            <InputGroup>
                                                <FormControl type="text" placeholder="Type Github UserID" />
                                                <InputGroup.Button>
                                                    <Button>Search</Button>
                                                </InputGroup.Button>
                                            </InputGroup>
                                        </FormGroup>
                                    </form>
                                </Col>
                            </Row>

                    </Box>
                </PageContent>
            </PageWrapper>
        );
    }
    renderList() {
        return (
            <Row>
                <Col md={12} >
                    <ListGroup>
                        <ListGroupItem>Item 1</ListGroupItem>
                        <ListGroupItem>Item 2</ListGroupItem>
                        <ListGroupItem>...</ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>

        )
    }
}

HomePage.propTypes = {
    selectedItem : PropTypes.func
};


function mapStateToProps(state, ownProps) {

    return {};

}

export default connect(mapStateToProps, { })(HomePage);


