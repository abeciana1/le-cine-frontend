import React from 'react'
import ClubNav from '../../Components/ClubNav'
import ClubMeetingComponent from '../../Components/ClubMeetingComponent'
import moment from 'moment'

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
            console.log(data)
            this.getMeetings()
        })
    }

    getMeetings = () => {
        console.log(this.state.allMeetings)
        let todayDate = moment().format('YYYY-MM-DD')
        this.setState({
            upcomingMeetings: this.state.allMeetings.filter(meeting => moment(meeting.date).isAfter(todayDate)),
            previousMeetings: this.state.allMeetings.filter(meeting => moment(todayDate).isAfter(meeting.date))
        })
        console.log(this.state.upcomingMeetings)
        console.log(this.state.previousMeetings)
    }

    renderUpcomingMeeting = () => {
        if(this.state.upcomingMeetings.length !== 0){
            return this.state.upcomingMeetings.map(meeting => <ClubMeetingComponent key={meeting.id} meeting={meeting} />)
        }else {
            return <h3 style={{"textAlign": "center"}}>Sorry, there are no upcoming meetings!</h3>
        }
    }

    renderPreviousMeeting = () => {
        return this.state.previousMeetings.map(meeting => <ClubMeetingComponent key={meeting.id} meeting={meeting} />)
    }

    render() {
        return(
            <React.Fragment>
            {this.state.club ?
            <React.Fragment>
            <ClubNav club={this.state.club} />
            <div style={{"marginLeft": "50px", "marginTop": "50px", "marginRight": "100px", "position": "relative", "left":"220px", "top": "50px", "width": "70%"}}>
                <h1>Club Meetings</h1>
                <br />
                <div style={{"backgroundColor": "#EFEFEF", "width": "80%", "paddingTop":"30px", "paddingBottom": "30px", "marginTop":"50px"}}>
                    <div style={{"backgroundColor": "white", "paddingTop":"40px", "paddingBottom":"40px","marginLeft":"50px", "marginRight":"50px"}}>
                        <div style={{"marginLeft": "20px", "paddingRight": "40px"}}>
                            <h2>Upcoming Meetings</h2>
                        </div>
                    </div>
                </div>
                {/* <br /> */}
                <div style={{"backgroundColor": "#EFEFEF", "width": "80%", "paddingTop":"30px", "paddingBottom": "30px", "marginTop":"50px"}}>
                    <div style={{"backgroundColor": "white", "paddingTop":"40px", "paddingBottom":"40px","marginLeft":"50px", "marginRight":"50px"}}>
                        {this.renderUpcomingMeeting()}
                    </div>
                </div>
                <br />
                <div style={{"backgroundColor": "#EFEFEF", "width": "80%", "paddingTop":"30px", "paddingBottom": "30px", "marginTop":"50px"}}>
                    <div style={{"backgroundColor": "white", "paddingTop":"40px", "paddingBottom":"40px","marginLeft":"50px", "marginRight":"50px"}}>
                        <div style={{"marginLeft": "20px", "paddingRight": "40px"}}>
                            <h2>Previous Meetings</h2>
                        </div>
                    </div>
                </div>
                {/* <br /> */}
                <div style={{"backgroundColor": "#EFEFEF", "width": "80%", "paddingTop":"30px", "paddingBottom": "30px", "marginTop":"50px"}}>
                    <div style={{"backgroundColor": "white", "paddingTop":"40px", "paddingBottom":"40px","marginLeft":"50px", "marginRight":"50px"}}>
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

export default ClubMeetingsIndex