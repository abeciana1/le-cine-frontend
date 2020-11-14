import React from 'react'
import MovieSearchCard from '../Components/MovieSearchCard'
import MediaQuery from 'react-responsive'

class MovieSearchResults extends React.Component {

    getSearchResults = () => {
        return this.props.searchResults.map(movie => <MovieSearchCard key={movie.id}  movie={movie} addToClub={this.props.addToClub} clubWatchlistSubmit={this.props.clubWatchlistSubmit} watchlistHandler={this.props.watchlistHandler} user={this.props.user} movieShow={this.props.movieShow} />)
    }

    render() {
        return(
            <React.Fragment>
            <MediaQuery maxWidth={999}>
            {this.props.searchResults ? 
                <div style={{"zIndex": "3", "width": "100%", "paddingTop": "40px", "paddingBottom": "40px"}}>
                    {this.getSearchResults()}
                </div>
                :
                null
            }
            </MediaQuery>
            <MediaQuery minWidth={1000}>
            {this.props.searchResults ? 
                <div style={{"zIndex": "3", "width": "80%", "paddingTop": "40px", "paddingBottom": "40px"}}>
                    {this.getSearchResults()}
                </div>
                :
                null
            }
            </MediaQuery>
            </React.Fragment>
        )
    }
}

export default MovieSearchResults