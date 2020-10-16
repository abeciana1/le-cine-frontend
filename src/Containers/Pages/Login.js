import React from 'react'
import LoginForm from '../../Components/Forms/LoginForm'

class Login extends React.Component {

    render() {
        return (
            <React.Fragment>
                <div className="page-normal-margin">
                    <LoginForm wrongCredentials={this.props.wrongCredentials} loginHandler={this.props.loginHandler} />
                </div>
            </React.Fragment>
        )
    }
}

export default Login