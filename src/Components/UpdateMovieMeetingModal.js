import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import UpdateMeeting from './Forms/UpdateMeeting'

class UpdateMovieMeetingModal extends React.Component {

    state = {
        modalOpen: false
    }

    modalHandler = (e) => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    updateHandler = (meetingObj) => {
        this.props.updateHandler(meetingObj)
        this.modalHandler()
    }

    render() {
        return(
            <>
                <div style={{"paddingLeft": "20px","backgroundColor": "#EFEFEF", "textAlign": "center", "paddingRight":"20px"}}>
                    <button onClick={this.modalHandler} className="read-more-btn">Update Your Meeting</button>
                </div>
            <Modal show={this.state.modalOpen === true} close={this.state.modalOpen === false} >
                <Modal.Header closeButton onClick={this.modalHandler}>
                    <Modal.Title>Update Your Meeting</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdateMeeting updateHandler={this.updateHandler} club={this.props.club} meeting={this.props.meeting} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.modalHandler}>
                    Close
                    </Button>
                </Modal.Footer>
            </Modal>
            </>
        )
    }
}

export default UpdateMovieMeetingModal