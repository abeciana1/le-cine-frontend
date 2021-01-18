import React from 'react'
import { Col, Row } from 'react-bootstrap'

class SubscriberComp extends React.Component {

    state = {
        updateFormShow: false
    }
    
    render() {
        let sub = this.props.subscriber
        return (
            <React.Fragment>
                <Row xs={2} md={4} lg={6} style={{ "backgroundColor": sub.status ? "#7BF1A8" : "#FCCEC5", "padding": "10px" }}>
                    <Col>
                        {sub.name}
                    </Col>
                    <Col>
                        {sub.phone_number}
                    </Col>
                    <Col>
                        {sub.email_address}
                    </Col>
                    <Col>
                        <p>{`${sub.status}`}</p>
                    </Col>
                    <Col>
                        {sub.status ?
                            <button className="read-more-btn" onClick={() => this.props.changeSubcriberStatus(this.props.subscriber)}>Unsubscribe</button>
                            : <button className="read-more-btn" onClick={() => this.props.changeSubcriberStatus(this.props.subscriber)}>Subscribe</button>}
                    </Col>
                    <Col>
                        <button className="read-more-btn" onClick={() => this.props.updateSubscriberHandler(this.props.subscriber)}>Update Contact</button>
                    </Col>
                    <Col>
                        <button className="read-more-btn" onClick={() => this.props.deleteSubscriberHandler(this.props.subscriber)}>Delete</button>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default SubscriberComp