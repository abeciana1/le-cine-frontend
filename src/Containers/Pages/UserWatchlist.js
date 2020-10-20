import React from 'react';
import WatchlistMovieCard from '../../Components/WatchlistMovieCard'
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap'

class UserWatchlist extends React.Component {

    deleteHandler = (id) => {
        this.props.deleteHandler(id)
    }

    getMovies = () => {
        // let newArray = this.props.userWatchlist
        // newArray.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], [])
        return this.props.userWatchlist.map(watchlist => <WatchlistMovieCard key={watchlist.id} watchlistId={watchlist.id} movieId={watchlist.movie_id} deleteHandler={this.deleteHandler}/>)
    }

    render() {
        return(            
            <React.Fragment>
                <div className="page-normal-margin">
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