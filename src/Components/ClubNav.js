import React from 'react'
import { Nav } from 'react-bootstrap'

class ClubNav extends React.Component {
    render() {
        return(
            <React.Fragment>
                <div style={{"backgroundColor": "#EFEFEF", "width": "15%", "textAlign": "center", "paddingTop": "40px", "paddingBottom": "40px", "marginLeft":"20px", "marginTop": "50px", "position":"absolute"}}>
                    <h3 style={{"color":"#FF3900"}}>{this.props.club.name}</h3>
                    <hr style={{"borderTop": "3px solid black", "borderRadius":"5px", "width": "50%"}}/>
                    <Nav.Link href={"/clubs/" + this.props.club.id} style={{"color":"black"}}><strong>Home</strong></Nav.Link>
                    <Nav.Link href={"/clubs/" + this.props.club.id + "/watchlist"} style={{"color":"black"}}><strong>Watchlist</strong></Nav.Link>
                    <Nav.Link href={"/clubs/" + this.props.club.id + "/member-list"} style={{"color":"black"}}><strong>Member List</strong></Nav.Link>
                    <Nav.Link href={"/clubs/" + this.props.club.id + "/meetings"} style={{"color":"black"}}><strong>Meetings</strong></Nav.Link>

                </div>
            </React.Fragment>
        )
    }
}

export default ClubNav