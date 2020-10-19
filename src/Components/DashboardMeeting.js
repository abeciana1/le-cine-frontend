import React from "react";
import { ListGroup } from "react-bootstrap"

class DashboardMeeting extends React.Component {

    state = {
        club: null,
        meetings: []
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/api/v1/clubs/" + this.props.clubId)
        .then(res => res.json())
        .then(data => {
            this.setState({
                club: data,
                meetings: data.meetings
            })
        })
    };
    

    addClubName = () => {
        return(
            <div style={{"fontSize":"30px"}}>{this.state.club.name}</div>
        )
    }

    listMeetings = () => {
        if(this.state.club.meetings.length > 0){
            return this.state.meetings.slice(0,1).map(meeting => <ListGroup.Item action href={"/clubs/" + this.state.club.id + "/meetings/" + meeting.id } className="meeting-list-item"> <strong>{this.state.club.name}</strong> | {meeting.title} | {meeting.date}, {meeting.time}</ListGroup.Item>)
        } else {
            return <h6>This club has no upcoming meetings!</h6>
        }
    }

    render() {
        return(
            <React.Fragment>
            {this.state.club ?
            <React.Fragment>
                <div style={{"marginLeft": "20px", "marginRight": "20px"}}>
                    <br />
                    <ul>
                        {this.addClubName()}
                        {this.listMeetings()}
                    </ul>
                </div>
            </React.Fragment>
            : null }
            </React.Fragment>
        )
    }
}

export default DashboardMeeting