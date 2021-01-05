import React from 'react'
import CreateMeeting from "../../Components/Forms/CreateMeeting";

class MeetingCreationPage extends React.Component {

    render() {
        console.log(this.props)
        return (
            <React.Fragment>
                <div style={{"textAlign": "center"}}>
                    <h1>Add A Meeting To Your Club</h1>
                    <br />
                    <h2>Woohoo, you're adding a meeting to this club!</h2>
                </div>
                <CreateMeeting club={this.props.club} submitHandler={this.props.addMeetingToClub} />
            </React.Fragment>
        )
    }
}

export default MeetingCreationPage