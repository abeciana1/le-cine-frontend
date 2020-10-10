import React from 'react'
import MovieSearchCard from '../Components/MovieSearchCard'

class MovieSearchResults extends React.Component {

    getSearchResults = () => {
        return this.props.searchResults.map(movie => <MovieSearchCard key={movie.id} movie={movie} movieShow={this.props.movieShow} />)
    }

    render() {
        return(
            <React.Fragment>
            {this.props.searchResults ? 
                <div style={{"zIndex": "3", "width": "80%", "paddingTop": "40px", "paddingBottom": "40px"}}>
                    {this.getSearchResults()}
                </div>
                :
                null
            }
            </React.Fragment>
        )
    }
}

export default MovieSearchResults