import React from 'react';
import UserContainer from '../UserContainer'
import MyClubsContainer from '../MyClubsContainer'
import HostClubsContainer from '../HostClubsContainer'
import MyMeetingsContainer from '../MyMeetingsContainer'
import { Row, Col } from 'react-bootstrap'

class Dashboard extends React.Component {

    // state = {
    //     clubs: []
    // }

    // componentDidMount = () => {
    //     this.setState({
    //         clubs: this.props.user.clubs
    //     })
    // };
    

    // createClubHandler = (clubObj) => {
    //     console.log("club created")
    //     const options = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //         },
    //         body: JSON.stringify(clubObj)
    //     }
    //     fetch("http://localhost:3000/api/v1/clubs", options)
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data)
    //         let newArray = [...this.state.clubs, data]
    //         this.setState({
    //             clubs: newArray
    //         })
    //     })
    // }

    render() {
        // console.log(this.props.user)
        return(
            <React.Fragment>
            {this.props.user ? 
                <div className="page-normal-margin">
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
                    <HostClubsContainer user={this.props.user} clubs={this.props.user.clubs} createClubHandler={this.createClubHandler} />
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