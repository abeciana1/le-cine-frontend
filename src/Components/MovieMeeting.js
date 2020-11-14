import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import MediaQuery from 'react-responsive'

class MovieMeeting extends React.Component {

    removeMovieMeeting = (e) => {
        this.props.removeMovieMeeting(this.props.movieMeeting)
        const options = {method: 'DELETE'}
        fetch("http://localhost:3000/api/v1/movie_meetings/" + this.props.movieMeeting.id, options)
        .then(res => res.json())
    }

    streamingIconHanddler = () => {
        switch(this.props.movieMeeting.source_name){
            case "Netflix":
                return <a href={"https://" + this.props.movieMeeting.source_url}><img src={process.env.PUBLIC_URL + "/images/icons8-netflix-48.png"} alt="Netflix" /></a>
            case "Hulu":
                return <a href={"https://" + this.props.movieMeeting.source_url}><img src={process.env.PUBLIC_URL + "/images/icons8-hulu-48.png"} alt="Hulu"/></a>
            case "Amazon Prime":
                return <a href={"https://" + this.props.movieMeeting.source_url}><img src={process.env.PUBLIC_URL + "/images/icons8-amazon-prime-video-50.png"} alt="Amazon Prime"/></a>
            case "Shudder":
                return <a href={"https://" + this.props.movieMeeting.source_url}><img src={process.env.PUBLIC_URL + "/images/shudder-logo.png"} alt="Shudder" style={{"height":"20px"}} /></a>
            case "Mubi":
                return <a href={"https://" + this.props.movieMeeting.source_url}><img src={process.env.PUBLIC_URL + "/images/MUBI-logo.png"} alt="Mubi" style={{"height":"20px"}}/></a>
            case "Tubi":
                return <a href={"https://" + this.props.movieMeeting.source_url}><img src={process.env.PUBLIC_URL + "/images/1280px-Tubi_logo.svg.png"} alt="Tubi" style={{"height":"20px"}}/></a>
            case "HBOMax":
                return <a href={"https://" + this.props.movieMeeting.source_url}><img src={process.env.PUBLIC_URL + "/images/HBO_Max-Logo.wine.png"} alt="HBOMax" style={{"height":"20px"}}/></a>
            case "Other":
                return <a href={"https://" + this.props.movieMeeting.source_url} style={{"textDecoration": "none","color":"black"}}><img src={process.env.PUBLIC_URL + "/images/noun_TV_3399985.png"} alt="Other" style={{"height":"20px"}}/> Other Source</a>
            default:
                return <h6>Source Not Available</h6>
        }
    }

    render(){
        return(
            <React.Fragment>
            {this.props.movieMeeting ?
            <React.Fragment>
            <MediaQuery maxWidth={999}>
            <div style={{"paddingLeft": "20px", "paddingRight":"20px", "backgroundColor": "#EFEFEF", "width": "100%", "textAlign": "left", "paddingTop": "20px", "paddingBottom": "40px"}}>
                        <h1>{this.props.movieMeeting.movie.title}</h1>
                <div style={{"marginLeft": "20px", "marginTop": "20px", "marginRight": "20px", "width": "100%"}}>
                {this.props.movieMeeting.discussion ? 
                        <React.Fragment>
                            <div style={{"backgroundColor":"white" , "paddingLeft":"10px", "width":"50%"}}>
                                <p style={{"textAlign": "center"}}><b>Discussion</b></p>
                            </div>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <div style={{"backgroundColor":"white", "paddingLeft":"10px", "width":"50%"}}>
                                <p style={{"textAlign":"center"}}><b>Watchalong</b></p>
                            </div>
                        </React.Fragment>
                        }
                {this.props.movieMeeting.discussion && this.props.movieMeeting.watch_along ? 
                    <div style={{"backgroundColor":"white" , "paddingLeft":"10px", "width":"50%"}}>
                        <p style={{"textAlign": "center"}}><b>Discussion</b></p>
                    </div>
                :
                null
                }
                    <div style={{"marginRight": "40px", "width": "100%", "paddingBottom": "40px", "paddingTop":"40px"}}>
                        <img src={this.props.movieMeeting.movie.poster_path} alt={this.props.movieMeeting.movie.title} style={{"height":"250px"}}/>
                        <br />
                        <br />
                        <div>
                        {this.props.movieMeeting.movie.overview}
                        <br />
                        <br />
                        <div>
                            <strong>You can watch <em>{this.props.movieMeeting.movie.title}</em> here:</strong>
                            <br />
                            {this.streamingIconHanddler()}
                        </div>
                        <br />
                        <br />
                        <p>
                        <strong>{moment(this.props.movieMeeting.movie.release_date).format("MMM Do YYYY")}</strong>
                        </p>
                        <br />
                        <Link to={"/movies/search/" + this.props.movieMeeting.movie.mov_id}>
                            <button className="read-more-btn">View Details</button>
                        </Link>
                        <button className="read-more-btn" style={{"marginLeft": "20px"}} onClick={this.removeMovieMeeting}>Remove Movie</button>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            </MediaQuery>
            <MediaQuery minWidth={1000}>
            <div style={{"paddingLeft": "20px","backgroundColor": "#EFEFEF", "width": "75%", "textAlign": "left", "paddingTop": "20px", "paddingBottom": "40px", "paddingRight":"20px"}}>
                        <h1>{this.props.movieMeeting.movie.title}</h1>
                <div style={{"marginLeft": "20px", "marginTop": "20px", "marginRight": "20px", "width": "60%"}}>
                {this.props.movieMeeting.discussion ? 
                        <React.Fragment>
                            <div style={{"backgroundColor":"white" , "paddingLeft":"10px", "width":"50%"}}>
                                <p style={{"textAlign": "center"}}><b>Discussion</b></p>
                            </div>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <div style={{"backgroundColor":"white", "paddingLeft":"10px", "width":"50%"}}>
                                <p style={{"textAlign":"center"}}><b>Watchalong</b></p>
                            </div>
                        </React.Fragment>
                        }
                {this.props.movieMeeting.discussion && this.props.movieMeeting.watch_along ? 
                    <div style={{"backgroundColor":"white" , "paddingLeft":"10px", "width":"50%"}}>
                        <p style={{"textAlign": "center"}}><b>Discussion</b></p>
                    </div>
                :
                null
                }
                    <div style={{"margin": "auto", "width": "100%", "paddingBottom": "40px", "paddingTop":"40px"}}>
                        <img src={this.props.movieMeeting.movie.poster_path} alt={this.props.movieMeeting.movie.title} style={{"height":"250px","float":"left", "marginRight": "10px", "marginBottom": "5px", "padding": "2px"}}/>
                        <div style={{"marginLeft":"200px", "width":"100%", "top":"200px"}}>
                        {this.props.movieMeeting.movie.overview}
                        <br />
                        <br />
                        <div>
                            <strong>You can watch <em>{this.props.movieMeeting.movie.title}</em> here:</strong>
                            <br />
                            {this.streamingIconHanddler()}
                        </div>
                        <br />
                        <br />
                        <p>
                        <strong>{moment(this.props.movieMeeting.movie.release_date).format("MMM Do YYYY")}</strong>
                        </p>
                        <br />
                        <Link to={"/movies/search/" + this.props.movieMeeting.movie.mov_id}>
                            <button className="read-more-btn">View Details</button>
                        </Link>
                        <button className="read-more-btn" style={{"marginLeft": "20px"}} onClick={this.removeMovieMeeting}>Remove Movie</button>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            </MediaQuery>
            </React.Fragment>
            :
            null
            }
            </React.Fragment>
        )
    }
}

export default MovieMeeting