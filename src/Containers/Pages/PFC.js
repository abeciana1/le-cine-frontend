import React from 'react';
import moment from 'moment'
import ReactHtmlParser from "react-html-parser";
import MovieMeeting from "../../Components/MovieMeeting";
import NotificationSignupForm from "../../Components/Forms/NotificationSignupForm"

class PFC extends React.Component{

    state = {
        club: null,
        meetings: null,
        nextMeeting: null,
        movieMeetings: []
    }

    componentDidMount = () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                name: "PRIVATE CLUB"
            })
        }
        fetch("https://le-cine-backend.herokuapp.com/api/v1/find-club-by-name", options)
        .then(res => res.json())
        .then(data => {
            this.setState({
                club: data
            })

            let sortedMeetings = data.meetings.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            })

            this.setState({
                nextMeeting: sortedMeetings[0]
            })

        fetch("https://le-cine-backend.herokuapp.com/api/v1/meetings/" + sortedMeetings[0].id)
        .then((res) => res.json())
        .then(data => {
            for (const movieMeeting of data.movie_meetings) {
                fetch("https://le-cine-backend.herokuapp.com/api/v1/movie_meetings/" + movieMeeting.id)
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        movieMeetings: [...this.state.movieMeetings, data],
                    });
                });
            }
        })
        })
    }

    renderMovieMeetings = () => {
        let sortedMovieMeetings = this.state.movieMeetings.sort((a, b) => a.created_at.localeCompare(b.created_at))
        return sortedMovieMeetings.map(movieMeeting => <MovieMeeting key={movieMeeting.id} movieMeeting={movieMeeting} sumbitHandler={this.submitHandler} removeMovieMeeting={this.removeMovieMeeting} />)
    }

    render() {
        console.log(this.state.movieMeetings)
        return (
            <>
                <div className="page-normal-margin">
                    <h1>Pandemic Film Club</h1>
                </div>
                <div style={{ "textAlign": "center", "marginTop": "50px", "zIndex": "1" }}>
                    <h1>new PFC logo</h1>
                    {/* <img src={process.env.PUBLIC_URL + '../../../images/pandemic-film-club.gif'} alt="Pandemic Film Club intro" style={{"width":"600px"}} /> */}
                </div>
                <div style={{ "marginLeft": "auto", "marginRight": "auto" }}>
                    <br />
                    ================================================================
                    <br />
                    <NotificationSignupForm />
                    {/* <h1>area to signup for sms and/or email notifications</h1> */}
                    ================================================================
                    {this.state.nextMeeting ?
                        <div style={{"textAlign": "center"}}>
                            <h1>{this.state.nextMeeting.title}</h1>
                            <div style={{"textAlign": "center"}}>
                                <h3>{moment(this.state.nextMeeting.date).format("MMM Do YY")} | {moment(this.state.nextMeeting.time, "HH:mm:ss").format("hh:mm A")}</h3>
                            </div>
                            <br />
                            <h4 style={{"color":"blue"}}>Please use the form above to signup up for notifications</h4>
                            {/* {this.props.user ?
                                <h4><a href={"http://" + this.state.nextMeeting.link}>Meeting Link</a></h4>    
                            :
                                <h4>Please <a href="/login">login</a> to find the link to this meeting</h4>    
                            } */}
                            <br />
                            {ReactHtmlParser(this.state.nextMeeting.about)}
                            <br />
                            <h1>Films for the meeting</h1>
                            <div style={{ "marginLeft": "20%"}}>
                                {this.renderMovieMeetings()}
                            </div>
                        </div>        
                    :null}
                    {/* ================================================================                
                    <h1>films posters linked film pages from past meetings</h1> */}
                </div>
            </>
        )
    }
}

export default PFC