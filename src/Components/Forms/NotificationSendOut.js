import React from 'react'
import {Form} from 'react-bootstrap'

class NotificationSendOut extends React.Component {
    state = {
        messageSentOut: false,
        body: "",
        media_url: ""
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    areYouSureHandler = (e) => {
        e.preventDefault();
        
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.immediateMessageShow();
        this.props.messageSentOutAlert();
    }

    render() {
        console.log(this.state)
        return (
            <React.Fragment>
                <Form onSubmit={this.areYouSureHandler} style={{"marginLeft":"10%", "marginRight":"10%", "padding":"20px" ,"backgroundColor":"#efefef", "paddingTop":"5 px"}}>
                    <Form.Group>
                        <Form.Label>Text Body:</Form.Label>
                        <Form.Control
                            as="textarea"
                            required={true}
                            name="body"
                            value={this.state.body}
                            onChange={this.changeHandler}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Add Image/Gif Urls here:</Form.Label>
                        <p style={{"textSize":"15px", "color":"red"}}>If you have multiple images/gifs - separate them with commas - NO SPACES</p>
                        <Form.Control
                            type="text"
                            name="media_url"
                            value={this.state.media_url}
                            onChange={this.changeHandler}
                        />
                    </Form.Group>
                    <Form.Group>
                        <input
                            type="submit"
                            className="read-more-btn"
                            value="Submit"
                            style={{ width: "30%" }}
                        />
                    </Form.Group>
                </Form>
                <div style={{"marginLeft":"10%", "marginRight":"10%", "padding":"20px" ,"backgroundColor":"#efefef"}}>
                    <h2>Preview Your Message Before Sending It Out</h2>
                    
                </div>
            </React.Fragment>
        )
    }
}

export default NotificationSendOut