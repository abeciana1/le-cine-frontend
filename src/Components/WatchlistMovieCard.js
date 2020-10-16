import React from 'react'
import { Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';

class WatchlistMovieCard extends React.Component {

    state = {
        className: "",
        movie: null
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/api/v1/movies/" + this.props.movieId)
        .then(res => res.json())
        .then(data => {
            this.setState({
                movie: data
            })
        })
    };
    

    trimTitle = () => {

        if(this.state.movie.title.length > 15){
            let string = this.state.movie.title
            let length = 15
            let trimmedString = string.substring(0, length) + "..."
            return trimmedString
        } else {
            return this.state.movie.title
        }
    }

    mouseEnter = (e) => {
        this.setState({
            className: 'movie-card'
        })
    }

    mouseLeave = (e) => {
        this.setState({
            className: ''
        })
    }

    deleteHandler = (e) => {
        this.props.deleteHandler(this.props.watchlistId)
    }

    render(){
        // console.log(this.props)
        return(
            <React.Fragment>
            {this.state.movie ?
                <React.Fragment>
                <Col xs lg="2">
                    <a className="a" href={"/movies/search/" + this.state.movie.mov_id} style={{"textDecoration": "none", "textColor": "black"}}>
                        {this.state.movie.poster_path ? <img onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} className={this.state.className} src={this.state.movie.poster_path} alt={this.state.movie.title} style={{"height": "200px", "paddingRight": "20px", "paddingBottom": "10px"}} /> : <img onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} src={"https://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png"} alt={this.state.movie.title} style={{"height": "200px", "float": "left"}} />}
                        <h6>{this.trimTitle()}</h6>
                    </a>
                    <button onClick={this.deleteHandler} className="read-more-btn">Remove</button>
                    <br />
                    <br />
                </Col>
            </React.Fragment>
            : 
            null}
            </React.Fragment>
        )
    }
}

export default withRouter(WatchlistMovieCard)