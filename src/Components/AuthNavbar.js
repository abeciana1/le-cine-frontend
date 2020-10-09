import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class AuthNavBar extends React.Component {

    logout = (e) => {
        this.props.logoutHandler()
    }

    render() {
        return(
        <React.Fragment>
            <img className="site-logo" src={process.env.PUBLIC_URL + '/images/le-cine-logo.png'} style={{"height": "300px", "float": "right", "zIndex": "1"}} alt="le-cine-logo"/>
            <Navbar bg="white" expand="lg">
                <Navbar.Brand href="/" style={{"color": "#FF3900"}}><strong>Le Cine</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <NavDropdown title="Options" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/home">Home</NavDropdown.Item>
                        <NavDropdown.Item href="/about">About Us</NavDropdown.Item>
                        <NavDropdown.Item href="/contact">Contact Us</NavDropdown.Item>
                        <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/dashboard" >Dashboard</Nav.Link>
                    <Nav.Link href="/dashboard" >My Watchlist</Nav.Link>
                    <Nav.Link href="/dashboard" >Clubs</Nav.Link>
                    <Nav.Link onClick={this.logout}>Logout</Nav.Link>
                    {/* <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/about">About Us</Nav.Link>
                    <Nav.Link href="/contact">Contact Us</Nav.Link> */}
                    {/* {this.props.user ?  : <Nav.Link href="/login">Login</Nav.Link>}
                    {this.props.user ? null : <Nav.Link href="/signup">Signup</Nav.Link>} */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </React.Fragment>
        )
    }
}

export default withRouter(AuthNavBar)