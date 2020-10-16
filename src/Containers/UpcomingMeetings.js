import React from 'react'
import ClubMeetingComponent from '../Components/ClubMeetingComponent'

class UpcomingMeetings extends React.Component {

    getMeetings = () => {
        return this.props.meetings.map(meeting => <ClubMeetingComponent key={meeting.id} club={this.props.club} meeting={meeting}/>)
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