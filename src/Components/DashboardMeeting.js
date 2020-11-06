import React from "react";
import { ListGroup } from "react-bootstrap"
import MediaQuery from 'react-responsive'

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
            <h5 style={{"textAlign": "center"}}>{this.state.club.name}</h5>
        )
    }

    listMeetings = () => {
        if(this.state.club.meetings.length > 0){
            return this.state.meetings.slice(0,1).map(meeting => <ListGroup.Item action href={"/clubs/" + this.state.club.id + "/meetings/" + meeting.id }  style={{"width":"100%"}}>{meeting.title} | {meeting.date}, {meeting.time}</ListGroup.Item>)
        } else {
            return <h6>This club has no upcoming meetings!</h6>
        }
    }

    render() {
        return(
            <React.Fragment>
            {this.state.club ?
            <React.Fragment>
            <MediaQuery maxWidth={999}>
                <div style={{"marginRight": "40px"}}>
                    <br />
                    <ul>
                        {this.addClubName()}
                        {/* <ListGroup horizontal="lg" style={{"width": "100%"}}> */}
                        {this.listMeetings()}
                        {/* </ListGroup> */}
                    </ul>
                </div>
            </MediaQuery>
            <MediaQuery minWidth={1000}>
                <div style={{"marginLeft": "auto", "marginRight": "auto"}}>
                    <br />
                    <ul>
                        {this.addClubName()}
                        {this.listMeetings()}
                    </ul>
                </div>
                </MediaQuery>
            </React.Fragment>
            : null }
            </React.Fragment>
        )
    }
}

export default DashboardMeeting