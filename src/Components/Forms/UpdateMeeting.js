import React from 'react'
import { Form } from 'react-bootstrap'
import MovieMeetingDescUpdate from "./MovieMeetingDescUpdate";

class UpdateMeeting extends React.Component {

    state = {
        id: this.props.meeting.id,
        title: this.props.meeting.title,
        excerpt: this.props.meeting.excerpt,
        about: this.props.meeting.about,
        date: this.props.meeting.date,
        time: this.props.meeting.time,
        link: this.props.meeting.link,
        club_id: this.props.club.id
    }

    aboutHandler = (description) => {
        console.log(description)
        this.setState({
            about: description
        })
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateHandler = (e) => {
        e.preventDefault()
        this.props.updateHandler(this.state)
        
    }

  render() {
      console.log(this.state)
        return (
          <React.Fragment>
            <Form onSubmit={this.updateHandler}>
              <Form.Group controlId="meetingTitle">
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
              {/* <Form.Group controlId="meetingAbout"> */}
                <Form.Label>
                  Please provide a description for your meeting:
                </Form.Label>
                <MovieMeetingDescUpdate aboutHandler={this.aboutHandler} html={this.state.about} />
                {/* <Form.Control required as="textarea" rows={3} name="about" value={this.state.about} onChange={this.changeHandler} placeholder="Meeting Description" /> */}
              {/* </Form.Group> */}
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

export default UpdateMeeting