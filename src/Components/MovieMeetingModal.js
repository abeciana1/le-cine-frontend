import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import CreateMovieMeeting from './Forms/CreateMovieMeeting'

class MovieMeetingModal extends React.Component {

    state = {
        modalOpen: false
    }

    modalHandler = (e) => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    render() {
        return(
            <>
                <div style={{"paddingLeft": "20px","backgroundColor": "#EFEFEF", "textAlign": "center", "paddingRight":"20px"}}>
                    <button onClick={this.modalHandler} className="read-more-btn">Add A Movie To This Meeting</button>
                </div>
            <Modal show={this.state.modalOpen === true} close={this.state.modalOpen === false} >
                <Modal.Header closeButton onClick={this.modalHandler}>
                    <Modal.Title>Add A Movie To Your Meeting</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateMovieMeeting submitHandler={this.props.submitHandler} club={this.props.club} movies={this.props.movies} meeting={this.props.meeting} />
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

export default MovieMeetingModal