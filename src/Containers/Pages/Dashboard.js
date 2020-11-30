import React from 'react';
import UserContainer from '../UserContainer'
import MyClubsContainer from '../MyClubsContainer'
import HostClubsContainer from '../HostClubsContainer'
import MyMeetingsContainer from '../MyMeetingsContainer'
import { Row, Col } from 'react-bootstrap'
import MediaQuery from 'react-responsive'

const Dashboard = (props) => {
    
        return(
            <React.Fragment>
            <MediaQuery maxWidth={999}>
            {props.user ? 
                <div>
                    <UserContainer user={props.user} />
                    <br />
                    <br />
                    <MyMeetingsContainer user={props.user} clubs={props.userClubs} />
                    <br />
                    <br />
                    <MyClubsContainer user={props.user} clubs={props.userClubs}/>
                    <br />
                    <br />
                    <HostClubsContainer user={props.user} clubs={props.hostClubs}/>
                    <div style={{"paddingTop": "100px"}}></div>
                </div>
                :
                null}
            </MediaQuery>
            <MediaQuery minWidth={1000}>
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
                null}
            </MediaQuery>
            </React.Fragment>
        )
    }

export default Dashboard