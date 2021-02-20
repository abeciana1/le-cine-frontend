import React from 'react'
import { Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive'

class MovieCard extends React.Component {

    trimTitle = () => {
        if(this.props.movie.title.length > 20){
            let string = this.props.movie.title
            let length = 20
            let trimmedString = string.substring(0, length) + "..."
            return trimmedString
        } else {
            return this.props.movie.title
        }
    }

    render(){
        return(
            <React.Fragment>
            <MediaQuery maxWidth={999}>
                <Col xs={6} md={4} lg={3}>
                    <a href={"/movies/search/" + this.props.movie.id} style={{"textDecoration": "none", "textColor": "black"}}>
                        {this.props.movie.poster_path ? <img src={"https://image.tmdb.org/t/p/original" + this.props.movie.poster_path} alt={this.props.movie.title} style={{"height": "200px", "paddingRight": "20px", "paddingBottom": "10px"}} /> : <img src={"https://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png"} alt={this.props.movie.title} style={{"height": "200px", "paddingRight": "20px", "paddingBottom": "10px"}} />}
                        <br />
                        <h6>{this.trimTitle()}</h6>
                    </a>
                </Col>
            </MediaQuery>
            <MediaQuery minWidth={1000}>
                <Col xs lg="2">
                    <a href={"/movies/search/" + this.props.movie.id} style={{"textDecoration": "none", "textColor": "black"}}>
                        {this.props.movie.poster_path ? <img src={"https://image.tmdb.org/t/p/original" + this.props.movie.poster_path} alt={this.props.movie.title} style={{"height": "200px", "paddingRight": "20px", "paddingBottom": "10px"}} /> : <img src={"https://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png"} alt={this.props.movie.title} style={{"height": "200px", "paddingRight": "20px", "paddingBottom": "10px"}} />}
                        <br />
                        <h6>{this.trimTitle()}</h6>
                    </a>
                </Col>
                </MediaQuery>
            </React.Fragment>
        )
    }
}

export default withRouter(MovieCard)