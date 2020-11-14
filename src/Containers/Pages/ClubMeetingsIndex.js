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
        fetch("http://localhost:3000/api/v1/clubs/" + this.props.id)
        .then(res => res.json())
        .then(data => {
            this.setState({
                club: data,
                allMeetings: data.meetings
            })
            this.getMeetings()
        })
    }

    getMeetings = () => {
        let todayDate = moment().format('YYYY-MM-DD')
        this.setState({
            upcomingMeetings: this.state.allMeetings.filter(meeting => moment(meeting.date).isAfter(todayDate)),
            previousMeetings: this.state.allMeetings.filter(meeting => moment(todayDate).isAfter(meeting.date))
        })
    }

    renderUpcomingMeeting = () => {
        if(this.state.upcomingMeetings.length !== 0){
            return this.state.upcomingMeetings.map(meeting => <ClubMeetingComponent key={meeting.id} club={this.state.club} deleteMeetingHandler={this.deleteMeetingHandler} meeting={meeting} />)
        }else {
            return <h3 style={{"textAlign": "center"}}>Sorry, there are no upcoming meetings!</h3>
        }
    }

    renderPreviousMeeting = () => {
        return this.state.previousMeetings.map(meeting => <ClubMeetingComponent key={meeting.id} club={this.state.club} deleteMeetingHandler={this.deleteMeetingHandler} meeting={meeting} />)
    }

    deleteMeetingHandler = (meetingObj) => {
        let todayDate = moment().format('YYYY-MM-DD')
        
        if(moment(meetingObj.date).isAfter(todayDate)){ //! for upcoming meetings
            let newArray = [...this.state.upcomingMeetings]
            newArray.splice(newArray.indexOf(meetingObj), 1)
            this.setState({upcomingMeetings: newArray})
        } else if (moment(todayDate).isAfter(meetingObj.date)) { //! for previous meetings
            let newArray = [...this.state.previousMeetings]
            newArray.splice(newArray.indexOf(meetingObj), 1)
            this.setState({previousMeetings: newArray})
        }
        const options = {method: 'DELETE'}
        fetch("http://localhost:3000/api/v1/meetings/" + meetingObj.id, options)
        .then(res => res.json())
    }

    render() {
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
                        {this.renderUpcomingMeeting()}
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
                        {this.renderPreviousMeeting()}
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
                        {this.renderUpcomingMeeting()}
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
                        {this.renderPreviousMeeting()}
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