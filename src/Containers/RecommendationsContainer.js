import React from 'react'
import MovieCard from '../Components/MovieCard'
import { Row } from 'react-bootstrap'


class RecommendationsContainer extends React.Component {

    unpackMovies = () => {
        return this.props.movies.map(movie => <MovieCard key={movie.id} movie={movie}/>)
    }

    render() {
        return(
            <React.Fragment>
                <div style={{"backgroundColor": "#EFEFEF"}}>
                    <div style={{"marginLeft": "20px", "marginRight": "20px", "paddingTop": "20px", "paddingBottom": "20px"}}>
                        <Row>
                            {this.unpackMovies()}
                        </Row>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default RecommendationsContainer