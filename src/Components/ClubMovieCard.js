import React from 'react'
import { Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';

class ClubMovieCard extends React.Component {

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
        console.log("deleting")
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                club_id: this.props.club.id,
                movie_id: this.props.movie_id
            })
        }
        fetch("http://localhost:3000/api/v1/find-club-watchlist", options)
        .then(res => res.json())
        .then(data => {
            this.deleteMovieFromClub(data.id)
        })
    }

    deleteMovieFromClub = (id) => {
        const options = {method: 'DELETE'}
        fetch("http://localhost:3000/api/v1/club_watchlists/" + id, options)
        .then(res => res.json())
        .then(window.location.reload(false))
    }

    render(){
        return(
            <React.Fragment>
            {this.props.user && this.state.movie ? 
            <React.Fragment>
                <Col xs lg="2">
                    <a className="a" href={"/movies/search/" + this.state.movie.mov_id} style={{"textDecoration": "none", "textColor": "black"}}>
                        {this.state.movie.poster_path ? <img onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} className={this.state.className} src={this.state.movie.poster_path} alt={this.state.movie.title} style={{"height": "200px", "paddingRight": "20px", "paddingBottom": "10px"}} /> : <img onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} src={"https://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png"} alt={this.state.movie.title} style={{"height": "200px", "float": "left"}} />}
                        <h6>{this.trimTitle()}</h6>
                    </a>
                    {this.props.club.host_id === this.props.user.id ? <button onClick={this.deleteHandler} className="read-more-btn">Remove</button> : null}
                    <br />
                    <br />
                </Col>
            </React.Fragment>
            :
            null
            }
            </React.Fragment>
        )
    }
}

export default withRouter(ClubMovieCard)