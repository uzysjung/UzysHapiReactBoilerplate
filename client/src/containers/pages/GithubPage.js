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
import { fetchGithub } from '../../actions/github.js'
import Radium from 'radium'

class GithubPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName : 'uzysjung'
        }
    }

    componentWillMount() {
    }
    componentDidMount() {
        //console.log('this.props.route',this.props.route)
        this.props.fetchGithub('uzysjung')
    }
    handleChange = (e) => {

        switch(e.target.id) {
            case 'submit' :
                this.props.fetchGithub(this.state.userName);
                break;
            case 'input' :
                this.setState( { userName : e.target.value } );
                break;
        }
        console.log('e.target',e.target.id)

    }
    render() {
        return (
            <PageWrapper>
                <PageHeader
                    title="Github User Repository Search"
                    description="UzysHapiReact React + Redux + Axios example"
                >
                </PageHeader>
                <PageContent>
                    <Box
                        title="Welcome"
                        status="primary"
                        expandable
                        removable
                        loading = {this.props.isGithubLoading}
                    >
                            <Row>
                                <Col md={12} xs={12}>
                                    <form>
                                        <FormGroup>
                                            <InputGroup>
                                                <FormControl id='input' type="text" value={this.state.userName} onChange={this.handleChange} placeholder="Type Github UserID" />
                                                <InputGroup.Button>
                                                    <Button id='submit' onClick={this.handleChange} >Search</Button>
                                                </InputGroup.Button>
                                            </InputGroup>
                                        </FormGroup>
                                    </form>
                                </Col>
                            </Row>
                        {this.renderList()}

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
                        {
                            this.props.userData.map(function(item , index ){
                                return <ListGroupItem key={index}><i className="fa fa-github" aria-hidden="true" /> <a href={item.html_url} target='_new'>{item.full_name}</a></ListGroupItem>
                            })
                        }

                    </ListGroup>
                </Col>
            </Row>

        )
    }
}

GithubPage.propTypes = {
    userData : PropTypes.array,
    isGithubLoading : PropTypes.bool
};


function mapStateToProps(state, ownProps) {

    return {
        isGithubLoading : state.github.isGithubLoading,
        userData : state.github.data || []
    };

}

export default connect(mapStateToProps, { fetchGithub }) ( Radium(GithubPage) );


