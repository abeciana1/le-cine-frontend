import React from 'react'
import MovieSearchBar from '../../Components/Forms/MovieSearchBar'
import MovieSearchResults from '../MovieSearchResults'

class MovieSearch extends React.Component {

    state = {
        title: "",
        searchResults: [],
        selectedForWatchlist: null
    }

    searchHandler = (movTitle) => {
        this.setState({
            title: movTitle
        })
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({title: movTitle})
        }
        fetch("https://le-cine-backend.herokuapp.com/api/v1/search", options)
          .then((res) => res.json())
          .then((data) => {
            this.setState({
              searchResults: data,
            });
          });
    }

    watchlistHandler = (movieObj) => {
        console.log(movieObj)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(movieObj)
        }
        fetch("https://le-cine-backend.herokuapp.com/api/v1/movies", options)
          .then((res) => res.json())
          .then((data) => {
            this.props.watchlistHandler(data);
          });
    }

    addToClub = (club, movie) => {
        this.props.addToClub(club, movie)
    }

    render() {
        return(
            <React.Fragment>
                <div className="page-normal-margin">
                    <h1>Movie Search</h1>
                    <MovieSearchBar searchHandler={this.searchHandler} />
                    {this.state.searchResults ? <MovieSearchResults addToClub={this.addToClub} clubWatchlistSubmit={this.props.clubWatchlistSubmit} watchlistHandler={this.watchlistHandler} movieShow={this.props.movieShow} searchResults={this.state.searchResults} user={this.props.user} /> : null }
                </div>
            </React.Fragment>
        )
    }
}

export default MovieSearch