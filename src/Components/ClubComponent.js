import React from 'react';
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';

class ClubComponent extends React.Component {
    render() {
        return(
            <React.Fragment>
                <Col sm style={{"paddingBottom": "50px", "paddingTop": "20px", "paddingLeft": "20px", "paddingRight": "20px"}}>
                    <img src={this.props.club.image} alt={this.props.club.name} style={{"height": "100px", "width": "100px"}} />
                    <br />
                    <br />
                    <h6>{this.props.club.name}</h6>
                    <Link to={"/clubs/" + this.props.club.id}>
                        <button className="read-more-btn">View Details</button>
                    </Link>
                </Col>
            </React.Fragment>
        )
    }
}

export default ClubComponent