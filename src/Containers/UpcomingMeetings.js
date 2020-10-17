import React from 'react'
import ClubMeetingComponent from '../Components/ClubMeetingComponent'
import moment from 'moment'

class UpcomingMeetings extends React.Component {

    getMeetings = () => {
        let todayDate = moment().format('YYYY-MM-DD')
        let upcoming = this.props.meetings.filter(meeting => moment(meeting.date).isAfter(todayDate))
        return upcoming.map(meeting => <ClubMeetingComponent key={meeting.id} club={this.props.club} meeting={meeting}/>)
    }

    render() {
        return(
                <React.Fragment>
                    <div className="page-normal-margin">
                        {this.getMeetings()}
                    </div>
                </React.Fragment>
        )
    }
}

export default UpcomingMeetings