import React from 'react';
import UserContainer from '../UserContainer'
import MyClubsContainer from '../MyClubsContainer'
import HostClubsContainer from '../HostClubsContainer'
import MyMeetingsContainer from '../MyMeetingsContainer'
import LoadingComponent from '../../Components/LoadingComponent'
import { Row, Col } from 'react-bootstrap'

class Dashboard extends React.Component {

    render() {
        return(
            <React.Fragment>
            {this.props.user ? 
                <div style={{"marginLeft": "50px", "marginTop": "50px", "marginRight": "50px"}}>
                {/* <h2>Auth</h2> */}
                    <Row>
                        <Col xs={6}>
                            <UserContainer user={this.props.user} />
                        </Col>
                        <Col xs={6}>
                            <MyMeetingsContainer user={this.props.user} />
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <MyClubsContainer user={this.props.user} />
                    <br />
                    <br />
                    <HostClubsContainer user={this.props.user} />
                    <div style={{"paddingTop": "100px"}}></div>
                </div>
                :
                <LoadingComponent />
            }
            </React.Fragment>
        )
    }
}

export default Dashboard