import React from 'react'
// import { Alert } from 'react-bootstrap'

class ClubManagementCard extends React.Component {

    state = {
        club: null
    }

    componentDidMount() {
        fetch(
          "https://le-cine-backend.herokuapp.com/api/v1/clubs/" +
            this.props.clubId
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            this.setState({
              club: data,
            });
          });
    }

    leaveClubHandler = (e) => {
        this.props.leaveClubHandler(this.props.userClubId)
    }



    render() {
        return(
            <React.Fragment>
            {this.state.club ?
            <React.Fragment>
                <div style={{"marginLeft": "20px", "marginRight": "20px"}}>
                    <div style={{"backgroundColor":"white", "paddingTop":"20px", "paddingBottom":"20px"}}>
                        <div style={{"marginLeft": "20px", "marginRight": "20px"}}>
                            <img src={this.state.club.image} style={{"height":"100px", "paddingRight":"40px"}} alt={this.state.club.name} />
                                <h1 style={{"fontSize":"2em"}}>{this.state.club.name}</h1>
                                <button className="read-more-btn" onClick={this.leaveClubHandler}>Leave Club</button>
                        </div>
                    </div>
                    <br />
                </div>
            </React.Fragment>
            :
            null
            }
            </React.Fragment>
        )
    }
}

export default ClubManagementCard