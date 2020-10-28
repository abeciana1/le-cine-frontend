import React from 'react';
import UserContainer from '../UserContainer'
import MyClubsContainer from '../MyClubsContainer'
import HostClubsContainer from '../HostClubsContainer'
import MyMeetingsContainer from '../MyMeetingsContainer'
import { Row, Col } from 'react-bootstrap'

const Dashboard = (props) => {

        return(
            <React.Fragment>
            {props.user ? 
                <div className="page-normal-margin">
                    <Row>
                        <Col xs={6}>
                            <UserContainer user={props.user} />
                        </Col>
                        <Col xs={6}>
                            <MyMeetingsContainer user={props.user} clubs={props.userClubs} />
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <MyClubsContainer user={props.user} clubs={props.userClubs}/>
                    <br />
                    <br />
                    <HostClubsContainer user={props.user} clubs={props.hostClubs}/>
                    <div style={{"paddingTop": "100px"}}></div>
                </div>
                :
                null
            }
            </React.Fragment>
        )
    }

export default Dashboard