import React from 'react'
import DashboardMeeting from '../Components/DashboardMeeting'

class MyMeetingsContainer extends React.Component {

    state = {
        club: {},
        meetings: []
    }

    componentDidMount() {
        fetch("http://localhost:3000/api/v1/users/" + this.props.user.id)
        .then(res => res.json())
        .then(user => {
            let newArray = [...user.clubs]
            // console.log(newArray)
            this.setState({
                clubs: newArray
            })
            this.getClubMeetings()
        })
    }

    // getClubMeetings = () => {
    //     for (const club of this.state.clubs) {
    //             fetch("http://localhost:3000/api/v1/clubs/" + club.id)
    //             .then(res => res.json())
    //             .then(club => {
    //                 this.setState({
    //                     meetings: club.meetings
    //                 })
    //             })
    //     }
    // }

    getClubMeetings = () => {
        for (const club of this.state.clubs) {
                fetch("http://localhost:3000/api/v1/clubs/" + club.id)
                .then(res => res.json())
                .then(club => {
                    this.setState({
                        club: club,
                        meetings: club.meetings
                    })
                })
        }
    }

    render() {
        console.log(this.state.meetings)
        return(
            <React.Fragment>
                <div style={{"backgroundColor": "#EFEFEF", "width": "100%", "paddingTop": "30px", "paddingBottom": "30px"}}>
                    <h1 style={{"textAlign": "center"}}>Upcoming Club Meetings</h1>
                    {/* {this.getClubMeetings()} */}
                    {/* <DashboardMeeting  meetings={this.state.meetings} /> */}
                    <DashboardMeeting club={this.state.club} meetings={this.state.meetings} />
                </div>
            </React.Fragment>
        )
    }
}

export default MyMeetingsContainer