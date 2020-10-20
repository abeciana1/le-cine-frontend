import React from 'react'
import { Row, Modal, Button } from 'react-bootstrap'
import ClubComponent from '../Components/ClubComponent'
import CreateClub from '../Components/Forms/CreateClub'
import { Link } from 'react-router-dom'

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
        this.setState({clubs: this.props.clubs})
    }

    getMyClubs = () => {
        return this.state.clubs.slice(0,4).map(hostClub => <ClubComponent key={hostClub.id} hostClub={hostClub} clubId={hostClub.id}/>)
    }

    createClubHandler = (clubObj) => {
        this.setState({modalOpen: false})
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
            let newArray = [...this.state.clubs, data.club]
            this.setState({clubs: newArray})
        })
    }

    render() {
        return (
            <React.Fragment>
                <div style={{"zIndex": "3", "backgroundColor": "#EFEFEF", "width": "100%", "paddingTop": "30px", "paddingBottom": "30px"}}>
                    <div style={{"marginLeft" : "20px", "marginRight": "20px"}}>
                        <h1>My Hosted Clubs</h1>
                        <Row>
                            {this.getMyClubs()}
                        </Row>
                        {this.state.clubs.length > 4 ? <Link to="clubs/hosted-all"><button className="read-more-btn">View All</button></Link> : null }
                        {this.state.clubs.length > 4 ? <button className="read-more-btn" style={{"marginLeft": "20px"}} onClick={this.modalHandler}>Create a Club</button> : <button className="read-more-btn" onClick={this.modalHandler}>Create a Club</button>}
                    </div>
                </div>
                <>
                    <Modal show={this.state.modalOpen === true} close={this.state.modalOpen === false} >
                        <Modal.Header closeButton onClick={this.modalHandler}>
                            <Modal.Title>Create Your Own Club</Modal.Title>
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