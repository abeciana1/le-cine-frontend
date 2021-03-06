import React from 'react'
import { Form, Alert } from 'react-bootstrap'
import MediaQuery from 'react-responsive'

class LoginForm extends React.Component {

    state = {
        email: '',
        password: ''
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    loginHandler = (e) => {
        e.preventDefault()
        this.props.loginHandler(this.state)
        this.setState({
            email: "",
            password: ""
        })
    }

    render() {
        return (
            <React.Fragment>
            <MediaQuery maxWidth={999}>
            <div style={{"zIndex": "3", "backgroundColor": "#EFEFEF", "textAlign": "center", "width": "80%", "margin": "auto"}}>
                
                <Form onSubmit={this.loginHandler} style={{"paddingTop": "60px", "paddingBottom": "60px"}}>
                {this.props.wrongCredentials ?
                    <Alert variant="danger" style={{"width": "100%", "textAlign": "center"}}>
                        Invalid username or password
                    </Alert>
                :
                null
                }
                <h1>Login</h1>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" value={this.state.email} onChange={this.changeHandler} className="form-field" placeholder="Enter email"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" value={this.state.password} onChange={this.changeHandler} placeholder="Password" className="form-field"/>
                    </Form.Group>
                    <input type="submit" value="Login" className="read-more-btn" style={{"backgorundColor": "#EFEFEF"}}/>
                </Form>
            </div>
            </MediaQuery>
            <MediaQuery minWidth={1000}>
                <div style={{"zIndex": "3", "backgroundColor": "#EFEFEF", "textAlign": "center", "width": "50%", "margin": "auto"}}>
                
                    <Form onSubmit={this.loginHandler} style={{"paddingTop": "60px", "paddingBottom": "60px"}}>
                    {this.props.wrongCredentials ?
                        <Alert variant="danger" style={{"width": "100%", "textAlign": "center"}}>
                            Invalid username or password
                        </Alert>
                    :
                    null
                    }
                    <h1>Login</h1>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" value={this.state.email} onChange={this.changeHandler} className="form-field" placeholder="Enter email"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" value={this.state.password} onChange={this.changeHandler} placeholder="Password" className="form-field"/>
                        </Form.Group>
                        <input type="submit" value="Login" className="read-more-btn" style={{"backgorundColor": "#EFEFEF"}}/>
                    </Form>
                </div>
                </MediaQuery>
            </React.Fragment>
        )
    }
}

export default LoginForm