import React from 'react'
import { Form } from 'react-bootstrap'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

class NotificationUpdateForm extends React.Component {

    state = {
        id: this.props.id,
        name: this.props.name,
        email_address: this.props.email,
        phone_number: this.props.phone,
        status: this.props.status
    }

    nameHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    emailHandler = (e) => {
        this.setState({
            email_address: e.target.value
        })
    }

    phoneHandler = (e) => {
        this.setState({
            phone_number: e
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.updateFormHandler()
        this.props.updateSubscriberHandler(this.state)
    }

    render() {
        return (
            <React.Fragment>
                {/* <div style={{"textAlign":"center"}}> */}
                    <form onSubmit={this.submitHandler} style={{"marginTop":"30px"}}>
                        <Form.Group>
                            <Form.Label>Full Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.nameHandler}
                                required={true}
                                style={{ width: "300px" }}
                            />
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            name="email_address"
                            value={this.state.email_address}
                            onChange={this.emailHandler}
                            required={true}
                            style={{ width: "300px" }}
                        />
                    </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone:</Form.Label>
                            <PhoneInput
                                // required={true}
                                country={'us'}
                                onlyCountries={["us"]}
                                name="phone_number"
                                value={this.state.phone_number}
                                inputProps={{
                                    required: true,
                                }}
                                onChange={this.phoneHandler}
                        />
                                                {this.state.phone_number.length < 11 ? 
                            <Form.Text style={{"color":"red"}}>
                                This field is required and must be filled out.
                            </Form.Text>
                        : 
                            <Form.Text style={{"color": "green"}}>
                                Lookin' Good!
                            </Form.Text>
                        }
                        {/* <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" /> */}
                        </Form.Group>
                        <Form.Group
                            controlId="submitButton"
                        >
                        <input
                            type="submit"
                            className="read-more-btn"
                            value="Submit"
                            style={{ width: "40%" }}
                            disabled={this.state.phone_number.length < 11 ? true : false}
                        />
                        </Form.Group>
                    </form>
                {/* </div> */}
            </React.Fragment>
        )
    }
}

export default NotificationUpdateForm;