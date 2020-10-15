import React from 'react'
import { Link } from 'react-router-dom'

class ClubNav extends React.Component {
    render() {
        return(
            <React.Fragment>
                <div style={{"backgroundColor": "#EFEFEF", "width": "15%", "textAlign": "center", "paddingTop": "40px", "paddingBottom": "40px", "marginLeft":"20px", "marginTop": "50px", "position":"absolute"}}>
                    <h3 style={{"color":"#FF3900"}}>{this.props.club.name}</h3>
                    <hr style={{"borderTop": "3px solid black", "borderRadius":"5px", "width": "50%"}}/>
                    <Link to={"/clubs/" + this.props.club.id} style={{"color":"black", "textDecoration": "none"}}><strong>Home</strong></Link>
                    <br />
                    <br />
                    <Link to={"/clubs/" + this.props.club.id + "/watchlist" } style={{"color":"black", "textDecoration": "none"}}><strong>Watchlist</strong></Link>
                    <br />
                    <br />
                    <Link to={"/clubs/" + this.props.club.id + "/member-list"} style={{"color":"black", "textDecoration": "none"}}><strong>Member List</strong></Link>
                    <br />
                    <br />
                    <Link to={"/clubs/" + this.props.club.id + "/meetings"} style={{"color":"black", "textDecoration": "none"}}><strong>Meetings</strong></Link>
                </div>
            </React.Fragment>
        )
    }
}

export default ClubNav