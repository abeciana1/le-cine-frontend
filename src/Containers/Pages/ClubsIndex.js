import React from 'react'
import ClubComponent from '../../Components/ClubComponent'
import { Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';

class ClubsIndex extends React.Component {

    state = {
        publicClubs: []
    }

    componentDidMount = () => {
        fetch("https://le-cine-backend.herokuapp.com/api/v1/clubs")
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            let notPrivate = data.filter((club) => club.privacy === false);
            this.setState({
              publicClubs: notPrivate,
            });
          });
    };

    getClubs = () => {
        return this.state.publicClubs.map(club => <ClubComponent key={club.id} club={club} clubId={club.id}/>)
    }

    render(){
        return(
            <React.Fragment>
            {this.props.user ? 
                <div className="page-normal-margin">
                    <h1 style={{"fontSize":"3em"}}>Find A Club</h1>
                    <h2>Here's a list of public clubs to join</h2>
                    <br />
                    <br />
                    <Row>
                        {this.getClubs()}
                    </Row>
                    <br />
                    <br />
                    <div style={{"textAlign": "center"}}>
                        <h2>... OR ...</h2>
                        <h2>Create Your Own</h2>
                        <button className="read-more-btn">Create A Club</button>
                    </div>
                    <Link to="clubs/create">
                        <div style={{"paddingTop": "100px"}}></div>
                    </Link>
                </div>
                :
                null
            }
            </React.Fragment>
        )
    }
}

export default ClubsIndex