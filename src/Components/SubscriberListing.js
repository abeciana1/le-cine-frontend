import React from 'react'
import { Col, Row } from 'react-bootstrap'
import SubscriberComp from './SubscriberComp'

const SubscriberListing = (props) => {
    let subs = props.subscribers.map(subscriber => <SubscriberComp subscriber={subscriber} />)

    return (
        <React.Fragment>
            <Row xs={2} md={4} lg={6}>
                <Col><h4>Name</h4></Col>
                <Col><h4>Phone Number</h4></Col>
                <Col><h4>Email</h4></Col>
                <Col><h4>Subscriber Status</h4></Col>
            </Row>
            {subs}
        </React.Fragment>
    )
}

export default SubscriberListing