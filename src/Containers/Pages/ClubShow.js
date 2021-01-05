import React from 'react'
import { Col, Row, Alert } from 'react-bootstrap'
import moment from 'moment'
import UpcomingMeetings from '../UpcomingMeetings'
import ClubNav from '../../Components/ClubNav'
import { withRouter } from 'react-router-dom'
// import CreateMeeting from '../../Components/Forms/CreateMeeting'
// import UpdateClub from '../../Components/Forms/UpdateClub'
import MediaQuery from 'react-responsive'
import MeetingCreationPage from './MeetingCreationPage'
// import MovieMeetingDescCreate from "../../Components/Forms/MovieMeetingDescCreate";

class ClubShow extends React.Component {

    state = {
        club: null,
        allMeetings: [],
        upcomingMeetings: [],
        members: [],
        addMeetingShow: false,
        updateClubShow: false,
        showAlert: false,
        joined: false
    }

    componentDidMount = () => {
        fetch(
          "https://le-cine-backend.herokuapp.com/api/v1/clubs/" + this.props.id
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            this.setState({
              club: data,
              allMeetings: data.meetings,
              members: data.users,
            });
            this.getNextMeeting();
          });
    }

    joinClubHandler = (e) => {
        this.setState({joined: true})
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
        fetch(
          "https://le-cine-backend.herokuapp.com/api/v1/user_clubs",
          options
        )
          .then((res) => res.json())
          .then((data) => {
            this.props.joinClubHandler(data.user_club);
          });
    }

    getNextMeeting = () => {
        let todayDate = moment().format('YYYY-MM-DD')
        this.setState({
            upcomingMeetings: this.state.allMeetings.filter(meeting => moment(meeting.date).isAfter(todayDate))
        })
    }

    addMeetingShowHandler = (e) => {
        // ! for add meeting button
        // console.log("add")
        this.setState({
            addMeetingShow: !this.state.addMeetingShow,
        });
    }

    updateClubShowHandler = (e) => {
        // ! for update club button
        // console.log("update");
        this.setState({
            updateClubShow: !this.state.updateClubShow,
        });
    }

    addMeetingToClub = (meetingObj) => {
        this.meetingModalHandler()
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(meetingObj)
        }
        fetch("https://le-cine-backend.herokuapp.com/api/v1/meetings", options)
          .then((res) => res.json())
          .then((data) => {
            let newArray = [...this.state.allMeetings, data.meeting];
            this.setState({
              allMeetings: newArray,
            });
          });
    }

    disbandHandler = (e) => {
        console.log("disband")
        const options = {method: 'DELETE'}
        fetch(
          "https://le-cine-backend.herokuapp.com/api/v1/clubs/" +
            this.state.club.id,
          options
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            this.props.history.push("/clubs");
          });
    }

    updateHandler = (clubObj) => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(clubObj)
        }
        fetch(
          "https://le-cine-backend.herokuapp.com/api/v1/clubs/" + clubObj.id,
          options
        )
          .then((res) => res.json())
          .then((data) => {
            this.setState({ club: data });
            this.modalHandler();
            this.renderAlert();
          });
    }

    renderAlert = () => {
        this.setState({
            showAlert: true
        })
    }

    deleteMeetingHandler = (meetingObj) => {
        let newArray = [...this.state.upcomingMeetings]
        newArray.splice(newArray.indexOf(meetingObj), 1)
        this.setState({allMeetings: newArray})
    }

    render() {
        return (
          <React.Fragment>
            <MediaQuery maxWidth={775}>
              {this.state.showAlert ? (
                <Alert
                  variant="success"
                  style={{
                    textAlign: "center",
                    width: "60%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    zIndex: "2",
                  }}
                >
                  Your changes have been saved!
                </Alert>
              ) : null}
              {this.props.user && this.state.club ? (
                <React.Fragment>
                  <ClubNav club={this.state.club} />
                  <div style={{ paddingTop: "20px" }}>
                    <div
                      style={{
                        backgroundColor: "#EFEFEF",
                        textAlign: "center",
                        paddingTop: "40px",
                        paddingBottom: "40px",
                      }}
                    >
                      <img
                        src={this.state.club.image}
                        alt="user-profile-pic"
                        style={{
                          borderRadius: "60px",
                          height: "100px",
                          width: "100px",
                          backgroundColor: "white",
                        }}
                      />
                    </div>
                    <div style={{ marginLeft: "20px", paddingTop: "20px" }}>
                      <h1>{this.state.club.name}</h1>
                      <h4 style={{ paddingBottom: "30px" }}>
                        Located: {this.state.club.city}, {this.state.club.state}
                        , {this.state.club.country}
                      </h4>
                    </div>
                    {this.state.club.host_id === this.props.user.id ? (
                      <div style={{ marginLeft: "20px" }}>
                        <button
                          onClick={this.updateClubShowHandler}
                          className="read-more-btn"
                        >
                          Update Club
                        </button>
                        <button
                          onClick={this.addMeetingShowHandler}
                          className="read-more-btn"
                          style={{ marginLeft: "20px" }}
                        >
                          Add A Meeting
                        </button>
                        <br />
                        <br />
                        {this.state.members.length !== 0 ? (
                          <p style={{ color: "red" }}>
                            You can't disband a club that has members!
                          </p>
                        ) : null}
                        <button
                          onClick={this.disbandHandler}
                          className="read-more-btn"
                          disabled={
                            this.state.members.length !== 0 ? true : false
                          }
                        >
                          Disband Club
                        </button>
                      </div>
                    ) : null}
                    <div
                      style={{
                        backgroundColor: "#EFEFEF",
                        paddingTop: "20px",
                        paddingBottom: "30px",
                        marginTop: "50px",
                      }}
                    >
                      <h2 style={{ marginLeft: "20px", paddingBottom: "10px" }}>
                        About Us
                      </h2>
                      <div
                        style={{
                          backgroundColor: "white",
                          marginLeft: "20px",
                          marginRight: "20px",
                        }}
                      >
                        <p
                          style={{
                            marginLeft: "20px",
                            marginRight: "20px",
                            paddingTop: "5px",
                            paddingBottom: "5px",
                          }}
                        >
                          {this.state.club.about}
                        </p>
                      </div>
                      {this.state.joined ||
                      this.props.user.clubs.some(
                        (club) => club.id === this.state.club.id
                      ) ? (
                        <button
                          className="read-more-btn"
                          style={{
                            marginLeft: "20px",
                            color: "white",
                            backgroundColor: "#FF3900",
                          }}
                          disabled={true}
                        >
                          Joined
                        </button>
                      ) : (
                        <button
                          className="read-more-btn"
                          style={{ marginLeft: "20px" }}
                          onClick={this.joinClubHandler}
                        >
                          Join Our Club
                        </button>
                      )}
                    </div>
                    <div
                      style={{
                        backgroundColor: "#EFEFEF",
                        width: "100%",
                        paddingTop: "30px",
                        paddingBottom: "30px",
                        marginTop: "50px",
                      }}
                    >
                      <h2 style={{ textAlign: "center" }}>Upcoming Meetings</h2>
                      {/* {this.state.upcomingMeetings ? <UpcomingMeetings meetings={this.state.upcomingMeetings} club={this.state.club} /> : null} */}
                      {this.state.upcomingMeetings ? (
                        <UpcomingMeetings
                          meetings={this.state.allMeetings}
                          club={this.state.club}
                          deleteMeetingHandler={this.deleteMeetingHandler}
                        />
                      ) : null}
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div style={{ textAlign: "center" }}>
                      <h2>
                        Club created by {this.state.club.host.first_name}{" "}
                        {this.state.club.host.last_name}
                      </h2>
                      <h3>Email to contact {this.state.club.host.email}</h3>
                    </div>
                  </div>
                  <MeetingCreationPage
                    club={this.state.club}
                    submitHandler={this.addMeetingToClub}
                  />
                </React.Fragment>
              ) : null}
            </MediaQuery>
            <MediaQuery minWidth={800} maxWidth={999}>
              {this.state.showAlert ? (
                <Alert
                  variant="success"
                  style={{
                    textAlign: "center",
                    width: "60%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    zIndex: "2",
                  }}
                >
                  Your changes have been saved!
                </Alert>
              ) : null}
              {this.props.user && this.state.club ? (
                <React.Fragment>
                  <ClubNav club={this.state.club} />
                  <div style={{ paddingTop: "20px" }}>
                    <Row>
                      <Col xs={5}>
                        <div
                          style={{
                            backgroundColor: "#EFEFEF",
                            width: "50%",
                            textAlign: "center",
                            paddingTop: "40px",
                            paddingBottom: "40px",
                          }}
                        >
                          <img
                            src={this.state.club.image}
                            alt="user-profile-pic"
                            style={{
                              borderRadius: "60px",
                              height: "100px",
                              width: "100px",
                              backgroundColor: "white",
                            }}
                          />
                        </div>
                      </Col>
                      <Col xs={6}>
                        <h1>{this.state.club.name}</h1>
                        <h4 style={{ paddingBottom: "30px" }}>
                          Located: {this.state.club.city},{" "}
                          {this.state.club.state}, {this.state.club.country}
                        </h4>
                        {this.state.club.host_id === this.props.user.id ? (
                          <div>
                            <button
                              onClick={this.updateClubShowHandler}
                              className="read-more-btn"
                            >
                              Update Club
                            </button>
                            <button
                              onClick={this.addMeetingShowHandler}
                              className="read-more-btn"
                              style={{ marginLeft: "20px" }}
                            >
                              Add A Meeting
                            </button>
                            <br />
                            <br />
                            {this.state.members.length !== 0 ? (
                              <p style={{ color: "red" }}>
                                You can't disband a club that has members!
                              </p>
                            ) : null}
                            <button
                              onClick={this.disbandHandler}
                              className="read-more-btn"
                              disabled={
                                this.state.members.length !== 0 ? true : false
                              }
                            >
                              Disband Club
                            </button>
                          </div>
                        ) : null}
                      </Col>
                      <Col></Col>
                    </Row>
                    <div
                      style={{
                        backgroundColor: "#EFEFEF",
                        width: "50%",
                        paddingTop: "30px",
                        paddingBottom: "30px",
                        marginTop: "50px",
                      }}
                    >
                      <h2 style={{ marginLeft: "20px", paddingBottom: "10px" }}>
                        About Us
                      </h2>
                      <div
                        style={{
                          backgroundColor: "white",
                          marginLeft: "20px",
                          marginRight: "20px",
                        }}
                      >
                        <p
                          style={{
                            marginLeft: "20px",
                            marginRight: "20px",
                            paddingTop: "5px",
                            paddingBottom: "5px",
                          }}
                        >
                          {this.state.club.about}
                        </p>
                      </div>
                      {this.state.joined ||
                      this.props.user.clubs.some(
                        (club) => club.id === this.state.club.id
                      ) ? (
                        <button
                          className="read-more-btn"
                          style={{
                            marginLeft: "20px",
                            color: "white",
                            backgroundColor: "#FF3900",
                          }}
                          disabled={true}
                        >
                          Joined
                        </button>
                      ) : (
                        <button
                          className="read-more-btn"
                          style={{ marginLeft: "20px" }}
                          onClick={this.joinClubHandler}
                        >
                          Join Our Club
                        </button>
                      )}
                      {/* <button className="read-more-btn" style={{"marginLeft": "20px"}} onClick={this.joinClubHandler}>Join Our Club</button> */}
                    </div>
                    <br />
                    <br />
                    <br />
                    <div
                      style={{
                        backgroundColor: "#EFEFEF",
                        width: "100%",
                        paddingTop: "30px",
                        paddingBottom: "30px",
                        marginTop: "50px",
                      }}
                    >
                      <h2 style={{ textAlign: "center" }}>Upcoming Meetings</h2>
                      {/* {this.state.upcomingMeetings ? <UpcomingMeetings meetings={this.state.upcomingMeetings} club={this.state.club} /> : null} */}
                      {this.state.upcomingMeetings ? (
                        <UpcomingMeetings
                          meetings={this.state.allMeetings}
                          club={this.state.club}
                          deleteMeetingHandler={this.deleteMeetingHandler}
                        />
                      ) : null}
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div style={{ textAlign: "center" }}>
                      <h2>
                        Club created by {this.state.club.host.first_name}{" "}
                        {this.state.club.host.last_name}
                      </h2>
                      <h3>Email to contact {this.state.club.host.email}</h3>
                    </div>
                  </div>
                  <MeetingCreationPage
                    club={this.state.club}
                    submitHandler={this.addMeetingToClub}
                  />
                </React.Fragment>
              ) : null}
            </MediaQuery>
            <MediaQuery minWidth={1000}>
              {this.state.showAlert ? (
                <Alert
                  variant="success"
                  style={{
                    textAlign: "center",
                    width: "60%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    zIndex: "2",
                  }}
                >
                  Your changes have been saved!
                </Alert>
              ) : null}
              {this.props.user && this.state.club ? (
                <React.Fragment>
                  <ClubNav club={this.state.club} />
                  <div className="index-heading">
                    <Row>
                      <Col xs={5}>
                        <div
                          style={{
                            zIndex: "3",
                            backgroundColor: "#EFEFEF",
                            width: "40%",
                            textAlign: "center",
                            paddingTop: "40px",
                            paddingBottom: "40px",
                          }}
                        >
                          <img
                            src={this.state.club.image}
                            alt="user-profile-pic"
                            style={{
                              borderRadius: "60px",
                              height: "100px",
                              width: "100px",
                              backgroundColor: "white",
                            }}
                          />
                        </div>
                      </Col>
                      <Col xs={6}>
                        <h1>{this.state.club.name}</h1>
                        <h4 style={{ paddingBottom: "30px" }}>
                          Located: {this.state.club.city},{" "}
                          {this.state.club.state}, {this.state.club.country}
                        </h4>
                        {this.state.club.host_id === this.props.user.id ? (
                          <div>
                            <button
                              onClick={this.updateClubShowHandler}
                              className="read-more-btn"
                            >
                              Update Club
                            </button>
                            <button
                              onClick={this.addMeetingShowHandler}
                              className="read-more-btn"
                              style={{ marginLeft: "20px" }}
                            >
                              Add A Meeting
                            </button>
                            <br />
                            <br />
                            {this.state.members.length !== 0 ? (
                              <p style={{ color: "red" }}>
                                You can't disband a club that has members!
                              </p>
                            ) : null}
                            <button
                              onClick={this.disbandHandler}
                              className="read-more-btn"
                              disabled={
                                this.state.members.length !== 0 ? true : false
                              }
                            >
                              Disband Club
                            </button>
                          </div>
                        ) : null}
                      </Col>
                      <Col></Col>
                    </Row>
                    <div
                      style={{
                        backgroundColor: "#EFEFEF",
                        width: "50%",
                        paddingTop: "30px",
                        paddingBottom: "30px",
                        marginTop: "50px",
                      }}
                    >
                      <h2 style={{ marginLeft: "20px", paddingBottom: "10px" }}>
                        About Us
                      </h2>
                      <div
                        style={{
                          backgroundColor: "white",
                          marginLeft: "20px",
                          marginRight: "20px",
                        }}
                      >
                        <p
                          style={{
                            marginLeft: "20px",
                            marginRight: "20px",
                            paddingTop: "5px",
                            paddingBottom: "5px",
                          }}
                        >
                          {this.state.club.about}
                        </p>
                      </div>
                      {this.state.joined ||
                      this.props.user.clubs.some(
                        (club) => club.id === this.state.club.id
                      ) ? (
                        <button
                          className="read-more-btn"
                          style={{
                            marginLeft: "20px",
                            color: "white",
                            backgroundColor: "#FF3900",
                          }}
                          disabled={true}
                        >
                          Joined
                        </button>
                      ) : (
                        <button
                          className="read-more-btn"
                          style={{ marginLeft: "20px" }}
                          onClick={this.joinClubHandler}
                        >
                          Join Our Club
                        </button>
                      )}
                      {/* <button className="read-more-btn" style={{"marginLeft": "20px"}} onClick={this.joinClubHandler}>Join Our Club</button> */}
                    </div>
                    {/* <MovieMeetingDescCreate /> */}
                    <br />
                    <br />
                    <br />
                    <div
                      style={{
                        backgroundColor: "#EFEFEF",
                        width: "100%",
                        paddingTop: "30px",
                        paddingBottom: "30px",
                        marginTop: "50px",
                      }}
                    >
                      <h2 style={{ textAlign: "center" }}>Upcoming Meetings</h2>
                      {/* {this.state.upcomingMeetings ? <UpcomingMeetings meetings={this.state.upcomingMeetings} club={this.state.club} /> : null} */}
                      {this.state.upcomingMeetings ? (
                        <UpcomingMeetings
                          meetings={this.state.allMeetings}
                          club={this.state.club}
                          deleteMeetingHandler={this.deleteMeetingHandler}
                        />
                      ) : null}
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div style={{ textAlign: "center" }}>
                      <h2>
                        Club created by {this.state.club.host.first_name}{" "}
                        {this.state.club.host.last_name}
                      </h2>
                      <h3>Email to contact {this.state.club.host.email}</h3>
                    </div>
                  </div>
                  <MeetingCreationPage
                    club={this.state.club}
                    submitHandler={this.addMeetingToClub}
                  />
                </React.Fragment>
              ) : null}
            </MediaQuery>
          </React.Fragment>
        );
    }
}

export default withRouter(ClubShow)