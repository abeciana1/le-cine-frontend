import React from 'react'
import ClubNav from '../../Components/ClubNav'
import CalendarComponent from '../../Components/CalendarComponent'
import MovieMeeting from '../../Components/MovieMeeting'
import MovieMeetingModal from '../../Components/MovieMeetingModal'
import UpdateMovieMeetingModal from '../../Components/UpdateMovieMeetingModal'
import { Alert } from 'react-bootstrap'
import MediaQuery from 'react-responsive'

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
            <MediaQuery maxWidth={999}>
            <CalendarComponent meeting={this.state.meeting} />
                <ClubNav club={this.state.club} />
                <div style={{"marginTop": "40px","width": "100%"}}>
                    <div style={{"paddingLeft": "20px","backgroundColor": "#EFEFEF", "textAlign": "left", "paddingTop": "40px", "paddingBottom": "40px", "paddingRight":"20px"}}>
                    {this.state.showAlert ? 
                    <Alert variant="success" style={{"textAlign":"center", "width":"100%", "marginLeft":"auto", "marginRight":"auto", "zIndex":"2"}}>Your changes have been saved!</Alert>
                    :
                    null
                    }
                        <h1>{this.state.meeting.title}</h1>
                        <h3>{this.state.meeting.time}</h3>
                        <br />
                        <div style={{"marginLeft":"20px", "marginRight":"20px", "backgroundColor":"white", "paddingTop":"20px", "paddingBottom":"20px"}}>
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
                        <div style={{"paddingLeft": "20px","backgroundColor": "#EFEFEF", "width": "100%", "textAlign": "center", "paddingTop": "40px", "paddingBottom": "40px", "paddingRight":"20px"}}>
                            <h2>There are no movies scheduled for this meeting!</h2>
                        </div>
                        :
                        this.renderMovieMeetings()
                    }
                    </div>
                </div>
            </MediaQuery>
            <MediaQuery minWidth={1000}>
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
                            <h2>There are no movies scheduled for this meeting!</h2>
                        </div>
                        :
                        this.renderMovieMeetings()
                    }
                    </div>
                </div>
                </MediaQuery>
            </React.Fragment>
            :
            null
            }
            </React.Fragment>
        )
    }
}

export default ClubMeetingShow