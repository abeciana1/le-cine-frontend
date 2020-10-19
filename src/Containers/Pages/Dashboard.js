import React from 'react';
import UserContainer from '../UserContainer'
import MyClubsContainer from '../MyClubsContainer'
import HostClubsContainer from '../HostClubsContainer'
import MyMeetingsContainer from '../MyMeetingsContainer'
import { Row, Col } from 'react-bootstrap'

class Dashboard extends React.Component {

    render() {
        return(
            <React.Fragment>
            {this.props.user ? 
                <div className="page-normal-margin">
                    <Row>
                        <Col xs={6}>
                            <UserContainer user={this.props.user} />
                        </Col>
                        <Col xs={6}>
                            <MyMeetingsContainer user={this.props.user} clubs={this.props.userClubs} />
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <MyClubsContainer user={this.props.user} clubs={this.props.userClubs}/>
                    <br />
                    <br />
                    <HostClubsContainer user={this.props.user} clubs={this.props.hostClubs} createClubHandler={this.createClubHandler} />
                    <div style={{"paddingTop": "100px"}}></div>
                </div>
                :
                null
            }
            </React.Fragment>
        )
    }
}

export default Dashboard