import React, { PropTypes,Component } from 'react'
import { Navbar , Nav , NavItem , NavDropdown, MenuItem } from 'react-bootstrap'
import Pkg from '../../../../package.json'
import Radium from 'radium'
import _ from 'lodash'

import './Header.css'
const navbarStyle = {
    marginBottom: 0,
    border: "none",
    borderRadius: 0
};

class Header extends Component {
    constructor(props) {
        super(props)

        this.renderLoginMenu = this.renderLoginMenu.bind(this)
        this.renderNavItem = this.renderNavItem.bind(this)
        this.renderSubItem = this.renderSubItem.bind(this)
    }

    handleItemClick = (eventKey,event) => {
        this.props.handleMenuclick(eventKey,event);
        //console.log('eventKey',eventKey);

    }

    renderLoginMenu() {

        if(this.props.isAuthenticated === false) {
            const menu = this.props.loginMenu.noLogin;
            return  <NavItem eventKey={menu.key} onSelect={this.handleItemClick}>Login</NavItem>
        } else {
            const menu = this.props.loginMenu.Login;
            return (
                <NavDropdown eventKey={menu.key} onSelect={this.handleItemClick} title={menu.title} id='LoginMenu'>
                    {
                        menu.subMenu.map ( function(item) {

                            let subItemMenu ;
                            if(item.seperator) {
                                subItemMenu = <MenuItem divider />
                            } else {
                                subItemMenu = <MenuItem eventKey={item.key} >{item.title}</MenuItem>
                            }

                            return subItemMenu;
                        } )
                    }
                </NavDropdown>
            )

        }

    }
    renderNavItem(item) {
        if( _.isArray(item.subMenu) ) {
            return (
                <NavDropdown active={item.key === this.props.selectedMenuKey} key={item.key} eventKey={item.key} onSelect={this.handleItemClick} id={item.key} title={item.title}  style={{}}>
                    {this.renderSubItem(item.subMenu)}
                </NavDropdown>
            )
        } else {

            return (
                <NavItem active={item.key === this.props.selectedMenuKey} key={item.key} eventKey={item.key} onSelect={this.handleItemClick} >{item.title}</NavItem>
            )
        }
    }
    renderSubItem (subItems) {

        const selectedMenuKey = this.props.selectedMenuKey;
        return (
            subItems.map ( function(item,index) {
                //console.log('item:',item);

                let subItemMenu ;
                if(item.seperator) {
                    subItemMenu = <MenuItem key={index} divider />
                } else {
                    subItemMenu = <MenuItem  active={item.key === selectedMenuKey} key={index}  eventKey={item.key} ><div>{item.title}</div></MenuItem>
                }

                return subItemMenu

            })
        )

    }
    render() {

        const renderNavItem = this.renderNavItem;
        return (
            <Navbar inverse fluid={true} style={navbarStyle}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href='#' onClick={(e) =>{ e.preventDefault(); browserHistory.push('/')} } >{Pkg.name}</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        {
                            this.props.menu.map(function(item){
                                return renderNavItem(item)
                            })
                        }

                    </Nav>
                    <Nav pullRight>
                        {this.renderLoginMenu()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const propTypes = {
    children: PropTypes.node,
    handleMenuclick: PropTypes.func.isRequired,
    menu : PropTypes.array.isRequired,
    selectedMenuKey : PropTypes.number.isRequired,
    isAuthenticated : PropTypes.bool.isRequired,
    loginMenu : PropTypes.object.isRequired
};
Header.propTypes =propTypes

export default Radium(Header)
