import React from 'react';
import { Form } from 'react-bootstrap'

const Contact = (props) => {
    return (
        <React.Fragment>
            <div className="page-container">
        <div className="page-left">
            <aside>
                <h1 style={{"fontSize": "100px", "marginTop": "200px"}}>Contact</h1>
            </aside>
        </div>
        <div className="page-middle">
            <div className="page-body">
                <div style={{"zIndex": "3", "backgroundColor": "#EFEFEF", "textAlign": "center", "width": "80%", "marginTop": "100px", "marginLeft":"auto", "marginRight":"auto"}}>
                    <Form style={{"paddingBottom":"30px", "paddingTop":"30px"}}>
                        <Form.Group>
                            <Form.Label>Your Name:</Form.Label>
                            <Form.Control type="text" style={{"marginLeft": "auto", "marginRight": "auto", "width":"80%"}} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Subject:</Form.Label>
                            <Form.Control type="text" style={{"marginLeft": "auto", "marginRight": "auto", "width":"80%"}} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Your Message:</Form.Label>
                            <Form.Control as="textarea" rows={3} style={{"marginLeft": "auto", "marginRight": "auto", "width":"80%"}} />
                        </Form.Group>
                        <Form.Group>
                            <input type="submit" value="Send" className="read-more-btn" style={{"width":"40%"}}/>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
        <div className="page-right">
            <img id="lightbulb-gif" src={process.env.PUBLIC_URL + './images/ezgif.com-video-to-gif (9).gif'} alt="abstract design" />
        </div>
    </div>
        </React.Fragment>
    )
}

export default Contact