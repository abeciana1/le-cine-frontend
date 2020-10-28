import React from 'react'
import ClubNav from '../../Components/ClubNav'
import MemberCard from '../../Components/MemberCard'

class ClubMemberIndex extends React.Component {

    state = {
        club: null,
        userClubs: null,
        members: null,
        emails: []
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/api/v1/clubs/" + this.props.id)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({
                club: data,
                userClubs: data.user_clubs,
                member: data.members
            })
        })
    }

    removeHandler = (id) => {
        let newArray = [...this.state.userClubs]
        let foundUserClub = newArray.find(userClub => userClub.id === id)
        newArray.splice(newArray.indexOf(foundUserClub), 1)
        this.setState({
            userClubs: newArray
        })
        const options = {method: 'DELETE'}
        fetch("http://localhost:3000/api/v1/user_clubs/" + foundUserClub.id, options)
        .then(res => res.json())
    }

    getMembers = () => {
        return this.state.userClubs.map(userClub => <MemberCard key={userClub.id} userClubId={userClub.id} memberId={userClub.user_id} club={this.state.club} user={this.props.user} removeHandler={this.removeHandler} />)
    }

    emailAllHandler = (e) => {
        let emails = this.state.club.users.map(member => member.email)
        this.setState({emails: emails})
        return emails.join(',')
    }

    render() {
        return(
            <React.Fragment>
            {this.state.club && this.props.user ?
            <React.Fragment>
                <ClubNav club={this.state.club} />
                <div className="index-heading">
                    <h1>Club Members</h1>
                    <br />
                    <div className="index-container">
                    <div style={{"textAlign":"center"}}>
                    {this.state.club.host_id === this.props.user.id ?
                        <div style={{"marginLeft": "20px", "marginRight": "20px"}}>
                            <a href={"mailto:" + this.state.emails.join(',')}>
                                <button onClick={this.emailAllHandler} className="read-more-btn">Email All Members</button>
                            </a>
                        </div>
                        : null}
                    </div>
                    <br />
                    <br />
                        {this.getMembers()}
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

export default ClubMemberIndex