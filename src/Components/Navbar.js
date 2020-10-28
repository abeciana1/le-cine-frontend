import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';


const logout = (e) => {
    this.props.logoutHandler()
}

const NavBar = (props) => {
        return(
        <React.Fragment>
            {props.location.pathname.match("/movies/search/") ? null : <img className="site-logo" src={process.env.PUBLIC_URL + '/images/le-cine-logo.png'} style={{"height": "300px", "float": "right", "zIndex": "1"}} alt="le-cine-logo"/> }
            <Navbar bg="white" expand="lg">
                <Navbar.Brand>
                    <Link to="/" style={{"color": "#FF3900", "textDecoration": "none"}}><strong>Le Cine</strong></Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link>
                        <Link to="/" style={{"textDecoration":"none", "color": "rgba(0,0,0,.5)"}}>Home</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/about" style={{"textDecoration":"none", "color": "rgba(0,0,0,.5)"}}>About Us</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/contact" style={{"textDecoration":"none", "color": "rgba(0,0,0,.5)"}}>Contact Us</Link>
                    </Nav.Link>
                    {props.user ? <Nav.Link onClick={logout}>Logout</Nav.Link> : <Nav.Link>
                        <Link to="/login" style={{"textDecoration": "none", "color": "rgba(0,0,0,.5)"}}>Login</Link>
                    </Nav.Link>}
                    {props.user ? null : <Nav.Link href="/signup">
                        <Link to="/signup" style={{"textDecoration": "none", "color": "rgba(0,0,0,.5)"}}>Signup</Link>
                    </Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </React.Fragment>
        )
    }

export default withRouter(NavBar)