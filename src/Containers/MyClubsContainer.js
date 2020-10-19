import React from 'react'
import { Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import ClubComponent from '../Components/ClubComponent'

class MyClubsContainer extends React.Component {

    state = {
        clubs: []
    }

    componentDidMount() {
        this.setState({clubs: this.props.clubs})
    }

    getMyClubs = () => {
        return this.state.clubs.slice(0,5).map(userClub => <ClubComponent key={userClub.id} userClub={userClub} clubId={userClub.club_id} />)
    }

    render() {
        // console.log(this.props)
        console.log(this.state.clubs.length)
        return (
            <React.Fragment>
                <div style={{"zIndex": "3", "backgroundColor": "#EFEFEF", "width": "100%", "paddingTop": "30px", "paddingBottom": "30px"}}>
                    <div style={{"marginLeft" : "20px",}}>
                        <h1>My Clubs</h1>
                        <Row>
                            {this.getMyClubs()}
                        </Row>
                        {this.state.clubs.length > 4 ? <Link to="clubs/all"><button className="read-more-btn">View All</button></Link> : null }
                        {this.state.clubs.length > 4 ? <Link to="/clubs/index"><button className="read-more-btn" style={{"marginLeft": "20px"}}>Find a Club</button></Link> : <Link to="/clubs/index"><button className="read-more-btn">Find a Club</button></Link>}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default MyClubsContainer