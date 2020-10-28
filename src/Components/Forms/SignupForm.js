import React from 'react'
import { Form } from 'react-bootstrap'
import MediaQuery from 'react-responsive'

class SignupForm extends React.Component {

    state = {
        first_name: "",
        last_name: "",
        birthday: "",
        image: "",
        email: "",
        password: ""
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    signupHandler = (e) => {
        e.preventDefault()
        this.props.signupHandler(this.state)
        this.setState({
            first_name: "",
            last_name: "",
            birthday: "",
            image: "",
            email: "",
            password: ""
        })
    }

    render() {
        return (
            <React.Fragment>
            <MediaQuery maxWidth={999}>
            <div style={{"zIndex": "3", "backgroundColor": "#EFEFEF", "textAlign": "center", "width": "100%", "margin": "auto"}}>
            <Form onSubmit={this.signupHandler} style={{"paddingTop": "60px", "paddingBottom": "60px"}}>
            <h1>Signup</h1>
                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="first_name" onChange={this.changeHandler} value={this.state.first_name} placeholder="First Name" className="form-field"/>
                </Form.Group>
                <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="last_name" onChange={this.changeHandler} value={this.state.last_name} placeholder="Last Name" className="form-field"/>
                </Form.Group>
                <Form.Group controlId="birthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control type="date" name="birthday" onChange={this.changeHandler} value={this.state.birthday} placeholder="Birthday" className="form-field"/>
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" name="image" onChange={this.changeHandler} value={this.state.image} placeholder="Profile Picture" className="form-field"/>
                </Form.Group>
                <Form.Group controlId="Email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" onChange={this.changeHandler} value={this.state.email} placeholder="Email" className="form-field"/>
                </Form.Group>
                <Form.Group controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={this.changeHandler} value={this.state.password} placeholder="Password" className="form-field"/>
                </Form.Group>
                <input type="submit" value="Signup" className="read-more-btn" style={{"backgorundColor": "#EFEFEF"}}/>
            </Form>
            </div>
            </MediaQuery>
            <MediaQuery minWidth={1000}>
            <div style={{"zIndex": "3", "backgroundColor": "#EFEFEF", "textAlign": "center", "width": "30%", "margin": "auto"}}>
            <Form onSubmit={this.signupHandler} style={{"paddingTop": "60px", "paddingBottom": "60px"}}>
            <h1>Signup</h1>
                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="first_name" onChange={this.changeHandler} value={this.state.first_name} placeholder="Enter your first name" className="form-field"/>
                </Form.Group>
                <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="last_name" onChange={this.changeHandler} value={this.state.last_name} placeholder="Enter your last name" className="form-field"/>
                </Form.Group>
                <Form.Group controlId="birthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control type="date" name="birthday" onChange={this.changeHandler} value={this.state.birthday} placeholder="Enter your birthday" className="form-field"/>
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" name="image" onChange={this.changeHandler} value={this.state.image} placeholder="picture" className="form-field"/>
                </Form.Group>
                <Form.Group controlId="Email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" onChange={this.changeHandler} value={this.state.email} placeholder="Enter email" className="form-field"/>
                </Form.Group>
                <Form.Group controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={this.changeHandler} value={this.state.password} placeholder="Password" className="form-field"/>
                </Form.Group>
                <input type="submit" value="Signup" className="read-more-btn" style={{"backgorundColor": "#EFEFEF"}}/>
            </Form>
        </div>
        </MediaQuery>
        </React.Fragment>
        )
    }
}

export default SignupForm