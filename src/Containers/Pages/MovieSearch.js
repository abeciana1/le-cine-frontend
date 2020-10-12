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
        console.log(movTitle)
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
        fetch("http://localhost:3000/api/v1/search", options)
        .then(res => res.json())
        .then(data => {
            this.setState({
                searchResults: data
            })
        })
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
        fetch("http://localhost:3000/api/v1/movies", options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }

    render() {
        return(
            <React.Fragment>
                <div style={{"marginLeft": "50px", "marginTop": "50px", "marginRight": "50px"}}>
                    <h1>Movie Search</h1>
                    <MovieSearchBar searchHandler={this.searchHandler} />
                    {this.state.searchResults ? <MovieSearchResults clubWatchlistSubmit={this.props.clubWatchlistSubmit} watchlistHandler={this.props.watchlistHandler} movieShow={this.props.movieShow} searchResults={this.state.searchResults} user={this.props.user} /> : null }
                </div>
            </React.Fragment>
        )
    }
}

export default MovieSearch