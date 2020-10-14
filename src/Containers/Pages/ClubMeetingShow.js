import React from 'react'
import ClubNav from '../../Components/ClubNav'
import CalendarComponent from '../../Components/CalendarComponent'
import MovieMeeting from '../../Components/MovieMeeting'

class ClubMeetingShow extends React.Component {

    state = {
        club: null,
        movies: null,
        meeting: null,
        movieMeetings: []
    }

    componentDidMount = () => {
        console.log(this.props)
        fetch("http://localhost:3000/api/v1/clubs/" + this.props.club_id)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({
                club: data,
                movies: data.movies
            })
        })
        fetch("http://localhost:3000/api/v1/meetings/" + this.props.meeting_id)
        .then(res => res.json())
        .then(data => {
            this.setState({
                meeting: data,
                movieMeetings: data.movies
            })
            console.log(data)
        })
    }

    renderMovieMeetings = () => {
        console.log(this.state.meeting)
        return this.state.movieMeetings.map(movie => <MovieMeeting key={movie.id} movie={movie} />)
    }

    addMovieMeetingOn = (movieObj) => {
        let newArray = [...this.state.movies, movieObj]
        this.setState({
            movies: newArray
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
                        <MovieMeeting club={this.state.club} movies={this.state.movies} meeting={this.state.meeting} />
                    </div>
                    <div style={{"paddingTop": "50px"}}>
                    {this.state.movieMeetings.length === 0 ?
                        <div style={{"paddingLeft": "20px","backgroundColor": "#EFEFEF", "width": "50%", "textAlign": "center", "paddingTop": "40px", "paddingBottom": "40px", "paddingRight":"20px"}}>
                            <h2>There are no movies set for this meeting!</h2>
                            <MovieMeeting club={this.state.club} movies={this.state.movies} meeting={this.state.meeting} />
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