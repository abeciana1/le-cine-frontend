import React from 'react'
import { Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import LoadingComponent from './LoadingComponent'

class ClubMovieCard extends React.Component {

    state = {
        className: "",
    }

    trimTitle = () => {
        if(this.props.movie.title.length > 15){
            let string = this.props.movie.title
            let length = 15
            let trimmedString = string.substring(0, length) + "..."
            return trimmedString
        } else {
            return this.props.movie.title
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
                movie_id: this.props.movie.id
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
        // console.log(this.props)
        return(
            <React.Fragment>
            {/* {this.props.club && this.props.user ?  */}
            {this.props.user ? 
            <React.Fragment>
                <Col xs lg="2">
                    <a className="a" href={"/movies/search/" + this.props.movie.mov_id} style={{"textDecoration": "none", "textColor": "black"}}>
                        {this.props.movie.poster_path ? <img onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} className={this.state.className} src={this.props.movie.poster_path} alt={this.props.movie.title} style={{"height": "200px", "paddingRight": "20px", "paddingBottom": "10px"}} /> : <img onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} src={"https://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png"} alt={this.props.movie.title} style={{"height": "200px", "float": "left"}} />}
                        {/* {this.props.movie.poster_path ? <img src={"https://image.tmdb.org/t/p/original" + this.props.movie.poster_path} alt={this.props.movie.title} style={{"height": "200px", "paddingRight": "20px", "paddingBottom": "10px"}} /> : <img src={"https://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png"} alt={this.props.movie.title} style={{"height": "200px", "float": "left"}} />} */}
                        <h6>{this.trimTitle()}</h6>
                    </a>
                    {this.props.club.host_id === this.props.user.id ? <button onClick={this.deleteHandler} className="read-more-btn">Remove</button> : null}
                    <br />
                    <br />
                </Col>
            </React.Fragment>
            :
            <LoadingComponent />
            }
            </React.Fragment>
        )
    }
}

export default withRouter(ClubMovieCard)