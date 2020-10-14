import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CreateMovieMeeting from './Forms/CreateMovieMeeting'
import moment from 'moment'

class MovieMeeting extends React.Component {

    state = {
        modalOpen: false
    }

    modalHandler = (e) => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    submitHandler = (movieMeetingObj) => {
        console.log(movieMeetingObj)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(movieMeetingObj)
        }
        fetch("http://localhost:3000/api/v1/movie_meetings", options)
        .then(res => res.json())
        .then(data => {
            this.props.addMovieMeetingOn(data)
            // console.log(data)
            // console.log(data.movie_meeting)
        })
    }

    render(){
        console.log(this.props)
        return(
            <React.Fragment>
            {this.props.meeting ?
            <React.Fragment>
                <div style={{"paddingLeft": "20px","backgroundColor": "#EFEFEF", "textAlign": "center", "paddingRight":"20px"}}>
                    <button onClick={this.modalHandler} className="read-more-btn">Add A Movie To This Meeting</button>
                </div>
                <>
                    <Modal show={this.state.modalOpen === true} close={this.state.modalOpen === false} >
                        <Modal.Header closeButton onClick={this.modalHandler}>
                            <Modal.Title>Add A Movie To Your Meeting</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <CreateMovieMeeting club={this.props.club} movies={this.props.movies} meeting={this.props.meeting} submitHandler={this.submitHandler}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.modalHandler}>
                            Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    </>
            </React.Fragment>
            :
            <React.Fragment>
            <div style={{"paddingLeft": "20px","backgroundColor": "#EFEFEF", "width": "50%", "textAlign": "left", "paddingTop": "20px", "paddingBottom": "20px", "paddingRight":"20px"}}>
                <div style={{"marginLeft": "20px", "marginTop": "20px", "marginRight": "20px", "width": "40%"}}>
                    <div style={{"paddingBottom": "20px"}}>
                        <h1 style={{"float": "left"}}>{this.props.movie.title}</h1>
                        <div>

                        </div>
                    </div>
                    <div style={{"margin": "auto", "width": "100%", "paddingBottom": "20px", "paddingTop":"45px"}}>
                        <img src={this.props.movie.poster_path} alt={this.props.movie.title} style={{"height":"250px","float":"left", "marginRight": "10px", "marginBottom": "5px", "padding": "2px"}}/>
                        <div style={{"marginLeft":"200px", "width":"100%", "top":"200px"}}>
                        {this.props.movie.overview}
                        <p>
                        <strong>{moment(this.props.movie.release_date).format("MMM Do YYYY")}</strong>
                        </p>
                        <br />
                        <Link to={"/movies/search/" + this.props.movie.mov_id}>
                            <button className="read-more-btn">View Details</button>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            </React.Fragment>
            }
            </React.Fragment>
        )
    }
}

export default MovieMeeting