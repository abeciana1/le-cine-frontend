import React from 'react'
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap'


class Home extends React.Component {

    render(){
        return(
            <React.Fragment>
            <div style={{"marginLeft": "50px", "marginTop": "50px", "marginRight": "50px"}}>
                {this.props.user ? 
                    <Alert variant={"success"} style={{"width": "50%"}}>
                    Welcome {this.props.user.first_name}, you're currently logged in!
                    </Alert>
                :
                null
                }
                <div className="home-page-heading" style={{"color": "#FF3900", "width": "50%"}}>
                    <h1>Diving into a world of cinema
                    Anyone can join or create a film 
                    club!</h1>
                </div>
                <div className="home-page-textbody" style={{"width": "50%"}}>
                    Come gather ‘round people, wherever you roam. And admit that the 
                    waters around you have grown. And accept it that soon you’ll be drenched 
                    to the bone. If your time to you is worth saving. Then you better start 
                    swimmin’ or you’ll sink like a stone. For the times, they are a-changin’.
                </div>
                <br />
                <Link to="/about">
                <button className="read-more-btn">Read More</button>
                </Link>
                <div className="image-container">
                    <div className="home-image">
                        <img className="bauhaus-dance" src={process.env.PUBLIC_URL + "/images/bauhaus-dance.png"} alt="Bauhaus Dance"/>
                        <h1 style={{"color": "#FF3900", "fontSize": "70px"}}>Read. Watch. Join.</h1>
                    </div>
                </div>
                <div className="join" >
                    <h1  style={{"paddingTop": "5%", "fontSize": "70px", "textAlign": "center"}}>Signup to start your own club!</h1>
                    <div style={{"margin": "auto", "width": "60%", "paddingBottom": "120px"}} >
                        <img style={{"float":"left", "marginRight": "10px", "marginBottom": "5px", "padding": "2px"}} src={process.env.PUBLIC_URL + "/images/film-reel.png"} className="giphy-embed" alt="film reel countdown"/>
                        <div className="start-club" style={{"width": "50%"}} >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                        <br />
                        <br />
                        <Link to="/signup">
                            <button className="read-more-btn">Signup Now</button>
                        </Link>
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default Home