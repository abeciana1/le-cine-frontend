import React from 'react';
import MovieCard from '../../Components/MovieSearchCard'
import { Link } from 'react-router-dom';

class UserWatchlist extends React.Component {

    getMovies = () => {
        return this.props.movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
    }

    render() {
        return(
            <React.Fragment>
                <div style={{"marginLeft": "50px", "marginTop": "50px", "marginRight": "50px"}}>
                    <h1>Your Watchlist</h1>
                    <Link to="/movies/search">
                        <button className="read-more-btn">Add Movies to your Watchlist</button>
                    </Link>
                    {this.props.movies ? this.getMovies() : null }
                </div>
            </React.Fragment>
        )
    }
}

export default UserWatchlist