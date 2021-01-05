import React from 'react'
import UpdateMeeting from "../../Components/Forms/UpdateMeeting";

class MeetingUpdatePage extends React.Component {

    render() {
        console.log(this.props)
        return (
            <React.Fragment>
                <div style={{"width":"60%"}}>
                    <div style={{"textAlign": "center"}}>
                        <h1>Add A Meeting To Your Club</h1>
                        <br />
                        <h2>Woohoo, you're adding a meeting to this club!</h2>
                    </div>
                    <UpdateMeeting club={this.props.club} submitHandler={this.props.submitHandler} />
                </div>
            </React.Fragment>
        )
    }
}

export default MeetingUpdatePage;