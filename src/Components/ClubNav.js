import React from 'react'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'

class ClubNav extends React.Component {

    state = {
        showMenu: false
    }

    showMenuHandler = () => {
        this.setState({ showMenu: !this.state.showMenu})
    }

    render(){
        return(
            <React.Fragment>
            <MediaQuery maxWidth={999}>
            <div style={{"marginLeft":"20px", "marginRight":"20px"}}>
                <button className="read-more-btn" onClick={this.showMenuHandler}>Show Club Menu</button>
            </div>
            {this.state.showMenu ?
                <div style={{"backgroundColor": "#EFEFEF", "width": "100%", "textAlign": "center", "paddingTop": "40px", "paddingBottom": "40px", "marginTop": "50px"}}>
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
                : null }
            </MediaQuery>
            <MediaQuery minWidth={1000}>
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
                </MediaQuery>
            </React.Fragment>
        )
    }
    }

export default ClubNav