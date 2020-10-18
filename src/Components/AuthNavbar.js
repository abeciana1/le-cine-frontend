import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';

class AuthNavBar extends React.Component {

    logout = (e) => {
        this.props.logoutHandler()
    }

    render() {
        return(
        <React.Fragment>
        {this.props.location.pathname.match("/movies/search/") ? null : <img className="site-logo" src={process.env.PUBLIC_URL + '/images/le-cine-logo.png'} style={{"height": "300px", "float": "right", "zIndex": "1"}} alt="le-cine-logo"/> }
            <Navbar bg="white" expand="lg">
                <Navbar.Brand>
                    <Link to="/" style={{"color": "#FF3900", "textDecoration": "none"}}>
                        <strong>Le Cine</strong>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <NavDropdown title="Options" id="basic-nav-dropdown">
                        <NavDropdown.Item>
                            <Link to="/" style={{"textDecoration": "none", "color": "rgba(0,0,0,.5)"}}>Home</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item >
                            <Link to="/about" style={{"textDecoration": "none", "color": "rgba(0,0,0,.5)"}}>About Us</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/contact" style={{"textDecoration": "none", "color": "rgba(0,0,0,.5)"}}>
                                Contact Us
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item >
                            <Link to="/settings" style={{"textDecoration": "none", "color": "rgba(0,0,0,.5)"}}>Settings</Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link>
                        <Link to="/dashboard" style={{"textDecoration": "none", "color": "rgba(0,0,0,.5)"}}>Dashboard</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/my-watchlist" style={{"textDecoration": "none", "color": "rgba(0,0,0,.5)"}}>Watchlist</Link>
                    </Nav.Link>
                    <NavDropdown title="Clubs" id="basic-nav-dropdown">
                        <NavDropdown.Item>
                            <Link to="/clubs/index" style={{"textDecoration": "none", "color": "rgba(0,0,0,.5)"}}>Find a Club</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/clubs/manage" style={{"textDecoration": "none", "color": "rgba(0,0,0,.5)"}}>Manage Memberships</Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link onClick={this.logout}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </React.Fragment>
        )
    }
}

export default withRouter(AuthNavBar)