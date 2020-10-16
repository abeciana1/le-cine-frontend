import React from 'react'
import ClubNav from '../../Components/ClubNav'
import MemberCard from '../../Components/MemberCard'

class ClubMemberIndex extends React.Component {

    state = {
        club: null,
        members: null
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/api/v1/clubs/" + this.props.id)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({
                club: data,
                members: data.users
            })
        })
    }

    getMembers = () => {
        return this.state.members.map(member => <MemberCard key={member.id} member={member} club={this.state.club} user={this.props.user} />)
    }

    render() {
        return(
            <React.Fragment>
            {this.state.club ?
            <React.Fragment>
                <ClubNav club={this.state.club} />
                <div className="index-heading">
                    <h1>Club Members</h1>
                    <br />
                    <div className="index-container">
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