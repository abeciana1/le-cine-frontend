import React from 'react'

class ClubManagementCard extends React.Component {

    leaveClubHandler = (e) => {
        this.props.leaveClubHandler(this.props.user, this.props.club)
    }

    render() {
        return(
            <React.Fragment>
                <div style={{"marginLeft": "20px", "marginRight": "20px"}}>
                    <div className="card-white">
                        <div style={{"marginLeft": "20px", "marginRight": "20px"}}>
                            <img src={this.props.club.image} style={{"height":"100px", "float":"left", "position":"relative", "paddingRight":"40px"}} alt={this.props.club.name} />
                                <h1>{this.props.club.name}</h1>
                                <button className="read-more-btn" onClick={this.leaveClubHandler}>Leave Club</button>
                        </div>
                    </div>
                    <br />
                </div>
            </React.Fragment>
        )
    }
}

export default ClubManagementCard