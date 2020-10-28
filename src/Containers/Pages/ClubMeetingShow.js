import React from 'react'
import ClubNav from '../../Components/ClubNav'
import CalendarComponent from '../../Components/CalendarComponent'
import MovieMeeting from '../../Components/MovieMeeting'
import MovieMeetingModal from '../../Components/MovieMeetingModal'
import UpdateMovieMeetingModal from '../../Components/UpdateMovieMeetingModal'
import { Alert, Modal, Button } from 'react-bootstrap'

class ClubMeetingShow extends React.Component {

    state = {
        club: null,
        host: null,
        movies: null,
        meeting: null,
        movieMeetings: [],
        movieMeetingId: [],
        showAlert: false,
        nowPlayingModal: true
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/api/v1/clubs/" + this.props.club_id)
        .then(res => res.json())
        .then(data => {
            this.setState({
                club: data,
                movies: data.movies,
                host: data.host
            })
        })
        fetch("http://localhost:3000/api/v1/meetings/" + this.props.meeting_id)
        .then(res => res.json())
        .then(data => {
            this.setState({
                meeting: data//,
            })
            for (const movieMeeting of data.movie_meetings) {
                fetch("http://localhost:3000/api/v1/movie_meetings/" + movieMeeting.id)
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        movieMeetings: [...this.state.movieMeetings, data]
                    })
                })
            }
        })
    }

    renderMovieMeetings = () => {
        let sortedMovieMeetings = this.state.movieMeetings.sort((a, b) => a.created_at.localeCompare(b.created_at))
        return sortedMovieMeetings.map(movieMeeting => <MovieMeeting key={movieMeeting.id} movieMeeting={movieMeeting} sumbitHandler={this.submitHandler} removeMovieMeeting={this.removeMovieMeeting} />)
    }

    submitHandler = (movieMeetingObj) => {
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
            this.setState({
                movieMeetings: [...this.state.movieMeetings, data.movie_meeting],
                movieMeetingId: [...this.state.movieMeetingId, data.movie_meeting.id]
            })
        })
    }

    removeMovieMeeting = (movieMeetingObj) => {
        console.log("delete")
        let newArray = [...this.state.movieMeetings]
        newArray.splice(newArray.indexOf(movieMeetingObj), 1)
        this.setState({
            movieMeetings: newArray
        })
    }

    updateHandler = (meetingObj) => {
        this.renderAlert()
        this.setState({
            meeting: meetingObj
        })
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(meetingObj)
        }
        fetch("http://localhost:3000/api/v1/meetings/" + meetingObj.id, options)
        .then(res => res.json())
    }

    renderAlert = () => {
        this.setState({
            showAlert: true
        })
    }

    nowPlayingModalHandler = () => {
        this.setState({nowPlayingModal: !this.state.nowPlayingModal})
    }

    render() {
        return (
            <React.Fragment>
            {this.state.club && this.state.meeting && this.props.user ? 
            <React.Fragment>
            <CalendarComponent meeting={this.state.meeting} />
            <div style={{"marginTop":"120px"}}>
                <ClubNav club={this.state.club} />
            </div>
                <div style={{"marginLeft": "20%", "marginTop": "40px","width": "80%"}}>
                    <div style={{"paddingLeft": "20px","backgroundColor": "#EFEFEF", "width": "75%", "textAlign": "left", "paddingTop": "40px", "paddingBottom": "40px", "paddingRight":"20px"}}>
                    {this.state.showAlert ? 
                    <Alert variant="success" style={{"textAlign":"center", "width":"100%", "marginLeft":"auto", "marginRight":"auto", "zIndex":"2"}}>Your changes have been saved!</Alert>
                    :
                    null
                    }
                        <h1>{this.state.meeting.title}</h1>
                        <h3>{this.state.meeting.time}</h3>
                        <br />
                        <div className="internal-card-white">
                            <div style={{"marginLeft": "20px", "paddingRight": "40px"}}>
                                <h5>{this.state.meeting.about}</h5>
                            </div>
                        </div>
                        <br />
                        {this.state.club ?
                        this.state.host.id === this.props.user.id ?
                            <>
                            <UpdateMovieMeetingModal club={this.state.club} meeting={this.state.meeting} updateHandler={this.updateHandler} />
                            <br />
                            <MovieMeetingModal club={this.state.club} movies={this.state.movies} meeting={this.state.meeting} submitHandler={this.submitHandler} />
                            </>
                            : null
                            : null}
                    </div>
                    <div style={{"paddingTop": "50px"}}>
                    {this.state.movieMeetings.length === 0 ?
                        <div style={{"paddingLeft": "20px","backgroundColor": "#EFEFEF", "width": "50%", "textAlign": "center", "paddingTop": "40px", "paddingBottom": "40px", "paddingRight":"20px"}}>
                            <h2>There are no movies set for this meeting!</h2>
                        </div>
                        :
                        this.renderMovieMeetings()
                    }
                    </div>
                </div>
                <React.Fragment>
                {this.state.nowPlayingModal ? 
                    <Modal show={this.state.nowPlayingModal === true} close={this.state.nowPlayingModal === false} size="lg">
                <Modal.Header closeButton onClick={this.nowPlayingModalHandler}>
                    <Modal.Title>Blank Presents</Modal.Title>
                </Modal.Header>
                {/* <Modal.Body> */}
                <Modal.Body style={{"margin": "0px", backgroundImage: `url(${process.env.PUBLIC_URL + "/images/meeting-show-marquee.png"})`, "backgroundPosition": 'center',
                    "top": "0px",
                    "position":"relative",
                    "width": "100%",
                    "height": "75vh",
                    "backgroundSize": '100%',
                    "backgroundRepeat": 'no-repeat'}}>
                    <div style={{"textAlign":"center", "marginTop":"22.5%", "position":"absolute", "left":"35%", "top":"3%"}}>
                    {this.state.meeting.movie_meetings.length > 0 ?
                        <>
                        {this.state.meeting.movie_meetings[0].discussion ?  <div className="light-box" style={{"fontSize":"3vw", "color":"#a63b3b", "textAlign":"center"}}>DISCUSSION</div> : <div className="light-box" style={{"fontSize":"3vw", "color":"#a63b3b", "textAlign":"center"}}>WATCHALONG</div>}
                        <div className="light-box" style={{"fontSize":"3vw", "color":"#2f3839", "textAlign":"center"}}>{`${this.state.meeting.movies[0].title}`}</div>
                        </>
                        :
                        <div style={{"marginTop": "5%"}}>
                            <div style={{"marginLeft":"100px", "marginRight":"100px"}}>
                                <div className="light-box" style={{"fontSize":"3.5vw", "color":"#2f3839", "textAlign":"center"}}>Sorry, no movies have been added to this meeting</div>
                            </div>
                        </div>}
                        {this.state.meeting.movie_meetings.length > 1 ?
                        <div>
                            {this.state.meeting.movie_meetings[1].discussion ?  <div className="light-box" style={{"fontSize":"3vw", "color":"#a63b3b", "textAlign":"center"}}>DISCUSSION</div> : <div className="light-box" style={{"fontSize":"3vw", "color":"#a63b3b", "textAlign":"center"}}>WATCHALONG</div>}
                            <div className="light-box" style={{"fontSize":"3vw", "color":"#2f3839", "textAlign":"center"}}>{`${this.state.meeting.movies[1].title}`}</div>
                        </div>
                            : null}
                        {this.state.meeting.movie_meetings.length > 2 ?
                            <div>
                                <div className="light-box" style={{"fontSize":"3vw", "color":"#a63b3b", "textAlign": "center"}}>...AND MORE !</div> 
                            </div>
                        : null}
                    </div>
                    {/* <img src={process.env.PUBLIC_URL + "/images/meeting-show-marquee.png"} alt="marquee" style={{"width": "100%"}} /> */}
                    {/* <div style={{"textAlign": "center"}}> */}

                        {/* {this.state.meeting.movie_meetings.length > 0 ?
                        <div style={{"marginTop": "25%"}}>
                            {this.state.meeting.movie_meetings[0].discussion ?  <div className="light-box" style={{"fontSize":"2.6vw", "color":"#2f3839", "textAlign":"center"}}>DISCUSSION</div> : <div className="light-box" style={{"fontSize":"2.6vw", "color":"#a63b3b", "textAlign":"center"}}>WATCHALONG</div>}
                            <div className="light-box" style={{"fontSize":"2.6vw", "color":"#2f3839", "textAlign":"center"}}>{`${this.state.meeting.movies[0].title}`}</div>
                        </div>
                        : 
                        <div style={{"marginTop": "5%"}}>
                            <div style={{"marginLeft":"100px", "marginRight":"100px"}}>
                                <div className="light-box" style={{"fontSize":"3.5vw", "color":"#2f3839", "textAlign":"center"}}>Sorry, no movies have been added to this meeting</div>
                            </div>
                        </div>}
                        {this.state.meeting.movie_meetings.length > 1 ?
                        <div style={{"marginTop": "5%"}}>
                            {this.state.meeting.movie_meetings[1].discussion ?  <div className="light-box" style={{"fontSize":"2.6vw", "color":"#2f3839", "textAlign":"center"}}>DISCUSSION</div> : <div className="light-box" style={{"fontSize":"2.6vw", "color":"#a63b3b", "textAlign":"center"}}>WATCHALONG</div>}
                            <div className="light-box" style={{"fontSize":"2.6vw", "color":"#2f3839", "textAlign":"center"}}>{`${this.state.meeting.movies[1].title}`}</div>
                        </div>
                            : null}
                        {this.state.meeting.movie_meetings.length > 2 ?
                        <div>
                            <div className="light-box" style={{"fontSize":"2.5vw", "color":"#a63b3b", "textAlign": "center"}}>...AND MORE!</div> 
                        </div>
                            : null} */}
                    {/* </div> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.nowPlayingModalHandler}>
                    Close
                    </Button>
                </Modal.Footer>
                </Modal>
                : null}
                </React.Fragment>
            </React.Fragment>
            :
            null
            }
            </React.Fragment>
        )
    }
}

export default ClubMeetingShow