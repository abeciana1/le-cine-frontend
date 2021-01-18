import React from 'react'
import {Col, Row} from 'react-bootstrap'

const SubscriberComp = (props) => {

    let sub = props.subscriber
    return (
        <React.Fragment>
            <Row xs={2} md={4} lg={6}>
                <Col>
                    {sub.name}
                </Col>
                <br />
                <br />
                <Col>
                    {sub.phone_number}
                </Col>
                <br />
                <br />
                <Col>
                    {sub.email_address}
                </Col>
                <br />
                <br />
                <Col>
                    {sub.status}
                </Col>
                <br />
                <br />
                <Col>
                    <button className="read-more-btn">Unsubscribe</button>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default SubscriberComp