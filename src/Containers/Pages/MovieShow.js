import React from 'react'
import moment from 'moment'
import { Modal, Button } from 'react-bootstrap'
import AddMovieToClub from '../../Components/Forms/AddMovieToClub'
import RecommendationsContainer from '../RecommendationsContainer'
import MediaQuery from 'react-responsive'

import PersonContainer from '../PersonContiner'

class MovieShow extends React.Component {

    state = {
        movie: null,
        genres: [],
        modalOpen: false,
        watchlistClick: false,
        cast: null,
        crew: null
    }

    configGenres = () => {
        let genreNames = this.state.genres.map(genre => genre.name)
        return genreNames.join(', ')
    }

    configRuntime = () => {
        let time = this.state.movie.runtime / 60
        let time_formatted = moment().startOf('day').add(parseFloat(time), "hours").format("h:mm");
        return time_formatted
    }

    componentDidMount() {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({tmdb_id: this.props.id})
        }
        // fetch("https://le-cine-backend.herokuapp.com/api/v1/details", options);
        fetch("http://localhost:3000/api/v1/details", options)
        .then((res) => res.json())
        .then((movie) => {
            console.log(movie)
            this.setState({
                movie: movie,
                genres: movie.genres,
                cast: movie.cast,
                crew: movie.crew
            });
          });
    }

    clubWatchlistHandler = (e) => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    watchlistHandler = (e) => {
        this.setState({
            watchlistClick: !this.state.watchlistClick
        })
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(this.state.movie)
        }
        fetch("https://le-cine-backend.herokuapp.com/api/v1/movies", options)
          .then((res) => res.json())
          .then((data) => {
            this.props.watchlistHandler(data);
          });
    }

    addToClubWatchlist = (clubId) => {
        let club = parseInt(clubId)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(this.state.movie)
        }
        fetch("https://le-cine-backend.herokuapp.com/api/v1/movies", options)
          .then((res) => res.json())
          .then((data) => {
            this.props.addToClub(club, data.movie.id);
            this.setState({
              modalOpen: false,
            });
          });
    }

    render() {
        return(
            <React.Fragment>
            {this.state.movie ?
                <React.Fragment>
                <MediaQuery maxWidth={999}>
                    <div style={{"textAlign": "center"}}>
                        <img src={"https://image.tmdb.org/t/p/w500" + this.state.movie.poster_path} alt={this.state.movie.title} style={{"height": "400px"}} />
                    </div>
                    <div>
                        <div className="mov-immediate" style={{"marginLeft": "30px"}}>
                            <h1>{this.state.movie.title} {moment(this.state.movie.release_date).format('YYYY')}</h1>
                            <h3>{this.configGenres()} | Runtime: {this.configRuntime()}</h3>
                            <br />
                            <p style={{"fontSize":"1.25rem"}}>{this.state.movie.overview}</p>
                                    {this.props.user ?
                                        this.state.watchlistClick || this.props.user.movies.some(movie => movie.mov_id === this.state.movie.id) ? <button className="already-added" style={{ "marginLeft": "20px" }} disabled={true}>Added!</button> : <button onClick={this.watchlistHandler} className="read-more-btn" style={{ "marginLeft": "20px" }}>Add to Watchlist</button>
                                        : null}
                            <br />
                            <br />
                                    {this.props.user ? 
                            <button onClick={this.clubWatchlistHandler} className="read-more-btn" style={{"marginLeft": "20px"}}>Add to a Club Watchlist</button>
                            : null
                            }
                        </div>
                    </div>
                    {this.state.movie.trailer ? 
                    <section style={{"paddingTop": "20px", "marginLeft": "30px"}}>
                        <h1>Trailer</h1>
                        <div>
                            <iframe title={this.state.movie.title} width="90%" src={"https://www.youtube.com/embed/" + this.state.movie.trailer.key} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </section>
                    :
                    <section>
                    </section>
                    }
                    {this.state.movie.trailer ?
                    <section style={{"paddingTop": "20px", "marginLeft": "30px"}}>
                        <h1>Cast</h1>
                        Film Cast Coming Soon
                    </section>
                    :
                    <section style={{"paddingTop": "20px", "marginLeft": "30px"}}>
                        <h1>Cast</h1>
                        Film Cast Coming Soon
                    </section>
                    }
                    <section style={{"paddingTop": "20px", "marginLeft": "30px", "marginRight": "30px"}}>
                        <h1>Recommendations</h1>
                        <RecommendationsContainer user={this.props.user} movies={this.state.movie.recommendations} />
                    </section>
                    <>
                    <Modal show={this.state.modalOpen === true} close={this.state.modalOpen === false} >
                        <Modal.Header closeButton onClick={this.clubWatchlistHandler}>
                            <Modal.Title>Add To Your Club Watchlist</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <p style={{"textAlign": "center"}}>Woohoo, you're adding a movie to club's watchlist!</p>
                        <p>You chose: <strong>{this.state.movie.title}, {moment(this.state.movie.release_date).format("YYYY")}</strong></p>
                            <AddMovieToClub clubWatchlistSubmit={this.addToClubWatchlist} user={this.props.user} movie={this.state.movie} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.clubWatchlistHandler}>
                            Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    </>
                </MediaQuery>
                <MediaQuery minWidth={1000}>
                    <img className="movie-backdrop" src={"https://image.tmdb.org/t/p/original" + this.state.movie.backdrop_path} alt={this.state.movie.title} style={{"height":"600px", "width": "1440px", "opacity":"0.5", "position": "relative", "top": "0", "left": "0"}} />
                        <img src={"https://image.tmdb.org/t/p/w500" + this.state.movie.poster_path} alt={this.state.movie.title} style={{"height": "400px", "position": "absolute", "top":"400px", "left": "100px"}} />
                    <div style={{"marginLeft": "30%", "marginTop": "50px", "marginRight": "50px", "position":"absolute"}}>
                        <div className="mov-immediate" style={{"marginLeft": "50px"}}>
                            <h1>{this.state.movie.title} {moment(this.state.movie.release_date).format('YYYY')}</h1>
                            <h3>{this.configGenres()} | Runtime: {this.configRuntime()}</h3>
                            <br />
                            <p>{this.state.movie.overview}</p>
                            {/* <button onClick={this.watchlistHandler} className="read-more-btn">Add to Watchlist</button> */}
                                    {this.props.user ?
                                        this.state.watchlistClick || this.props.user.movies.some(movie => movie.mov_id === this.state.movie.id) ? <button className="already-added" style={{ "marginLeft": "20px" }} disabled={true}>Added!</button> : <button onClick={this.watchlistHandler} className="read-more-btn" style={{ "marginLeft": "20px" }}>Add to Watchlist</button> : null}
                            {this.props.user ?
                            <button onClick={this.clubWatchlistHandler} className="read-more-btn" style={{"marginLeft": "20px"}}>Add to a Club Watchlist</button>
                            : null}
                        </div>
                    </div>
                    {this.state.movie.trailer ? 
                    <section style={{"marginTop": "400px", "marginLeft": "50px", "marginRight": "50px",}}>
                        <h1>Trailer</h1>
                        <iframe title={this.state.movie.title} width="560" height="315" src={"https://www.youtube.com/embed/" + this.state.movie.trailer.key} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </section>
                    :
                    <section style={{"marginTop": "400px", "marginLeft": "50px", "marginRight": "50px",}}>
                    </section>
                    }
                    {this.state.movie.trailer ?
                    <section style={{"marginTop": "100px", "marginLeft": "50px", "marginRight": "50px",}}>
                        <h1>Cast</h1>
                        <PersonContainer people={this.state.cast}/>
                        {/* Film Cast Coming Soon */}
                    </section>
                    :
                    <section style={{"marginTop": "400px", "marginLeft": "50px", "marginRight": "50px",}}>
                        <h1>Cast</h1>
                        <PersonContainer people={this.state.cast}/>
                        {/* Film Cast Coming Soon */}
                    </section>
                    }
                    <section style={{"marginTop": "100px", "marginLeft": "50px", "marginRight": "50px", "paddingBottom": "20px"}}>
                        <h1>Recommendations</h1>
                        <RecommendationsContainer user={this.props.user} movies={this.state.movie.recommendations} />
                    </section>
                    <>
                    <Modal show={this.state.modalOpen === true} close={this.state.modalOpen === false} >
                        <Modal.Header closeButton onClick={this.clubWatchlistHandler}>
                            <Modal.Title>Add To Your Club Watchlist</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <p style={{"textAlign": "center"}}>Woohoo, you're adding a movie to club's watchlist!</p>
                        <p>You chose: <strong>{this.state.movie.title}, {moment(this.state.movie.release_date).format("YYYY")}</strong></p>
                            <AddMovieToClub clubWatchlistSubmit={this.addToClubWatchlist} user={this.props.user} movie={this.state.movie} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.clubWatchlistHandler}>
                            Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    </>
                    </MediaQuery>
                </React.Fragment>
            :
            null
            }
            </React.Fragment>
        )
    }
}

export default MovieShow