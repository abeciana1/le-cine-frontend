import React from "react";
import { ListGroup } from "react-bootstrap"

class DashboardMeeting extends React.Component {

    addClubName = () => {
        return(
            <h6>{this.props.club.name}</h6>
        ) 
    }

    listMeetings = () => {
        return this.props.meetings.slice(0,5).map(meeting =>
        <ListGroup.Item action href="#link1" className="meeting-list-item">{meeting.title} | {meeting.date}, {meeting.time}</ListGroup.Item>)
    }

    render() {
        return(
            <React.Fragment>
                <div style={{"marginLeft": "20px", "marginRight": "20px"}}>
                    <br />
                    <ul>
                        {this.addClubName()}
                        {this.listMeetings()}
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

export default DashboardMeeting