import React from 'react'
import SignupForm from '../../Components/Forms/SignupForm'

class Signup extends React.Component {
    render() {
        return (
            <React.Fragment>
            <div className="page-normal-margin">
                <SignupForm signupHandler={this.props.signupHandler} />
            </div>
        </React.Fragment>
        )
    }
}

export default Signup