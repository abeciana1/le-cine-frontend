import React from 'react'
// import Footer from '../Components/Footer'
import LoginForm from '../../Components/Forms/LoginForm'

class Login extends React.Component {

    render() {
        return (
            <React.Fragment>
                <div style={{"marginLeft": "50px", "marginTop": "50px", "marginRight": "50px"}}>
                    <LoginForm loginHandler={this.props.loginHandler} />
                </div>
            </React.Fragment>
        )
    }
}

export default Login