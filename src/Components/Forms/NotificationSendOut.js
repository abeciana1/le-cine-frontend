import React from 'react'
import {Form} from 'react-bootstrap'

class NotificationSendOut extends React.Component {
    state = {
        messageSentOut: false,
        previewMessageShow: false,
        body: "",
        media_url: "",
        mediaArr: []
    }

    bodyHandler = (e) => {
        this.setState({
            body: e.target.value
        })
    }

    mediaUrlHandler = (e) => {
        this.setState({
            media_url: e.target.value,
            mediaArr: [...this.state.mediaArr, e.target.value]
        })
    }

    imageRender = () => {
        let images = this.state.media_url.split(",")
        return images.map(image => <img src={image} style={{"height":"300px"}} />)
    }

    areYouSureHandler = (e) => {
        e.preventDefault();
        this.setState({
            previewMessageShow: !this.state.previewMessageShow
        })
    }

    submitHandler = () => {
        this.props.immediateMessageShow();
        this.props.messageSentOutAlert();
        this.props.messageSubmitHandler(this.state.body, this.state.media_url)
    }

    render() {
        return (
          <React.Fragment>
            <Form
              onSubmit={this.areYouSureHandler}
              style={{
                marginLeft: "10%",
                marginRight: "10%",
                padding: "20px",
                backgroundColor: "#efefef",
                paddingTop: "5 px",
              }}
            >
              <Form.Group>
                <Form.Label>Text Body:</Form.Label>
                <Form.Control
                  as="textarea"
                  required={true}
                  name="body"
                  value={this.state.body}
                  onChange={this.bodyHandler}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Add Image/Gif Urls here:</Form.Label>
                <p style={{ textSize: "15px", color: "red" }}>
                  If you have multiple images/gifs - separate them with commas -
                  NO SPACES
                </p>
                <p style={{ textSize: "15px", color: "red" }}>
                  To find image urls - use this{" "}
                  <a
                    href="https://support.google.com/websearch/answer/118238?co=GENIE.Platform%3DDesktop&hl=en"
                    target="_blank"
                    rel="noreferrer"
                    alt="Google - Find the URL of a page or image"
                  >
                    guide
                  </a>
                  .
                </p>
                <Form.Control
                  type="text"
                  name="media_url"
                  value={this.state.media_url}
                  onChange={this.mediaUrlHandler}
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
            {this.state.previewMessageShow ? (
              <div
                style={{
                  marginLeft: "10%",
                  marginRight: "10%",
                  padding: "20px",
                  backgroundColor: "#efefef",
                }}
              >
                <h2>Preview Your Message Before Sending It Out</h2>
                <h4 style={{ color: "#FF3900" }}>Body:</h4>
                <p>{this.state.body}</p>
                <h4 style={{ color: "#FF3900" }}>Images:</h4>
                {this.imageRender()}
                {this.state.mediaArr.length >= 1 ? 
                ()=> this.state.mediaArr.map(image => <img src={image} />)
                : <p style={{"color":"red"}}>No images added</p>}
                {/* {this.imagePreviewHandler()} */}
                <div style={{ marginTop: "10px" }}>
                    <h2>Are you sure you want to send this message?</h2>
                  <button
                    className="read-more-btn"
                    style={{ marginRight: "10px" }}
                    onClick={this.submitHandler}
                  >
                    Yes
                  </button>
                  <button
                    className="read-more-btn"
                  >
                    No
                  </button>
                </div>
              </div>
            ) : null}
          </React.Fragment>
        );
    }
}

export default NotificationSendOut