import React from 'react'
import {Col, Row} from 'react-bootstrap'

const SubscriberListing = (props) => {

    return (
        <React.Fragment>
            <Row xs={2} md={4} lg={6}>
                <Col><h4>Name</h4></Col>
                <Col><h4>Phone Number</h4></Col>
                <Col><h4>Email</h4></Col>
                <Col><h4>Subscriber Status</h4></Col>
            </Row>
            <Row xs={2} md={4} lg={6}>
                
            </Row>
        </React.Fragment>
    )
}

export default SubscriberListing