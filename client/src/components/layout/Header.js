import React, { PropTypes,Component } from 'react'
import { browserHistory } from 'react-router'
import { Navbar , Nav , NavItem , NavDropdown, MenuItem } from 'react-bootstrap'
import Pkg from '../../../../package.json'
import Radium from 'radium'


const navbarStyle = {
    marginBottom: 0,
    border: "none",
    borderRadius: 0
};
const evtMenu = {
    '1' : '/Github'
};
class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleItemClick = (eventKey,event) => {
        console.log('eventKey',eventKey);
        this.setState({ activeItem: eventKey });
        browserHistory.push(evtMenu[eventKey]);
    }

    render() {
        const { activeItem } = this.state

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
                        <NavItem eventKey={1} onSelect={this.handleItemClick} href='/Github'>Github</NavItem>
                        <NavItem eventKey={2} onSelect={this.handleItemClick} href='#'></NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavDropdown eventKey={3} onSelect={this.handleItemClick} title='Dropdown' id='basic-nav-dropdown'>
                            <MenuItem eventKey={3.1} >Action</MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3}>Separated link</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func
};
Header.propTypes =propTypes

export default Radium(Header)
