import React from 'react'
import MovieSearchBar from '../../Components/Forms/MovieSearchBar'
import MovieSearchResults from '../MovieSearchResults'

class MovieSearch extends React.Component {

    state = {
        title: ""
    }

    searchHandler = (movTitle) => {
        this.setState({
            title: movTitle
        })
        // this.getMovies(movTitle)
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
        .then(console.log)
    }

    render() {
        return(
            <React.Fragment>
                <div style={{"marginLeft": "50px", "marginTop": "50px", "marginRight": "50px"}}>
                    <h1>Movie Search</h1>
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