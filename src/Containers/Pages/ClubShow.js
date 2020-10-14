import React from 'react'
import LoadingComponent from '../../Components/LoadingComponent'
import { Col, Row, Modal, Button } from 'react-bootstrap'
import moment from 'moment'
import UpcomingMeetings from '../UpcomingMeetings'
import ClubNav from '../../Components/ClubNav'
import { withRouter } from 'react-router-dom'
import CreateMeeting from '../../Components/Forms/CreateMeeting'
import UpdateClub from '../../Components/Forms/UpdateClub'


class ClubShow extends React.Component {

    state = {
        club: null,
        allMeetings: [],
        upcomingMeetings: [],
        members: [],
        meetingModalOpen: false,
        modalOpen: false
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/api/v1/clubs/" + this.props.id)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({
                club: data,
                allMeetings: data.meetings,
                members: data.users
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

    meetingModalHandler = (e) => {
        this.setState({
            meetingModalOpen: !this.state.meetingModalOpen
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

    addMeetingToClub = (meetingObj) => {
        this.meetingModalHandler()
        let newArray = [...this.state.allMeetings, meetingObj]
        this.setState({
            allMeetings: newArray
        })
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(meetingObj)
        }
        fetch("http://localhost:3000/api/v1/meetings", options)
        .then(res => res.json())
        .then(window.location.reload(false))
    }

    disbandHandler = (e) => {
        console.log("disband")
        const options = {method: 'DELETE'}
        fetch("http://localhost:3000/api/v1/clubs/" + this.state.club.id, options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.props.history.push('/clubs')
        })
    }

    updateHandler = (clubObj) => {
        this.modalHandler()
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(clubObj)
        }
        fetch("http://localhost:3000/api/v1/clubs/" + clubObj.id, options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            window.location.reload(false)
        })
    }

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
                            <img src={this.state.club.image} alt="user-profile-pic" style={{"borderRadius":"60px", "height": "100px", "width": "100px","backgroundColor": "white"}} />
                        </div>
                        </Col>
                        <Col xs={6}>
                            <h1>{this.state.club.name}</h1>
                            <h4 style={{"paddingBottom": "30px"}}>Located: {this.state.club.city}, {this.state.club.state}, {this.state.club.country}</h4>
                            {this.state.club.host_id === this.props.user.id ? 
                            <div>
                                <button onClick={this.modalHandler} className="read-more-btn">Update Club</button>
                                <button onClick={this.meetingModalHandler} className="read-more-btn" style={{"marginLeft": "20px"}}>Add A Meeting</button>
                                <br />
                                <br />
                                {this.state.members.length !== 0 ? <p style={{"color":"red"}}>You can't disband a club that has members!</p> : null}
                                <button onClick={this.disbandHandler} className="read-more-btn" disabled={this.state.members.length !== 0 ? true : false}>Disband Club</button>
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
                            {this.state.upcomingMeetings ? <UpcomingMeetings meetings={this.state.upcomingMeetings} club={this.state.club} /> : null}
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
                    <Modal show={this.state.meetingModalOpen === true} close={this.state.meetingModalOpen === false} >
                        <Modal.Header closeButton onClick={this.meetingModalHandler}>
                            <Modal.Title>Add A Meeting To Your Club</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <p style={{"textAlign": "center"}}>Woohoo, you're adding a meeting to this club!</p>
                            <CreateMeeting club={this.state.club} submitHandler={this.addMeetingToClub} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.meetingModalHandler}>
                            Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    </>
                    <>
                    <Modal show={this.state.modalOpen === true} close={this.state.modalOpen === false} >
                        <Modal.Header closeButton onClick={this.modalHandler}>
                            <Modal.Title>Update Your Club</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <p style={{"textAlign": "center"}}>Feel free to update your club!</p>
                            <UpdateClub club={this.state.club} user={this.props.user} submitHandler={this.updateHandler} />
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