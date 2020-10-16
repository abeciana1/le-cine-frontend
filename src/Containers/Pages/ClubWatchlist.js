import React from 'react'
import ClubMovieCard from '../../Components/ClubMovieCard'
import ClubNav from '../../Components/ClubNav'
import { Link, withRouter } from 'react-router-dom';
import { Row } from 'react-bootstrap'

class ClubWatchlist extends React.Component {

    state = {
        club: null,
        clubWatchlist: [], 
        movies: null
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/api/v1/clubs/" + this.props.id)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            this.setState({
                club: data,
                clubWatchlist: data.club_watchlists,
                movies: data.movies
            })
        })
    }

    getMovies = () => {
        // console.log(this.state.clubWatchlist)
        // return this.state.movies.map(movie => <ClubMovieCard key={movie.id} movie={movie} movId={this.props.movId} user={this.props.user} club={this.state.club}/>)
        return this.state.clubWatchlist.map(watchlist => <ClubMovieCard key={watchlist.id} movieId={watchlist.movie_id}  user={this.props.user} club={this.state.club}/>)
    }

    render() {
        console.log(this.props)
        return(
            <React.Fragment>
            {this.state.club ?
            <React.Fragment>
                <ClubNav club={this.state.club} />
                <div className="index-heading">
                    <h1>Club Watchlist</h1>
                    <br />
                    <Link to="/movies/search">
                        <button className="read-more-btn">Add Movies To Your Club's Watchlist</button>
                    </Link>
                    <br />
                    <br />
                    <Row>
                    {this.getMovies()}
                    </Row>
                </div>
            </React.Fragment>
            :
            null}
            </React.Fragment>
        )
    }
}

export default withRouter(ClubWatchlist)