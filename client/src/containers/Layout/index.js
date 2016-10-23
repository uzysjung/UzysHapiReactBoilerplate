
/**
 * Created by uzysjung on 2016. 10. 21..
 */
import React ,{ Component, PropTypes }from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Radium from 'radium'

const menuItem = [
    {
        key : 1,
        title : 'Home',
        url : '/',
        subMenu : null
    },
    {
        key : 2,
        title : 'Github',
        url : '/github',
        subMenu : null
    },
    {
        key : 3,
        title : 'MenuSample',
        subMenu : [
            {
                key :3.1,
                title : 'sample1',
                url : '/sample'
            },
            {
                seperator : true
            },
            {
                key :3.2,
                title : 'sample2',
                url : '/sample'
            }

        ]
    }


];

const loginMenu =
    {
        noLogin : {
            key : 100 ,
            title : 'Login',
            url : '/login'
        },
        Login : {
            key : 200 ,
            title : 'username',
            subMenu :[
                {
                    key :200.1,
                    title : 'sample1',
                    url : '/sample'
                },
                {
                    seperator : true
                },
                {
                    key :200.2,
                    title : 'Logout',
                    url : '/logout'
                }
            ]
        }
    };

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMenuKey : 3.1
        };
        this.handleMenuclick = this.handleMenuclick.bind(this);
    }
    handleMenuclick(mainKey,event) {
        this.setState({
            selectedMenuKey : mainKey
        })
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <Header menu={menuItem} handleMenuclick={this.handleMenuclick} selectedMenuKey={this.state.selectedMenuKey} isAuthenticated={this.props.authenticated} loginMenu={loginMenu} />
                {this.props.children}
                <Footer />
            </div>
        );
    }

}

Layout.propTypes = {
    children: PropTypes.node
};


function mapStateToProps(state, ownProps) {

    return {
        authenticated : state.auth.authenticated
    };

}

export default connect(mapStateToProps, { })(Radium(Layout));


