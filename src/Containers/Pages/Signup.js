import React from 'react'
import SignupForm from '../../Components/Forms/SignupForm'

class Signup extends React.Component {
    render() {
        return (
            <React.Fragment>
            <div style={{"marginLeft": "50px", "marginTop": "50px", "marginRight": "50px"}}>
                <SignupForm signupHandler={this.props.signupHandler} />
            </div>
        </React.Fragment>
        )
    }
}

export default Signup