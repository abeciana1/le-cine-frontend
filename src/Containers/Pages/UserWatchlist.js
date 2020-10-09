import React from 'react';
import MovieCard from '../../Components/MovieSearchCard'

class UserWatchlist extends React.Component {

    getMovies = () => {
        return this.props.movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
    }

    render() {
        return(
            <React.Fragment>
                <div style={{"marginLeft": "50px", "marginTop": "50px", "marginRight": "50px"}}>
                    <h1>Your Watchlist</h1>
                    <button className="read-more-btn"><a href="/movies/search" style={{textDecoration: "none", "color": "#FF3900"}}>Add Movies to your Watchlist</a></button>
                    {this.props.movies ? this.getMovies() : null }
                </div>
            </React.Fragment>
        )
    }
}

export default UserWatchlist