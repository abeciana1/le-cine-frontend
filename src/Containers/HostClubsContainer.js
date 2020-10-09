import React from 'react'
import { Row } from 'react-bootstrap'
import ClubComponent from '../Components/ClubComponent'

class HostClubsContainer extends React.Component {

    state = {
        clubs: []
    }

    componentDidMount() {
        fetch("http://localhost:3000/api/v1/users/" + this.props.user.id)
        .then(res => res.json())
        .then(user => {
            this.setState({clubs: user.host_clubs})
        })
    }

    getMyClubs = () => {
        return this.state.clubs.slice(0,5).map(club => <ClubComponent key={club.id} club={club}/>)
    }

    render() {
        return (
            <React.Fragment>
                <div style={{"zIndex": "3", "backgroundColor": "#EFEFEF", "width": "60%", "paddingTop": "30px", "paddingBottom": "30px"}}>
                    <div style={{"marginLeft" : "20px",}}>
                        <h1>My Hosted Clubs</h1>
                        <Row>
                            {this.getMyClubs()}
                        </Row>
                        {this.state.clubs.count > 4 ? <button className="read-more-btn">View All</button> : null }
                        {this.state.clubs.count > 4 ? <button className="read-more-btn" style={{"marginLeft": "20px"}}>Find a Club</button> : <button className="read-more-btn">Create a Club</button>}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HostClubsContainer