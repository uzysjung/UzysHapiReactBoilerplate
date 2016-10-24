
/**
 * Created by uzysjung on 2016. 10. 21..
 */
import React ,{ Component, PropTypes }from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Radium from 'radium'
import { browserHistory } from 'react-router'
import { signoutUser } from '../../actions/user.js'
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
                url : `/sample/1?query=hi`
            },
            {
                seperator : true
            },
            {
                key :3.2,
                title : 'sample2',
                url : '/sample/2?query=hello'
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
            selectedMenuKey : 1,
            loginTitle : 'userName'
        };

        this.handleMenuclick = this.handleMenuclick.bind(this);
    }

    handleMenuclick(mainKey,event) {

        if(mainKey < 100) {
            this.setState({
                selectedMenuKey : mainKey
            })
            const url = this.getURLfromMenu(mainKey);
            browserHistory.push(url);
        } else {
            //Login Menu
            if(this.props.authenticated) {
                //Login Menu
                for(const subItem of loginMenu.Login.subMenu) {
                    if(subItem.key.toString() == '200.1') {
                        console.log('signPit')
                        this.props.signoutUser()
                    }
                }
            } else {
                //NoLoginMenu
                browserHistory.push(loginMenu.noLogin.url);
            }
        }


    }
    getURLfromMenu( key ) {

        for ( const item of menuItem ) {
            if( key === item.key ) return item.url;
            if( item.subMenu && item.subMenu.length > 0 ) {
                for( const subItem of item.subMenu) {
                    if(key === subItem.key) return subItem.url;
                }
            }
        }



    }
    setselectedMenuKey(url) {

        for ( const item of menuItem ) {
            if(_.hasIn(item,'url')) {

                if( item.url.length === 1 && url == item.url || item.url.length > 1 && _.startsWith( url ,item.url) ) {

                    return item.key;
                }

            }
            if( item.subMenu && item.subMenu.length > 0 ) {
                for( const subItem of item.subMenu) {
                    if(_.hasIn(subItem,'url')) {
                        if( subItem.url.length === 1 && url == subItem.url || subItem.url.length > 1 && _.startsWith( url ,subItem.url) )
                        {
                            return subItem.key;
                        }

                    }
                }
            }
        }

    }
    componentWillMount() {
        const curMenuKey = this.setselectedMenuKey(this.props.location.pathname);

        this.setState({
            selectedMenuKey : curMenuKey
        })

        loginMenu.Login.title = this.props.userEmail;

    }
    componentDidMount() {
        console.log('didMount')
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
        authenticated : state.auth.authenticated,
        userEmail : state.auth.email || 'username'
    };

}

export default connect(mapStateToProps, { signoutUser })(Radium(Layout));


