import React from 'react'
import { Col, Row } from 'react-bootstrap'

const deleteSubscriberHandler = (props) => {
    console.log("delete")
}

const SubscriberComp = (props) => {
    
    let sub = props.subscriber
    console.log(props)
    return (
        <React.Fragment>
            <Row xs={2} md={4} lg={6} style={{"backgroundColor": sub.status ? "#7BF1A8" : "#FCCEC5", "padding":"10px"}}>
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
                    <button className="read-more-btn" onClick={()=> props.changeSubcriberStatus(props.subscriber)}>Unsubscribe</button>
                    : <button className="read-more-btn" onClick={()=> props.changeSubcriberStatus(props.subscriber)}>Subscribe</button>}
                </Col>
                <Col>
                    <button className="read-more-btn" onClick={deleteSubscriberHandler}>Delete</button>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default SubscriberComp