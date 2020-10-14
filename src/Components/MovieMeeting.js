import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

class MovieMeeting extends React.Component {

    render(){
        console.log(this.props)
        return(
            <React.Fragment>
            {this.props.movieMeeting ?
            <React.Fragment>
            <div style={{"paddingLeft": "20px","backgroundColor": "#EFEFEF", "width": "50%", "textAlign": "left", "paddingTop": "20px", "paddingBottom": "20px", "paddingRight":"20px"}}>
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
                    <div style={{"margin": "auto", "width": "100%", "paddingBottom": "20px", "paddingTop":"45px"}}>
                        <img src={this.props.movieMeeting.movie.poster_path} alt={this.props.movieMeeting.movie.title} style={{"height":"250px","float":"left", "marginRight": "10px", "marginBottom": "5px", "padding": "2px"}}/>
                        <div style={{"marginLeft":"200px", "width":"100%", "top":"200px"}}>
                        {this.props.movieMeeting.movie.overview}
                        <p>
                        <strong>{moment(this.props.movieMeeting.movie.release_date).format("MMM Do YYYY")}</strong>
                        </p>
                        <br />
                        <Link to={"/movies/search/" + this.props.movieMeeting.movie.mov_id}>
                            <button className="read-more-btn">View Details</button>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            </React.Fragment>
            :
            null
            }
            </React.Fragment>
        )
    }
}

export default MovieMeeting