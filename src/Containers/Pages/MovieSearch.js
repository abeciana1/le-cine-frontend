import React from 'react'
import MovieSearchBar from '../../Components/Forms/MovieSearchBar'
import MovieSearchResults from '../MovieSearchResults'

class MovieSearch extends React.Component {

    state = {
        searchTerm: ""
    }

    searchHandler = (message) => {
        this.setState({ searchTerm: message })
        console.log(message)
    }

    render() {
        return(
            <React.Fragment>
                <div style={{"marginLeft": "50px", "marginTop": "50px", "marginRight": "50px"}}>
                    <h1>Movie Search</h1>
                    <br />
                    <MovieSearchBar searchHandler={this.searchHandler} />
                    <br />
                    <br />
                    <MovieSearchResults />
                </div>
            </React.Fragment>
        )
    }
}

export default MovieSearch