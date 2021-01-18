import React from 'react'
import { Col, Row } from 'react-bootstrap'
import SubscriberComp from './SubscriberComp'

class SubscriberListing extends React.Component {

    getSubscribers = () => {
        let subs = this.props.subscribers.sort((a, b) => {
            return new Date(a.created_at) - new Date(b.created_at)
        })
        return subs.map(subscriber => <SubscriberComp subscriber={subscriber} changeSubcriberStatus={this.props.changeSubcriberStatus} deleteSubscriberHandler={this.props.deleteSubscriberHandler} updateSubscriberHandler={this.props.updateSubscriberHandler} />)
    }

    render() {
        return (
            <React.Fragment>
                <Row xs={2} md={4} lg={6}>
                    <Col><h4>Name</h4></Col>
                    <Col><h4>Phone</h4></Col>
                    <Col><h4>Email</h4></Col>
                    <Col><h4>Status</h4></Col>
                </Row>
                {this.getSubscribers()}
            </React.Fragment>
        )
    }
}

export default SubscriberListing