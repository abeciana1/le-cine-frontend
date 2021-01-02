import React from 'react'
import { Form } from 'react-bootstrap'
import MovieMeetingDesc from "./MovieMeetingDesc";

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

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    aboutHandler = (description) => {
        console.log(description)
        // debugger
        this.setState({
            about: description
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.submitHandler(this.state)
        this.setState({
            title: "",
            excerpt: "",
            about: "",
            date: "",
            time: "",
            link: "",
            club_id: 0
        })
    }

    render() {
        return (
          <React.Fragment>
            <Form onSubmit={this.submitHandler}>
              <Form.Group controlId="meetingTitle">
                {/* <Form.Label><strong>Give your meeting a title:</strong></Form.Label> */}
                <Form.Label>Give your meeting a title:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.changeHandler}
                  placeholder="Meeting Title"
                />
              </Form.Group>
              <Form.Group controlId="meetingExcerpt">
                <Form.Label>
                  If you have an excerpt for your meeting, please provide one:
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="excerpt"
                  value={this.state.excerpt}
                  onChange={this.changeHandler}
                  placeholder="Meeting Excerpt"
                />
              </Form.Group>
              <Form.Group controlId="meetingAbout">
                <Form.Label>
                  Please provide a description for your meeting:
                </Form.Label>
                <MovieMeetingDesc aboutHandler={this.aboutHandler} />
                {/* <Form.Control required as="textarea" rows={3} name="about" value={this.state.about} onChange={this.changeHandler} placeholder="Meeting Description" /> */}
              </Form.Group>
              <Form.Group controlId="meetingDate">
                <Form.Label>Choose the date of your meeting:</Form.Label>
                <Form.Control
                  required
                  type="date"
                  name="date"
                  value={this.state.date}
                  onChange={this.changeHandler}
                />
              </Form.Group>
              <Form.Group controlId="meetingTime">
                <Form.Label>Choose the time of your meeting:</Form.Label>
                <Form.Control
                  required
                  type="time"
                  name="time"
                  value={this.state.time}
                  onChange={this.changeHandler}
                />
              </Form.Group>
              <Form.Group controlId="meetingLink">
                <Form.Label>Please provide a meeting link:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="link"
                  value={this.state.link}
                  onChange={this.changeHandler}
                  placeholder="Meeting Link"
                />
              </Form.Group>
              <Form.Group
                controlId="submitButton"
                style={{ textAlign: "center" }}
              >
                <input
                  type="submit"
                  className="read-more-btn"
                  value="Submit"
                  style={{ width: "100%" }}
                />
              </Form.Group>
            </Form>
          </React.Fragment>
        );
    }
}

export default CreateMeeting