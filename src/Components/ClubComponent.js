import React from 'react';
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';

class ClubComponent extends React.Component {

    state = {
        club: null
    }

    componentDidMount() {
        fetch(
          "https://le-cine-backend.herokuapp.com/api/v1/clubs/" +
            this.props.clubId
        )
          .then((res) => res.json())
          .then((data) => {
            this.setState({ club: data });
          });
    }

    render() {
        return(
            <React.Fragment>
            {this.state.club ?
            <React.Fragment>
                <Col xs={3} style={{"paddingBottom":"20px"}}>
                    <img src={this.state.club.image} alt={this.state.club.name} style={{"width": "20vw"}} />
                    <br />
                    <br />
                    <h6>{this.state.club.name}</h6>
                    <Link to={"/clubs/" + this.state.club.id}>
                        <button className="read-more-btn">View Details</button>
                    </Link>
                </Col>
            </React.Fragment>
            : null}
            </React.Fragment>
        )
    }
}

export default ClubComponent