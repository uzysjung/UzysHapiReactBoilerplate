/**
 * Created by uzysjung on 2016. 10. 21..
 */
import React, { PropTypes,Component } from 'react';
import PageWrapper from '../../components/page/PageWrapper'
import PageHeader from '../../components/page/PageHeader'
import PageContent from '../../components/page/PageContent'
import Box from '../../components/widget/Box'
import { connect } from 'react-redux'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }
    componentDidMount() {
        this.props.selectedItem(9);
    }
    render() {
        return (
            <PageWrapper>
                <PageHeader
                    title="Home page"
                    description="Welcome to the Home page"
                >
                    <Breadcrumb
                        items={[
                            { key: 1, icon: 'fa fa-home', title: 'Home', url: '/' }
                        ]}
                    />
                </PageHeader>
                <PageContent>
                    <Box
                        title="Welcome"
                        status="primary"
                        expandable
                        removable
                    >
                        Now Under Construction. 미안 보여줄께 없네
                    </Box>
                </PageContent>
            </PageWrapper>
        );
    }
}

HomePage.propTypes = {
    selectedItem : PropTypes.func
};


function mapStateToProps(state, ownProps) {

    return {};

}

export default connect(mapStateToProps, { })(HomePage);


