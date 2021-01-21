import React from 'react'
import { Link } from 'react-router-dom';
import { Alert, Carousel } from 'react-bootstrap'
import MediaQuery from 'react-responsive'

const Home = (props) => {

        return(
            <React.Fragment>
            <MediaQuery maxWidth={999}>
            <div style={{"marginLeft":"20px", "marginRight":"20px"}}>
                {props.user ? 
                    <Alert variant={"success"} style={{"width": "100%"}}>
                    Welcome {props.user.first_name}, you're currently logged in!
                    </Alert>
                :
                null
                }
                <div className="home-page-heading" style={{"color": "#FF3900", "width": "100%"}}>
                    <h1>Diving into a world of cinema</h1>
                    {/* <h1>Anyone can join or create a film club!</h1> */}
                    <h1>Join the Pandemic Film Club</h1>
                </div>
                <div className="home-page-textbody" style={{"width": "100%"}}>
                    Join the fun every week with 2 films! A discussion film where we feel the feels together and analyze the heck out of it. A watch-along film where we can sit back, relax, and enjoy. Drink up and smoke 'em if you got 'em!
                </div>
                <br />
                <Link to="/about">
                <button className="read-more-btn">Learn More</button>
                </Link>
                {/* <div className="image-container">
                    <div className="home-image" style={{"width":"100%", "paddingTop":"5px"}}>
                        <img className="bauhaus-dance" src={process.env.PUBLIC_URL + "/images/bauhaus-dance.png"} alt="Bauhaus Dance" style={{"height":"125px"}}/>
                        <h1 style={{"color": "#FF3900", "fontSize":"2rem"}}>Read. Watch. Join.</h1>
                    </div>
                </div> */}
                <div className="join" >
                    <h1  style={{"paddingTop": "5%","textAlign": "center"}}>Signup to start your own club!</h1>
                    <div style={{"paddingBottom": "120px", "margin":"auto"}} >
                        <div style={{"textAlign":"center"}}>
                            <img style={{"marginBottom": "5px","height": "200px"}} src={process.env.PUBLIC_URL + "/images/film-reel.png"} className="giphy-embed" alt="film reel countdown"/>
                        </div>

                        {/* <div className="start-club" style={{"fontSize":"1rem"}} >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                        </div>
                        <br />
                        <br /> */}
                        {/* <Link to="/signup"> */}
                        <Link to="/pandemic-film-club">
                            <button className="read-more-btn">Signup Now</button>
                        </Link>
                    </div>
                </div>
            </div>
            </MediaQuery>
            <MediaQuery minWidth={1000}>
            <div className="page-normal-margin">
                {props.user ? 
                    <Alert variant={"success"} style={{"width": "50%"}}>
                    Welcome {props.user.first_name}, you're currently logged in!
                    </Alert>
                :
                null}
                <div className="home-page-heading" style={{"color": "#FF3900", "width": "50%"}}>
                    <h1>Diving into a world of cinema</h1>
                    {/* <h1>Anyone can join or create a film club!</h1> */}
                    <h1>Join the Pandemic Film Club</h1>
                </div>
                <div className="home-page-textbody" style={{"width": "50%"}}>
                    Join the fun every week with 2 films! A discussion film where we feel the feels together and analyze the heck out of it. A watch-along film where we can sit back, relax, and enjoy. Drink up and smoke 'em if you got 'em!
                </div>
                <br />
                <Link to="/about">
                <button className="read-more-btn">Learn More</button>
                </Link>
                {/* <div className="image-container">
                    <div className="home-image">
                        <img className="bauhaus-dance" src={process.env.PUBLIC_URL + "/images/bauhaus-dance.png"} alt="Bauhaus Dance"/>
                        <h1 style={{"color": "#FF3900", "fontSize":"300%"}}>Read. Watch. Join.</h1>
                    </div>
                </div> */}
                <div className="join" >
                    <h1  style={{"paddingTop": "5%","textAlign": "center"}}>Signup to start your own club!</h1>
                    <div style={{"margin": "auto", "width": "60%", "paddingBottom": "120px"}} >
                        {/* <img style={{"float":"left", "marginRight": "10px", "marginBottom": "5px", "padding": "2px"}} src={process.env.PUBLIC_URL + "/images/film-reel.png"} className="giphy-embed" alt="film reel countdown"/> */}
                        <img style={{"float":"left", "marginRight": "10px", "marginBottom": "5px", "padding": "2px"}} src={process.env.PUBLIC_URL + "/images/film-reel.png"} className="giphy-embed" alt="film reel countdown"/>
                        {/* <div className="start-club" style={{"width": "50%"}} >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                        </div>
                        <br />
                        <br /> */}
                                {/* <Link to="/signup"> */}
                    <Carousel>
                        <img style={{"marginLeft": "10px"}} src={process.env.PUBLIC_URL + "/images/film-reel.png"} className="giphy-embed" alt="film reel countdown"/>
                        <img style={{"marginLeft": "10px"}} src={process.env.PUBLIC_URL + "/images/film-reel.png"} className="giphy-embed" alt="film reel countdown"/>
                        <img style={{"marginLeft": "10px"}} src={process.env.PUBLIC_URL + "/images/film-reel.png"} className="giphy-embed" alt="film reel countdown"/>
                    </Carousel>
                    <br />
                    <br />
                        <Link to="/pandemic-film-club">
                            <button className="read-more-btn">Signup Now</button>
                        </Link>
                    </div>
                </div>
            </div>
            </MediaQuery>
            </React.Fragment>
        )
}

export default Home