import React from 'react'
import DashboardMeeting from '../Components/DashboardMeeting'
import MediaQuery from 'react-responsive'

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
            <MediaQuery maxWidth={999}>
            <div style={{"backgroundColor": "#EFEFEF", "width": "100%", "paddingTop": "30px", "paddingBottom": "30px"}}>
                <div style={{"textAlign": "center"}}>
                    <h3>Upcoming Club Meetings</h3>
                    {this.getClubMeetings()}
                </div>
                    <div style={{"marginLeft": "20px", "marginRight": "20px"}}>
                        {this.state.clubs.length > 5 ? <button className="read-more-btn">View All Upcoming Meetings</button> : null}
                    </div>
                </div>
            </MediaQuery>
            <MediaQuery minWidth={1000}>
                <div style={{"backgroundColor": "#EFEFEF", "width": "100%", "paddingTop": "30px", "paddingBottom": "30px"}}>
                    <h1 style={{"textAlign": "center"}}>Upcoming Club Meetings</h1>
                    {this.getClubMeetings()}
                    <div style={{"marginLeft": "20px", "marginRight": "20px"}}>
                        {this.state.clubs.length > 5 ? <button className="read-more-btn">View All Upcoming Meetings</button> : null}
                    </div>
                </div>
                </MediaQuery>
            </React.Fragment>
        )
    }
}

export default MyMeetingsContainer