import React from 'react'
import MovieSearchCard from '../Components/MovieSearchCard'

class MovieSearchResults extends React.Component {
    render() {
        return(
            <React.Fragment>
                <div style={{"zIndex": "3", "backgroundColor": "#EFEFEF", "width": "80%", "paddingTop": "40px", "paddingBottom": "40px"}}>
                    <MovieSearchCard />
                </div>
            </React.Fragment>
        )
    }
}

export default MovieSearchResults