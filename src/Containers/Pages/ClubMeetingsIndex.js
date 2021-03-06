import React from 'react'
import ClubNav from '../../Components/ClubNav'
import ClubMeetingComponent from '../../Components/ClubMeetingComponent'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import MediaQuery from 'react-responsive'

class ClubMeetingsIndex extends React.Component {

    state = {
        club: null,
        allMeetings: [],
        upcomingMeetings: [],
        previousMeetings: []
    }

    componentDidMount = () => {
        fetch(
          "https://le-cine-backend.herokuapp.com/api/v1/clubs/" + this.props.id
        )
          .then((res) => res.json())
          .then((data) => {
              let sortedMeetings = data.meetings.sort(function (a, b) {
                  return new Date(b.date) - new Date(a.date);
              })
            this.setState({
                club: data,
                allMeetings: sortedMeetings
            });
            let past = []
            let upcoming = []

            let todayDate = moment().format("MMMM Do YYYY, h:mm:ss a");
            for (let meetingObj of sortedMeetings) {
                // console.log(moment(meetingObj.date).isAfter(todayDate));
                if(meetingObj.date > todayDate){ //! for upcoming meetings
                // if(moment(meetingObj.date).isAfter(todayDate)){ 
                    console.log(meetingObj.date < todayDate);
                    upcoming.push(meetingObj)
                } else if (moment(todayDate).isAfter(meetingObj.date)) { //! for previous meetings
                    past.push(meetingObj)
                }
            }
            // this.getMeetings(past, upcoming)
          });
    }

    getMeetings = () => {
        // let todayDate = moment().format("MMMM Do YYYY");
        // console.log("past", past)
        // console.log("upcoming", upcoming)
        // console.log("all", this.state.allMeetings)
        // this.setState({
        //     upcomingMeetings: upcoming,
        //     previousMeetings: past
        // })
        // debugger
        // this.setState({
        //     upcomingMeetings: this.state.allMeetings.filter(meeting => meeting.date > todayDate),
        //     upcomingMeetings: this.state.allMeetings.filter(meeting => meeting.date > todayDate),
        //     previousMeetings: this.state.allMeetings.filter(meeting => todayDate > meeting.date)
        // })
        return this.state.allMeetings.map(meeting => <ClubMeetingComponent key={meeting.id} club={this.state.club} deleteMeetingHandler={this.deleteMeetingHandler} meeting={meeting} />)
    }

    renderUpcomingMeeting = () => {
        if(this.state.upcomingMeetings.length !== 0){
            return this.state.upcomingMeetings.map(meeting => <ClubMeetingComponent key={meeting.id} club={this.state.club} deleteMeetingHandler={this.deleteMeetingHandler} meeting={meeting} />)
        }
        else {
            return <h3 style={{"textAlign": "center"}}>Sorry, there are no upcoming meetings!</h3>
        }
    }

    renderPreviousMeeting = () => {
        return this.state.previousMeetings.map(meeting => <ClubMeetingComponent key={meeting.id} club={this.state.club} deleteMeetingHandler={this.deleteMeetingHandler} meeting={meeting} />)
    }

    deleteMeetingHandler = (meetingObj) => {
        // let todayDate = moment().format('YYYY-MM-DD')

        let newArray = [...this.state.allMeetings];
        newArray.splice(newArray.indexOf(meetingObj), 1);
        this.setState({ allMeetings: newArray})
        
        // if(meetingObj.date > todayDate){ //! for upcoming meetings
        //     let newArray = [...this.state.upcomingMeetings]
        //     newArray.splice(newArray.indexOf(meetingObj), 1)
        //     this.setState({upcomingMeetings: newArray})
        // } else if (moment(todayDate).isAfter(meetingObj.date)) { //! for previous meetings
        //     let newArray = [...this.state.previousMeetings]
        //     newArray.splice(newArray.indexOf(meetingObj), 1)
        //     this.setState({previousMeetings: newArray})
        // }
        const options = {method: 'DELETE'}
        fetch(
          "https://le-cine-backend.herokuapp.com/api/v1/meetings/" +
            meetingObj.id,
          options
        ).then((res) => res.json());
    }

    render() {
        // console.log("upcoming", this.state.upcomingMeetings)
        console.log("all", this.state.allMeetings)
        return(
            <React.Fragment>
            {this.state.club ?
            <React.Fragment>
            <MediaQuery maxWidth={999}>
            <ClubNav club={this.state.club} />
            <div style={{"marginLeft": "20px", "marginRight": "20px", "paddingTop":"20px"}}>
                <h1>Club Meetings</h1>
                <div style={{"backgroundColor": "#EFEFEF", "width": "100%", "paddingTop": "30px", "paddingBottom": "30px", "marginTop":"50px"}}>
                    <div style={{"marginLeft": "20px", "paddingRight": "40px"}}>
                        <h2>Upcoming Meetings</h2>
                    </div>
                </div>
                <div style={{"backgroundColor": "#EFEFEF", "width": "100%", "paddingTop":"30px", "paddingBottom": "30px", "marginTop":"50px"}}>
                    <div style={{"backgroundColor": "white", "paddingTop":"20px", "paddingBottom":"20px", "marginLeft":"20px", "marginRight":"20px"}}>
                        {this.getMeetings()}
                    </div>
                </div>
                <br />
                <div style={{"backgroundColor": "#EFEFEF", "width": "100%", "paddingTop":"30px", "paddingBottom": "30px", "marginTop":"50px"}}>
                        <div style={{"marginLeft": "20px", "paddingRight": "40px"}}>
                            <h2>Previous Meetings</h2>
                        </div>
                </div>
                <div style={{"backgroundColor": "#EFEFEF", "width": "100%", "paddingTop":"30px", "paddingBottom": "30px", "marginTop":"50px"}}>
                    <div className="internal-card-white">
                        {/* {this.renderPreviousMeeting()} */}
                    </div>
                </div>
                <br />
            </div>
            </MediaQuery>
            <MediaQuery minWidth={1000}>
            <ClubNav club={this.state.club} />
            <div className="index-heading">
                <h1>Club Meetings</h1>
                <br />
                <div className="index-container">
                    <div style={{"marginLeft": "20px", "paddingRight": "40px"}}>
                        <h2>Upcoming Meetings</h2>
                    </div>
                </div>
                <div className="index-container">
                    <div className="internal-card-white">
                        {this.getMeetings()}
                    </div>
                </div>
                <br />
                <div className="index-container">
                        <div style={{"marginLeft": "20px", "paddingRight": "40px"}}>
                            <h2>Previous Meetings</h2>
                        </div>
                </div>
                <div className="index-container">
                    <div className="internal-card-white">
                        {/* {this.renderPreviousMeeting()} */}
                    </div>
                </div>
                <br />
            </div>
            </MediaQuery>
            </React.Fragment>
            :
            null
            }
            </React.Fragment>
        )
    }
}

export default withRouter(ClubMeetingsIndex)