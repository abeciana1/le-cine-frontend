import React from 'react'
import ClubMovieCard from '../../Components/ClubMovieCard'
import ClubNav from '../../Components/ClubNav'
import { Link, withRouter } from 'react-router-dom';
import { Row } from 'react-bootstrap'
import MediaQuery from 'react-responsive'

class ClubWatchlist extends React.Component {

    state = {
        club: null,
        clubWatchlist: []
    }

    componentDidMount = () => {
        fetch("https://le-cine-backend.herokuapp.com/clubs/" + this.props.id)
          .then((res) => res.json())
          .then((data) => {
            this.setState({
              club: data,
              clubWatchlist: data.club_watchlists,
            });
          });
    }

    getMovies = () => {
        return this.state.clubWatchlist.map(watchlist => <ClubMovieCard key={watchlist.id} movieId={watchlist.movie_id}  user={this.props.user} club={this.state.club} deleteMovieFromClub={this.deleteMovieFromClub} />)
    }

    deleteMovieFromClub = (clubWatchlist) => {
        
        let newArray = [...this.state.clubWatchlist]
        let foundWatchlist = newArray.find(watchlist => watchlist.id === clubWatchlist.id)
        newArray.splice(newArray.indexOf(foundWatchlist), 1)
        this.setState({clubWatchlist: newArray})

        const options = {method: 'DELETE'}
        fetch("https://le-cine-backend.herokuapp.com/club_watchlists/" +
            foundWatchlist.id,
          options
        ).then((res) => res.json());
    }

    render() {
        return(
            <React.Fragment>
            {this.state.club ?
            <React.Fragment>
            <MediaQuery maxWidth={999}>
                <ClubNav club={this.state.club} />
                <div style={{"marginLeft":"20px", "marginRight":"20px", "paddingTop":"30px"}}>
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
            </MediaQuery>
            <MediaQuery minWidth={1000}>
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
                </MediaQuery>
            </React.Fragment>
            :
            null}
            </React.Fragment>
        )
    }
}

export default withRouter(ClubWatchlist)