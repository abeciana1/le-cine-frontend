import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom';

class MovieSearchCard extends React.Component {

    // checkPosterImage = () => {
    //     if(this.props.movie.poster_path){
    //         return <img src={"https://image.tmdb.org/t/p/w500" + this.props.movie.poster_path} alt={this.props.movie.title} style={{"height": "200px"}} />
    //     } else {
    //         return <img src={"https://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png"} alt={this.props.movie.title} style={{"height": "200px"}} />
    //     }
    // }

    trimOverview = () => {
        let string = this.props.movie.overview
        let length = 110
        let trimmedString = string.substring(0, length) + "..."
        return trimmedString
    }

    movieShow = (e) => {
        this.props.movieShow(this.props.movie.id)
    }


    render(){
        return(
            <React.Fragment>
            {this.props.movie ? 
                <React.Fragment>
                    <div style={{"marginLeft": "20px", "marginRight": "20px", "border": "2px solid black", "borderRadius": "30px"}}>
                        <div style={{"marginLeft": "30px", "marginTop": "20px"}}>
                        {/* {this.checkPosterImage()} */}
                        {this.props.movie.poster_path ? <img src={"https://image.tmdb.org/t/p/w500" + this.props.movie.poster_path} alt={this.props.movie.title} style={{"height": "200px", "float": "left", "paddingRight": "20px"}} /> : <img src={"https://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png"} alt={this.props.movie.title} style={{"height": "200px", "float": "left"}} />}
                            <div>
                                <h3>{this.props.movie.title}</h3>
                                <span style={{"color":"gray"}}>{moment(this.props.movie.release_date).format("MMM Do YYYY")}</span>
                                <br />
                                <p>{this.trimOverview()}</p>
                                <Link to={"/movies/search/" + this.props.movie.id}>
                                    <button className="read-more-btn">View More</button>
                                    {/* <button onClick={this.movieShow} className="read-more-btn">View More</button> */}
                                </Link>
                                {/* <br /> */}
                                <button className="read-more-btn" style={{"marginLeft":"20px"}}>Add to Watchlist</button>
                            </div>
                        </div>
                    <br />
                    <br />
                    <br />
                    </div>
                    <br />
                </React.Fragment>
            :
            <h1>Loading...</h1>
            }
            </React.Fragment>
        )
    }
}

export default MovieSearchCard