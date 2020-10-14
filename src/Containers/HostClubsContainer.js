import React from 'react'
import { Row, Modal, Button } from 'react-bootstrap'
import ClubComponent from '../Components/ClubComponent'
import CreateClub from '../Components/Forms/CreateClub'

class HostClubsContainer extends React.Component {

    state = {
        clubs: [],
        modalOpen: false
    }

    modalHandler = (e) => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
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

    createClubHandler = (clubObj) => {
        this.setState({modalOpen: false})
        console.log("club created")
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(clubObj)
        }
        fetch("http://localhost:3000/api/v1/clubs", options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }

    render() {
        return (
            <React.Fragment>
                <div style={{"zIndex": "3", "backgroundColor": "#EFEFEF", "width": "60%", "paddingTop": "30px", "paddingBottom": "30px"}}>
                    <div style={{"marginLeft" : "20px", "marginRight": "20px"}}>
                        <h1>My Hosted Clubs</h1>
                        <Row>
                            {this.getMyClubs()}
                        </Row>
                        {this.state.clubs.count > 4 ? <button className="read-more-btn">View All</button> : null }
                        {this.state.clubs.count > 4 ? <button className="read-more-btn" style={{"marginLeft": "20px"}}>Find a Club</button> : <button className="read-more-btn" onClick={this.modalHandler}>Create a Club</button>}
                    </div>
                </div>
                <>
                    <Modal show={this.state.modalOpen === true} close={this.state.modalOpen === false} >
                        <Modal.Header closeButton onClick={this.modalHandler}>
                            <Modal.Title>Add To Your Club Watchlist</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <p style={{"textAlign": "center"}}>Woohoo, you're creating a new club!</p>
                            <CreateClub createClubHandler={this.createClubHandler} user={this.props.user}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.modalHandler}>
                            Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    </>
            </React.Fragment>
        )
    }
}

export default HostClubsContainer