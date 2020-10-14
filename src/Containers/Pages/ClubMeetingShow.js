import React from 'react'
import ClubNav from '../../Components/ClubNav'
import CalendarComponent from '../../Components/CalendarComponent'
import MovieMeeting from '../../Components/MovieMeeting'
import MovieMeetingModal from '../../Components/MovieMeetingModal'

class ClubMeetingShow extends React.Component {

    state = {
        club: null,
        movies: null,
        meeting: null,
        movieMeetings: [],
        movieMeetingId: []
    }

    componentDidMount = () => {
        console.log(this.props)
        fetch("http://localhost:3000/api/v1/clubs/" + this.props.club_id)
        .then(res => res.json())
        .then(data => {
            this.setState({
                club: data,
                movies: data.movies
            })
        })
        fetch("http://localhost:3000/api/v1/meetings/" + this.props.meeting_id)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({
                meeting: data//,
            })
            for (const movieMeeting of data.movie_meetings) {
                // console.log(id)
                fetch("http://localhost:3000/api/v1/movie_meetings/" + movieMeeting.id)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    // let newArray = []
                    this.setState({
                        movieMeetings: [...this.state.movieMeetings, data]
                    })
                })
            }
        })
    }

    renderMovieMeetings = () => {
        return this.state.movieMeetings.map(movieMeeting => <MovieMeeting key={movieMeeting.id} movieMeeting={movieMeeting} sumbitHandler={this.submitHandler} />)
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

    //TODO - Make MovieMeeting into two components - one for card and one for modal form
    //TODO - add CDM to find movie and meeting association
        //TODO - data should add itself to state and then render through renderMovieMeetings function for cards
        //TODO - create custom action and route on backend to find association
    //TODO - add delete movie meeting funtion
    //TODO - create update meeting form / component
    //TODO - add email all button in member index page
    //TODO - work on remove member button


    render() {
        return (
            <React.Fragment>
            {this.state.club && this.state.meeting ? 
            <React.Fragment>
            <CalendarComponent meeting={this.state.meeting} />
            <div style={{"marginTop":"120px"}}>
                <ClubNav club={this.state.club} />
            </div>
                <div style={{"marginLeft": "300px", "marginTop": "80px", "marginRight": "100px", "width": "100%"}}>
                    <div style={{"paddingLeft": "20px","backgroundColor": "#EFEFEF", "width": "50%", "textAlign": "left", "paddingTop": "40px", "paddingBottom": "40px", "paddingRight":"20px"}}>
                        <h1>{this.state.meeting.title}</h1>
                        <h3>{this.state.meeting.time}</h3>
                        <br />
                        <div style={{"backgroundColor": "white", "paddingTop":"40px", "paddingBottom":"40px"}}>
                            <div style={{"marginLeft": "20px", "paddingRight": "40px"}}>
                                <h4>{this.state.meeting.about}</h4>
                            </div>
                        </div>
                        <br />
                        <MovieMeetingModal club={this.state.club} movies={this.state.movies} meeting={this.state.meeting} submitHandler={this.submitHandler} />
                    </div>
                    <div style={{"paddingTop": "50px"}}>
                    {this.state.movieMeetings.length === 0 ?
                        <div style={{"paddingLeft": "20px","backgroundColor": "#EFEFEF", "width": "50%", "textAlign": "center", "paddingTop": "40px", "paddingBottom": "40px", "paddingRight":"20px"}}>
                            <h2>There are no movies set for this meeting!</h2>
                            <MovieMeetingModal club={this.state.club} movies={this.state.movies} meeting={this.state.meeting} submitHandler={this.submitHandler} />
                        </div>
                        :
                        this.renderMovieMeetings()
                    }
                    </div>
                </div>
            </React.Fragment>
            :
            null
            }
            </React.Fragment>
        )
    }
}

export default ClubMeetingShow