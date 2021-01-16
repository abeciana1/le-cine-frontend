import React from 'react'
import {Alert, Form} from 'react-bootstrap'

class NotificationSendOut extends React.Component {
    state = {
        messageSentOut: false
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.setState({
            messageSentOut: true
        })
        this.props.immediateMessageShow()
    }

    render() {
        return (
            <React.Fragment>
                <Form style={{"marginLeft":"10%", "marginRight":"10%", "padding":"20px" ,"backgroundColor":"#efefef"}}>
                    {this.state.messageSentOut ? 
                        <Alert variant="success">
                            SMS Notification has been sent!
                        </Alert>
                    :null}
                </Form>
            </React.Fragment>
        )
    }
}

export default NotificationSendOut