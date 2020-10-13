import React from 'react'
import { Form } from 'react-bootstrap'

class CreateMeeting extends React.Component {

    state = {
        title: "",
        excerpt: "",
        about: "",
        date: "",
        time: "",
        link: "",
        club_id: this.props.club.id
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log("submit")
    }

    render() {
        return(
            <React.Fragment>
                <Form onSubmit={this.submitHandler}>
                    <Form.Group controlId="meetingTitle">
                        {/* <Form.Label><strong>Give your meeting a title:</strong></Form.Label> */}
                        <Form.Label>Give your meeting a title:</Form.Label>
                        <Form.Control type="text" placeholder="Meeting Title" />
                    </Form.Group>
                    <Form.Group controlId="meetingExcerpt">
                        <Form.Label>If you have an excerpt for your meeting, please provide one:</Form.Label>
                        <Form.Control type="text" placeholder="Meeting Excerpt"/>
                    </Form.Group>
                    <Form.Group controlId="meetingAbout">
                        <Form.Label>Please provide a description for your meeting:</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Meeting Description" />
                    </Form.Group>
                    <Form.Group controlId="meetingDate">
                        <Form.Label>Choose the date of your meeting:</Form.Label>
                        <Form.Control type="date" />
                    </Form.Group>
                    <Form.Group controlId="meetingTime">
                        <Form.Label>Choose the time of your meeting:</Form.Label>
                        <Form.Control type="time" />
                    </Form.Group>
                    <Form.Group controlId="meetingLink">
                        <Form.Label>Please provide a meeting link:</Form.Label>
                        <Form.Control type="text" placeholder="Meeting Link" />
                    </Form.Group>
                    <Form.Group controlId="submitButton" style={{"textAlign": "center"}}>
                        <input type="submit" className="read-more-btn" value="Submit" style={{"width": "100%"}}/>
                    </Form.Group>
                </Form>
            </React.Fragment>
        )
    }
}

export default CreateMeeting