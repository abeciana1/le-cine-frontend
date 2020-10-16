import React from 'react';
import WatchlistMovieCard from '../../Components/WatchlistMovieCard'
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap'

class UserWatchlist extends React.Component {

    // state = {
    //     movies: []
    // }

    deleteHandler = (id) => {
        this.props.deleteHandler(id)
    }

    getMovies = () => {
        // return this.props.movies.map(movie => <WatchlistMovieCard key={movie.id} movie={movie} movId={this.props.movId} deleteHandler={this.deleteHandler}/>)
        return this.props.movies.map(movie => <WatchlistMovieCard key={movie.id} movie={movie} movId={this.props.movId} deleteHandler={this.deleteHandler}/>)
    }

    render() {
        console.log(this.state)
        return(            
            <React.Fragment>
                <div className="page-normal-margin">
                    <h1>Your Watchlist</h1>
                    <br />
                    <Link to="/movies/search">
                        <button className="read-more-btn">Add Movies To Your Watchlist</button>
                    </Link>
                    {/* {this.props.movies ? this.getWatchlist() : null} */}
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