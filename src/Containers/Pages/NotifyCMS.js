import React from 'react'
import NotificationSendOut from '../../Components/Forms/NotificationSendOut'
import { Alert} from 'react-bootstrap'
import SubscriberListing from '../../Components/SubscriberListing'

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

    messageSubmitHandler = (bodyObj, mediaObj) => {
        console.log("Sent out message")
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                body: bodyObj,
                media_url: mediaObj
            })
        }
        fetch("http://localhost:4000/api/v1/alert-users", options)
    }

    render() {
        return (
            <React.Fragment>
                <div className="page-normal-margin">
                    <h1>Notify Subscribers</h1>
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
                            <NotificationSendOut immediateMessageShow={this.immediateMessageShow} messageSentOutAlert={this.messageSentOutAlert} messageSubmitHandler={this.messageSubmitHandler} />
                        </div>
                        : null}
                    <br />
                    <br />
                    <button className="read-more-btn"> Schedule Message (Coming Soon)</button>
                    <div style={{"paddingTop":"10px"}}>
                        <h1>Subscriber Management</h1>
                        <SubscriberListing subscribers={this.props.subscribers} changeSubcriberStatus={this.props.changeSubcriberStatus} deleteSubscriberHandler={this.props.deleteSubscriberHandler} updateSubscriberHandler={this.updateSubscriberHandler} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default NotifyCMS