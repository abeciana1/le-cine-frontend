import React from 'react'
import { Form } from 'react-bootstrap'

class CreateClub extends React.Component {

    state = {
        name: "",
        about: "",
        city: "",
        state: "",
        country: "",
        image: "",
        member_count: 0,
        member_capacity: 0,
        privacy: false,
        host_id: this.props.user.id
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handlePrivacy = (e) => {
        this.setState({
            privacy: !this.state.privacy
        })
        console.log(this.state.privacy)
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.createClubHandler(this.state);
        this.setState({
            name: "",
            about: "",
            city: "",
            state: "",
            country: "",
            image: "",
            member_count: 0,
            member_capacity: 0,
            privacy: false,
            host_id: 0
        })
    }

    render() {
        return (
          <React.Fragment>
            <Form onSubmit={this.submitHandler}>
              <Form.Group>
                <Form.Label>
                  What would you like to call your new club?
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={this.state.name}
                  onChange={this.changeHandler}
                  name="name"
                  placeholder="Club Name"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Tell us more about your club with a description:
                </Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  value={this.state.about}
                  onChange={this.changeHandler}
                  name="about"
                  placeholder="Club Description"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>What city are you based in?</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={this.state.city}
                  onChange={this.changeHandler}
                  name="city"
                  placeholder="City"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>What state are you based in?</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={this.state.state}
                  onChange={this.changeHandler}
                  name="state"
                  placeholder="State"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>What country are you based in?</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={this.state.country}
                  onChange={this.changeHandler}
                  name="country"
                  placeholder="Country"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Add a link to a profile picture for your club's homepage:
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={this.state.image}
                  onChange={this.changeHandler}
                  name="image"
                  placeholder="Club Image Link"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Set up a member capacity number</Form.Label>
                <Form.Control
                  required
                  type="number"
                  value={this.state.member_capacity}
                  onChange={this.changeHandler}
                  name="member_capacity"
                  min="0"
                />
                <Form.Text style={{ textColor: "black" }}>
                  <strong>This can always be update</strong>
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>Is your club private or public?</Form.Label>
                <Form.Check
                  type="checkbox"
                  checked={this.state.privacy}
                  onChange={this.handlePrivacy}
                  label="Private"
                  name="privacy"
                  style={{ marginLeft: "5px" }}
                />
                <Form.Text>
                  <strong>Defaults to Public</strong>
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <input
                  type="submit"
                  value="Submit"
                  className="read-more-btn"
                  style={{ width: "100%" }}
                />
              </Form.Group>
            </Form>
          </React.Fragment>
        );
    }
}

export default CreateClub