/**
 * Created by uzysjung on 2016. 10. 21..
 */
import React, { PropTypes,Component } from 'react';
import PageWrapper from '../../components/page/PageWrapper'
import PageHeader from '../../components/page/PageHeader'
import PageContent from '../../components/page/PageContent'
import Box from '../../components/widget/Box'
import { connect } from 'react-redux'
import Radium from 'radium'

class SamplePage extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
    }
    componentDidMount() {
    }
    render() {
        console.log('this.route',this.props.route);
        console.log('this.props',this.props);
        return (
            <PageWrapper>
                <PageHeader
                    title="React Router Sample Page"
                    description="UzysHapiReact React-Router Example"
                    >
                </PageHeader>
                <PageContent>
                    <Box
                        title="Welcome"
                        status="primary"
                        expandable
                        removable
                        >
                        <p> URL Path : {this.props.location.pathname} </p>
                        <p> params : {this.props.params.id} </p>
                        <p> query : {this.props.location.query.query} </p>



                    </Box>
                </PageContent>
            </PageWrapper>
        );
    }

}

SamplePage.propTypes = {

};


function mapStateToProps(state, ownProps) {

    return {};

}

export default connect( mapStateToProps, {} ) ( Radium(SamplePage) );


