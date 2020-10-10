import React from 'react'

class MovieSearchCard extends React.Component {

    checkPosterImage = () => {
        if(this.props.movie.poster_path){
            return <img src={"https://image.tmdb.org/t/p/w500" + this.props.movie.poster_path} alt={this.props.movie.title} style={{"height": "200px"}} />
        } else {
            return <img src={"https://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png"} alt={this.props.movie.title} style={{"height": "200px"}} />
        }
    }

    render(){
        return(
            <React.Fragment>
            {this.props.movie ? 
                <React.Fragment>
                    <div style={{"marginLeft": "20px", "marginRight": "20px", "border": "2px solid black", "borderRadius": "30px"}}>
                        <div style={{"marginLeft": "30px", "marginTop": "20px"}}>
                        {this.checkPosterImage()}
                            <h2>{this.props.movie.title}</h2>
                            <h3>{this.props.movie.id}</h3>
                        </div>
                    </div>
                    <br />
                </React.Fragment>
            :
            <h1>Loading...</h1>
            }
            </React.Fragment>
        )
    }
}

export default MovieSearchCard