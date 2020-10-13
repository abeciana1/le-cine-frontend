import React from 'react'
import LoadingComponent from '../../Components/LoadingComponent'
import { Col, Row, Modal, Button } from 'react-bootstrap'
import moment from 'moment'
import UpcomingMeetings from '../UpcomingMeetings'
import ClubNav from '../../Components/ClubNav'
import { withRouter } from 'react-router-dom'
import CreateMeeting from '../../Components/Forms/CreateMeeting'

class ClubShow extends React.Component {

    state = {
        club: null,
        allMeetings: [],
        upcomingMeetings: [],
        modalOpen: false
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/api/v1/clubs/" + this.props.id)
        .then(res => res.json())
        .then(data => {
            this.setState({
                club: data,
                allMeetings: data.meetings
            })
            this.getNextMeeting()
        })
    }

    joinClubHandler = (e) => {
        // console.log("join")
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                user_id: this.props.user.id,
                club_id: this.state.club.id
            })
        }
        fetch("http://localhost:3000/api/v1/user_clubs", options)
        .then(res => res.json())
        .then(this.props.history.push("/dashboard"))
    }

    getNextMeeting = () => {
        let todayDate = moment().format('YYYY-MM-DD')
        this.setState({
            upcomingMeetings: this.state.allMeetings.filter(meeting => moment(meeting.date).isAfter(todayDate))
        })
    }

    modalHandler = (e) => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    editClubHandler = () => {
        console.log("edit club")
    }

    // addMeetingHandler = (e) => {
    //     this.modalHandler()
    //     console.log("add meeting")
        
    // }

    render() {
        return(
            <React.Fragment>
            {this.props.user && this.state.club ?
                <React.Fragment>
                <ClubNav club={this.state.club} />
                <div style={{"marginLeft": "50px", "marginTop": "50px", "marginRight": "100px", "position": "relative", "left":"220px", "top": "50px", "width": "70%"}}>
                <Row>
                        <Col xs={5}>
                        <div style={{"zIndex": "3", "backgroundColor": "#EFEFEF", "width": "40%", "textAlign": "center", "paddingTop": "40px", "paddingBottom": "40px"}}>
                            <img src={this.state.club.image} alt="user-profile-pic" style={{"borderRadius":"60px", "height": "100px", "backgroundColor": "white"}} />
                        </div>
                        </Col>
                        <Col xs={6}>
                            <h1>{this.state.club.name}</h1>
                            <h4 style={{"paddingBottom": "30px"}}>Located: {this.state.club.city}, {this.state.club.state}, {this.state.club.country}</h4>
                            {this.state.club.host_id === this.props.user.id ? 
                            <div>
                                {/* <br /> */}
                                <button onClick={this.editClubHandler} className="read-more-btn">Edit Club</button>
                                <button onClick={this.modalHandler} className="read-more-btn" style={{"marginLeft": "20px"}}>Add A Meeting</button>
                            </div>
                            :
                            null
                            }
                        </Col>
                        <Col></Col>
                    </Row>
                    <div style={{"backgroundColor": "#EFEFEF", "width": "50%", "paddingTop":"30px", "paddingBottom": "30px", "marginTop":"50px"}}>
                        <h2 style={{"marginLeft": "20px", "paddingBottom": "10px"}}>About Us</h2>
                        <div style={{"backgroundColor": "white", "marginLeft": "20px", "marginRight": "20px"}}>
                            <p style={{"marginLeft": "20px", "marginRight": "20px", "paddingTop":"5px", "paddingBottom":"5px"}}>
                                {this.state.club.about}
                            </p>
                        </div>
                            <button className="read-more-btn" style={{"marginLeft": "20px"}} onClick={this.joinClubHandler}>Join Our Club</button>
                    </div>
                    <br />
                    <br />
                    <br />
                        <div style={{"backgroundColor": "#EFEFEF", "width": "100%", "paddingTop":"30px", "paddingBottom": "30px", "marginTop":"50px"}}>
                            <h2 style={{"textAlign":"center"}}>Upcoming Meetings</h2>
                            {this.state.upcomingMeetings ? <UpcomingMeetings meetings={this.state.upcomingMeetings}/> : null}
                        </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div style={{"textAlign": "center"}}>
                        <h2>Club created by {this.state.club.host.first_name} {this.state.club.host.last_name}</h2>
                        <h3>Email to contact {this.state.club.host.email}</h3>
                    </div>
                </div>
                <>
                    <Modal show={this.state.modalOpen === true} close={this.state.modalOpen === false} >
                        <Modal.Header closeButton onClick={this.modalHandler}>
                            <Modal.Title>Add To Your Club Watchlist</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <p style={{"textAlign": "center"}}>Woohoo, you're adding a meeting to this club!</p>
                            {/* RENDER MEETING CREATION FORM */}
                            <CreateMeeting club={this.state.club} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.modalHandler}>
                            Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    </>
                </React.Fragment>
                : <LoadingComponent />
            }
            </React.Fragment>
        )
    }
}

export default withRouter(ClubShow)