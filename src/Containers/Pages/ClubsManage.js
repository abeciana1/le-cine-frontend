import React from 'react'
import ClubManagementCard from '../../Components/ClubManagementCard'

class ClubsManage extends React.Component {

    componentDidMount = () => {
        this.setState({
            clubs: this.props.clubs
        })
    };
    

    getClubs = () => {
        if(this.props.user.clubs.length > 0){
            return this.props.user.clubs.map(club => <ClubManagementCard key={club.id} user={this.props.user} leaveClubHandler={this.leaveClubHandler} club={club} />)
        } else {
            return <h2 style={{"textAlign": "center"}}>Sorry you are not a member of any clubs!</h2>
        }
    }

    leaveClubHandler = (userObj, clubObj) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                user_id: userObj.id,
                club_id: clubObj.id
            })
        }
        fetch("http://localhost:3000/api/v1/find-club", options)
        .then(res => res.json())
        .then(data => {
            this.deleteUserClub(data.id)
        })
    }

    deleteUserClub = (id) => {
        const options = {method: 'DELETE'}
        fetch("http://localhost:3000/api/v1/user_clubs/" + id, options)
        .then(res => res.json())
        window.location.reload(false)
    }

    render() {
        return(
            <React.Fragment>
            {this.props.user ? 
                <React.Fragment>
                    <div style={{"marginLeft": "50px", "marginTop": "50px", "marginRight": "50px"}}>
                        <h1>Manage My Clubs</h1>
                        <div style={{"backgroundColor": "#EFEFEF", "width": "80%", "paddingTop":"30px", "paddingBottom": "30px", "marginTop":"50px"}}>
                            <h2 style={{"textAlign":"center"}}>Your Clubs</h2>
                            {this.getClubs()}
                            {/* {this.state.clubs ? null : this.getClubs()} */}
                            {/* {this.state.upcomingMeetings ? <UpcomingMeetings meetings={this.state.upcomingMeetings}/> : null} */}
                        </div>
                    </div>
                </React.Fragment>
            :
            null
            }
            </React.Fragment>
        )
    }
}

export default ClubsManage