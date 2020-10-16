import React from 'react'
import ClubNav from '../../Components/ClubNav'
import ClubMeetingComponent from '../../Components/ClubMeetingComponent'
import moment from 'moment'
import { withRouter } from 'react-router-dom'

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
            console.log(this.state.upcomingMeetings)
            return this.state.upcomingMeetings.map(meeting => <ClubMeetingComponent key={meeting.id} club={this.state.club} deleteMeetingHandler={this.deleteMeetingHandler} meeting={meeting} />)
        }else {
            return <h3 style={{"textAlign": "center"}}>Sorry, there are no upcoming meetings!</h3>
        }
    }

    renderPreviousMeeting = () => {
        return this.state.previousMeetings.map(meeting => <ClubMeetingComponent key={meeting.id} club={this.state.club} deleteMeetingHandler={this.deleteMeetingHandler} meeting={meeting} />)
    }

    deleteMeetingHandler = (meetingObj) => {
        let newArray = [...this.state.allMeetings]
            newArray.splice(newArray.indexOf(meetingObj), 1)
            this.setState({ allMeetings: newArray})
        console.log(meetingObj)
        const options = {method: 'DELETE'}
        fetch("http://localhost:3000/api/v1/meetings/" + meetingObj.id, options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            window.location.reload(false)
        })
    }

    render() {
        return(
            <React.Fragment>
            {this.state.club ?
            <React.Fragment>
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
            </React.Fragment>
            :
            null
            }
            </React.Fragment>
        )
    }
}

export default withRouter(ClubMeetingsIndex)