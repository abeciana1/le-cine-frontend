import React from 'react'
import ClubMovieCard from '../../Components/ClubMovieCard'
import ClubNav from '../../Components/ClubNav'
import { Link, withRouter } from 'react-router-dom';
import { Row } from 'react-bootstrap'

class ClubWatchlist extends React.Component {

    state = {
        club: null,
        movies: null
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/api/v1/clubs/" + this.props.id)
        .then(res => res.json())
        .then(data => {
            this.setState({
                club: data,
                movies: data.movies
            })
        })
    }

    getMovies = () => {
        return this.state.movies.map(movie => <ClubMovieCard key={movie.id} movie={movie} movId={this.props.movId} user={this.props.user} club={this.state.club}/>)
    }

    render() {
        console.log(this.props)
        return(
            <React.Fragment>
            {this.state.club ?
            <React.Fragment>
                <ClubNav club={this.state.club} />
                <div style={{"marginLeft": "50px", "marginTop": "50px", "marginRight": "100px", "position": "relative", "left":"220px", "top": "50px", "width": "70%"}}>
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