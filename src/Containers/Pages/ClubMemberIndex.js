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
                <div style={{"marginLeft": "50px", "marginTop": "50px", "marginRight": "100px", "position": "relative", "left":"220px", "top": "50px", "width": "70%"}}>
                    <h1>Club Member index</h1>
                    <br />
                    <div style={{"backgroundColor": "#EFEFEF", "width": "80%", "paddingTop":"30px", "paddingBottom": "30px", "marginTop":"50px"}}>
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