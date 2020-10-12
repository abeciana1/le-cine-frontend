import React from 'react'
import ClubMeetingComponent from '../Components/ClubMeetingComponent'

class UpcomingMeetings extends React.Component {

    getMeetings = () => {
        return this.props.meetings.map(meeting => <ClubMeetingComponent key={meeting.id} meeting={meeting}/>)
    }

    render() {
        return(
                <React.Fragment>
                    <div style={{"marginLeft": "50px", "marginTop": "50px", "marginRight": "50px"}}>
                        {this.getMeetings()}
                    </div>
                </React.Fragment>
        )
    }
}

export default UpcomingMeetings