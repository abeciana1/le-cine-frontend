import React from 'react'
import NotificationSendOut from '../../Components/Forms/NotificationSendOut'

class NotifyCMS extends React.Component {

    state = {
        immediateMessage: false,
        scheduledMessage: false
    }

    immediateMessageShow = () => {
        this.setState({
            immediateMessage: !this.state.immediateMessage
        })
    }

    scheduledMessage = () => {
        this.setState({
            scheduledMessage: !this.state.scheduledMessage
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
                    {this.state.immediateMessage ?
                        <NotificationSendOut immediateMessageShow={this.immediateMessageShow} />
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