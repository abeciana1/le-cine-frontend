import React from 'react'
import DashboardMeeting from '../Components/DashboardMeeting'

class MyMeetingsContainer extends React.Component {

    state = {
        clubs: []
    }

    componentDidMount() {
        this.setState({clubs: this.props.clubs})
    }

    getClubMeetings = () => {
        return this.state.clubs.slice(0, 5).map(userClub => <DashboardMeeting key={userClub.id} userClub={userClub} clubId={userClub.club_id} />)
    }

    render() {
        return(
            <React.Fragment>
                <div style={{"backgroundColor": "#EFEFEF", "width": "100%", "paddingTop": "30px", "paddingBottom": "30px"}}>
                    <h1 style={{"textAlign": "center"}}>Upcoming Club Meetings</h1>
                    {this.getClubMeetings()}
                    <div style={{"marginLeft": "20px", "marginRight": "20px"}}>
                        <button className="read-more-btn">View All Upcoming Meetings</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default MyMeetingsContainer