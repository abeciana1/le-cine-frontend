import React from 'react';
import WatchlistMovieCard from '../../Components/WatchlistMovieCard'
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap'

class UserWatchlist extends React.Component {

    getMovies = () => {
        return this.props.movies.map(movie => <WatchlistMovieCard key={movie.id} movie={movie} movId={this.props.movId} deleteHandler={this.props.deleteHandler}/>)
    }

    render() {
        // console.log(this.props)
        return(
            <React.Fragment>
                <div style={{"marginLeft": "50px", "marginTop": "50px", "marginRight": "50px"}}>
                    <h1>Your Watchlist</h1>
                    <br />
                    <Link to="/movies/search">
                        <button className="read-more-btn">Add Movies To Your Watchlist</button>
                    </Link>
                    <br />
                    <br />
                    <Row>
                        {this.props.movies ? this.getMovies() : null }
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}

export default UserWatchlist