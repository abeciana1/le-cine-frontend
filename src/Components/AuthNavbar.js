import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
// import logo from './images/le-cine-logo.png'


class AuthNavBar extends React.Component {

    state = {
        clicked: false,
        color: "#9D9D9D"
    }

    changeColor = (e) => {
        // e.preventDefault()
        // console.log("change color")
        this.setState({
            clicked: !this.state.clicked,
            color: "#FF3900"
        })
    }

    render() {
        return(
        <React.Fragment>
            <img className="site-logo" src={process.env.PUBLIC_URL + './images/le-cine-logo.png'} style={{"height": "400px", "float": "right", "zIndex": "1"}} alt="le-cine-logo"/>
            <Navbar bg="white" expand="lg">
                <Navbar.Brand href="/" style={{"color": "#FF3900"}}><strong>Le Cine</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/" style={{"color": this.state.color}} onClick={this.changeColor}>Home</Nav.Link>
                    <Nav.Link href="/about" style={{"color": this.state.color}} onClick={this.changeColor}>About Us</Nav.Link>
                    <Nav.Link href="/contact" style={{"color": this.state.color}} onClick={this.changeColor}>Contact Us</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </React.Fragment>
        )
    }
}

export default AuthNavBar