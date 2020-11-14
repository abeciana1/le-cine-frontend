import React from 'react';
import WatchlistMovieCard from '../../Components/WatchlistMovieCard'
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap'
import MediaQuery from 'react-responsive'

class UserWatchlist extends React.Component {

    deleteHandler = (id) => {
        this.props.deleteHandler(id)
    }

    getMovies = () => {
        return this.props.userWatchlist.map(watchlist => <WatchlistMovieCard key={watchlist.id} watchlistId={watchlist.id} movieId={watchlist.movie_id} deleteHandler={this.deleteHandler}/>)
    }

    render() {
        return(            
            <React.Fragment>
            <MediaQuery maxWidth={999}>
            <div style={{"marginLeft":"20px", "marginRight":"20px"}}>
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
            </MediaQuery>
            <MediaQuery minWidth={1000}>
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
                </MediaQuery>
            </React.Fragment>
        )
    }
}

export default UserWatchlist