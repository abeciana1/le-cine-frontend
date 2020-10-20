import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'
import AddMovieToClub from './Forms/AddMovieToClub'

class MovieSearchCard extends React.Component {

    state = {
        modalOpen: false,
        watchlistClick: false
    }

    trimOverview = () => {
        let string = this.props.movie.overview
        let length = 110
        let trimmedString = string.substring(0, length) + "..."
        return trimmedString
    }

    movieShow = (e) => {
        this.props.movieShow(this.props.movie.id)
    }

    watchlistHandler = (e) => {
        this.setState({watchlistClick: !this.state.watchlistClick})
        this.props.watchlistHandler(this.props.movie)
    }

    //! ONLY EVENT HANDLER FOR MODAL
    clubWatchlistHandler = (e) => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    //! CREATES MOVIE OBJECT
    addToClubWatchlist = (clubId) => {
        let club = parseInt(clubId)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(this.props.movie)
        }
        fetch("http://localhost:3000/api/v1/movies", options)
        .then(res => res.json())
        .then(data => {
            this.props.addToClub(club, data.movie.id)
            this.setState({
                modalOpen: false
            })
        })
    }

    render(){
        return(
            <React.Fragment>
            {this.props.movie ? 
                <React.Fragment>
                    <div style={{"marginLeft": "20px", "marginRight": "20px", "border": "2px solid black", "borderRadius": "30px"}}>
                        <div style={{"marginLeft": "30px", "marginTop": "20px"}}>
                        {this.props.movie.poster_path ? <img src={"https://image.tmdb.org/t/p/w500" + this.props.movie.poster_path} alt={this.props.movie.title} style={{"height": "200px", "float": "left", "paddingRight": "20px"}} /> : <img src={"https://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png"} alt={this.props.movie.title} style={{"height": "200px", "float": "left"}} />}
                            <div>
                                <h3>{this.props.movie.title}</h3>
                                <span style={{"color":"gray"}}>{moment(this.props.movie.release_date).format("MMM Do YYYY")}</span>
                                <br />
                                <p>{this.trimOverview()}</p>
                                <Link to={"/movies/search/" + this.props.movie.id}>
                                    <button className="read-more-btn">View More</button>
                                </Link>
                                {/* { <h2>true</h2> : console.log(false)} */}
                                {/* {this.props.user.movies.some(movie => movie.mov_id === this.props.movie.id) ?  <button onClick={this.watchlistHandler} className="read-more-btn" style={{"marginLeft":"20px", "color":"white", "backgroundColor": "#FF3900"}}>Already Added!</button> : <button onClick={this.watchlistHandler} className="read-more-btn" style={{"marginLeft":"20px"}}>Add to Watchlist</button>} */}
                                {/* {this.props.user.movies.some(movie => movie.mov_id === this.props.movie.id) ?  <button className="already-added" style={{"marginLeft":"20px"}} disabled={true}>Already Added!</button> : <button onClick={this.watchlistHandler} className="read-more-btn" style={{"marginLeft":"20px"}}>Add to Watchlist</button>} */}
                                {this.state.watchlistClick || this.props.user.movies.some(movie => movie.mov_id === this.props.movie.id) ?  <button className="already-added" style={{"marginLeft":"20px"}} disabled={true}>Added!</button> : <button onClick={this.watchlistHandler} className="read-more-btn" style={{"marginLeft":"20px"}}>Add to Watchlist</button>}
                                <button onClick={this.clubWatchlistHandler} className="read-more-btn" style={{"marginLeft":"20px"}}>Add to a Club Watchlist</button>
                            </div>
                        </div>
                    <br />
                    <br />
                    <br />
                    </div>
                    <br />
                    <>
                    <Modal show={this.state.modalOpen === true} close={this.state.modalOpen === false} >
                        <Modal.Header closeButton onClick={this.clubWatchlistHandler}>
                            <Modal.Title>Add To Your Club Watchlist</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <p style={{"textAlign": "center"}}>Woohoo, you're adding a movie to club's watchlist!</p>
                        <p>You chose: <strong>{this.props.movie.title}, {moment(this.props.movie.release_date).format("YYYY")}</strong></p>
                        <AddMovieToClub clubWatchlistSubmit={this.addToClubWatchlist} user={this.props.user} movie={this.props.movie} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.clubWatchlistHandler}>
                            Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    </>
                </React.Fragment>
            :
            <h1>Loading...</h1>
            }
            </React.Fragment>
        )
    }
}

export default MovieSearchCard