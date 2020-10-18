import React from 'react'
import ClubManagementCard from '../../Components/ClubManagementCard'
import { Alert } from 'react-bootstrap'

class ClubsManage extends React.Component {

    state = {
        alertShow: false
    }

    getClubs = () => {
        return this.props.userClubs.map(userClub => <ClubManagementCard key={userClub.id} user={this.props.user} leaveClubHandler={this.leaveClubHandler} userClubId={userClub.id} clubId={userClub.club_id} />)
    }

    leaveClubHandler = (userClubId) => {
        this.props.deleteUserFromClub(userClubId)
        this.renderAlert()
    }

    renderAlert = () => {
        this.setState({
            alertShow: true
        })
    }

    render() {
        return(
            <React.Fragment>
            {this.props.clubs ? 
                <React.Fragment>
                    <div className="page-normal-margin">
                        <h1>Manage My Memberships</h1>
                    {this.state.alertShow ? 
                    <Alert variant="success" style={{"textAlign":"center", "width":"60%", "marginLeft":"auto", "marginRight":"auto", "zIndex":"2"}}>Your club membership has been canceled!</Alert>
                    :
                    null
                    }
                        {this.props.clubs.length > 0 ?
                            <div className="index-container">
                                {this.getClubs()}
                            </div>
                            :
                            <div className="index-container" style={{"textAlign": "center"}}>
                                <h2>Sorry, you are not a member of any clubs!</h2>
                            </div>
                        }
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