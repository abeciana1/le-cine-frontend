import React from "react";
import { ListGroup } from "react-bootstrap"

class DashboardMeeting extends React.Component {

    state = {
        meetings: []
    }


    // componentDidMount() {
    //     let meetings = this.props.meetings
    //     for(const meet of meetings) {
    //         fetch("http://localhost:3000/api/v1/meetings/" + meet.id)
    //         .then(res => res.json())
    //         .then(data => {
    //             this.setState({
    //                 meetings: [...this.state.meetings, data]
    //             }, console.log(this.state.meetings))
    //         })
    //     }
        
    // }

    // getMeetings = () => {
    //     let meetings = this.props.meetings
    //     for(const meet of meetings) {
    //         fetch("http://localhost:3000/api/v1/meetings/" + meet.id)
    //         .then(res => res.json())
    //         .then(data => {
    //             this.setState({
    //             meetings: [...this.state.meetings, data]
    //             // }, console.log(this.state.meetings))
    //         })
    //     }
    // }

    addClubName = () => {
        return(
            <h6>{this.props.club.name}</h6>
        ) 
    }

    listMeetings = () => {
        // console.log(this.props.meetings)
        return this.props.meetings.map(meeting =>
        <ListGroup.Item action href="#link1" className="meeting-list-item">{meeting.title} | {meeting.date}, {meeting.time}</ListGroup.Item>)
    }

    render() {
        return(
            <React.Fragment>
                <div style={{"marginLeft": "20px", "marginRight": "20px"}}>
                    {/* <h2>Meeting</h2> */}
                    <br />
                    <ul>
                        {this.addClubName()}
                        {this.listMeetings()}
                    </ul>
                    {/* <ListGroup> */}
                        {/* <ListGroup.Item action href="#link1" className="meeting-list-item" > */}
                        {/* map over meetings and put ListGroup.Item inside of listMeetings fnc */}
                        {/* </ListGroup.Item> */}
                        {/* {this.getMeetings()} */}
                    {/* </ListGroup> */}
                </div>
            </React.Fragment>
        )
    }
}

export default DashboardMeeting