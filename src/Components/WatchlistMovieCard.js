import React from 'react'
import { Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';

class MovieCard extends React.Component {

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
        this.props.deleteHandler(this.props.movie.id)
    }

    render(){
        return(
            <React.Fragment>
                <Col xs lg="2">
                    <a className="a" href={"/movies/search/" + this.props.movie.mov_id} style={{"textDecoration": "none", "textColor": "black"}}>
                        {this.props.movie.poster_path ? <img onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} className={this.state.className} src={this.props.movie.poster_path} alt={this.props.movie.title} style={{"height": "200px", "paddingRight": "20px", "paddingBottom": "10px"}} /> : <img onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} src={"https://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png"} alt={this.props.movie.title} style={{"height": "200px", "float": "left"}} />}
                        {/* {this.props.movie.poster_path ? <img src={"https://image.tmdb.org/t/p/original" + this.props.movie.poster_path} alt={this.props.movie.title} style={{"height": "200px", "paddingRight": "20px", "paddingBottom": "10px"}} /> : <img src={"https://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png"} alt={this.props.movie.title} style={{"height": "200px", "float": "left"}} />} */}
                        <h6>{this.trimTitle()}</h6>
                    </a>
                    <button onClick={this.deleteHandler} className="read-more-btn">Remove</button>
                    <br />
                    <br />
                </Col>
            </React.Fragment>
        )
    }
}

export default withRouter(MovieCard)