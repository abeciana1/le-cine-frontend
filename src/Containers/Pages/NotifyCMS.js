import React from 'react'
import NotificationSendOut from '../../Components/Forms/NotificationSendOut'
import {Alert} from 'react-bootstrap'

class NotifyCMS extends React.Component {

    state = {
        immediateMessage: false,
        scheduledMessage: false,
        messageSentOut: false
    }

    immediateMessageShow = () => {
        this.setState({
            immediateMessage: !this.state.immediateMessage
        })
    }

    scheduledMessageShow = () => {
        this.setState({
            scheduledMessage: !this.state.scheduledMessage
        })
    }

    messageSentOutAlert = () => {
        this.setState({
            messageSentOut: !this.state.messageSentOut
        })
    }

    render() {
        console.log(this.props)
        return (
            <React.Fragment>
                <div className="page-normal-margin">
                    <h1>Notify Members</h1>
                    <br />
                    <br />
                    <button className="read-more-btn" onClick={this.immediateMessageShow}>Send Immediate Message</button>
                {this.state.messageSentOut ? 
                <Alert variant="success" style={{"width": "50%", "marginLeft":"auto", "marginRight":"auto"}}>
                    SMS Notification has been sent!
                </Alert>
                : null}
                    {this.state.immediateMessage ?
                        <div style={{"paddingTop":"15px"}}>
                            <NotificationSendOut immediateMessageShow={this.immediateMessageShow} messageSentOutAlert={this.messageSentOutAlert} />
                        </div>
                        : null}
                    <br />
                    <br />
                    <button className="read-more-btn"> Schedule Message (Coming Soon)</button>
                </div>
            </React.Fragment>
        )
    }
}

export default NotifyCMS