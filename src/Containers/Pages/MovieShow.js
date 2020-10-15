import React from 'react'
import moment from 'moment'
import RecommendationsContainer from '../RecommendationsContainer'

class MovieShow extends React.Component {

    state = {
        movie: null,
        genres: []
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
        fetch("http://localhost:3000/api/v1/details", options)
        .then(res => res.json())
        .then(movie => {
            this.setState({
                movie: movie,
                genres: movie.genres
            })
        })
    }

    watchlistHandler = (e) => {
        this.props.watchlistHandler(this.state.movie)
    }

    render() {
        return(
            <React.Fragment>
            {this.state.movie ?
                <React.Fragment>
                    <img className="movie-backdrop" src={"https://image.tmdb.org/t/p/original/" + this.state.movie.backdrop_path} alt={this.state.movie.title} style={{"height":"600px", "width": "1440px", "opacity":"0.5", "position": "relative", "top": "0", "left": "0"}} />
                        <img src={"https://image.tmdb.org/t/p/w500" + this.state.movie.poster_path} alt={this.state.movie.title} style={{"height": "400px", "position": "absolute", "top":"400px", "left": "100px"}} />
                    <div style={{"marginLeft": "30%", "marginTop": "50px", "marginRight": "50px", "position":"absolute"}}>
                        <div className="mov-immediate" style={{"marginLeft": "50px"}}>
                            <h1>{this.state.movie.title} {moment(this.state.movie.release_date).format('YYYY')}</h1>
                            <h3>{this.configGenres()} | Runtime: {this.configRuntime()}</h3>
                            <br />
                            <p>{this.state.movie.overview}</p>
                            <button onClick={this.watchlistHandler} className="read-more-btn">Add to Watchlist</button>
                            <button className="read-more-btn" style={{"marginLeft": "20px"}}>Add to a Club Watchlist</button>
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
                        CAST CONTAINER HERE -- STRETCH
                    </section>
                    :
                    <section style={{"marginTop": "400px", "marginLeft": "50px", "marginRight": "50px",}}>
                        <h1>Cast</h1>
                        CAST CONTAINER HERE -- STRETCH
                    </section>
                    }
                    <section style={{"marginTop": "100px", "marginLeft": "50px", "marginRight": "50px", "paddingBottom": "20px"}}>
                        <h1>Recommendations</h1>
                        <RecommendationsContainer user={this.props.user} movies={this.state.movie.recommendations} />
                    </section>
                </React.Fragment>
            :
            null
            }
            </React.Fragment>
        )
    }
}

export default MovieShow