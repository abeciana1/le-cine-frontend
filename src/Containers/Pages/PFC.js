import React from 'react';
import moment from 'moment'
import ReactHtmlParser from "react-html-parser";
import MovieMeeting from "../../Components/MovieMeeting";
import NotificationSignupForm from "../../Components/Forms/NotificationSignupForm"
import { Link } from "react-router-dom";

import { Alert } from "react-bootstrap"

class PFC extends React.Component{

    state = {
        club: null,
        meetings: null,
        nextMeeting: null,
        movieMeetings: [],
        showSignup: false,
        signedUp: false
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
                return new Date(a.date) - new Date(b.date);
            })

            //! separate meetings past and upcoming

            let past = []
            let upcoming = []

            let todayDate = moment().format("MMMM Do YYYY, h:mm:ss a");
            for (let meetingObj of sortedMeetings) {
                if(moment(meetingObj.date).isAfter(todayDate)){ //! for upcoming meetings
                    upcoming.push(meetingObj)
                } else if (moment(todayDate).isAfter(meetingObj.date)) { //! for previous meetings
                    past.push(meetingObj)
                }
            }
            this.setState({
                nextMeeting: upcoming[0]
            })

        // fetch("https://le-cine-backend.herokuapp.com/api/v1/meetings/" + sortedMeetings[0].id)
        fetch("https://le-cine-backend.herokuapp.com/api/v1/meetings/" + upcoming[0].id)
        .then((res) => res.json())
            .then(data => {
            console.log(data)
            for (const movieMeeting of data.movie_meetings) {
                fetch("https://le-cine-backend.herokuapp.com/api/v1/movie_meetings/" + movieMeeting.id)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.setState({
                        movieMeetings: [...this.state.movieMeetings, data],
                    });
                });
            }
        })
        })
    }

    signupHandler = () => {
        this.setState({
            showSignup: !this.state.showSignup
        })
    }

    signedUpHandler = () => {
        this.setState({
            signedUp: !this.state.signedUp
        })
    }

    renderMovieMeetings = () => {
        let sortedMovieMeetings = this.state.movieMeetings.sort((a, b) => a.created_at.localeCompare(b.created_at))
        console.log(sortedMovieMeetings)
        // debugger
        return sortedMovieMeetings.map(movieMeeting => <MovieMeeting key={movieMeeting.id} movieMeeting={movieMeeting} sumbitHandler={this.submitHandler} removeMovieMeeting={this.removeMovieMeeting} />)
    }

    addSubscriberHandler = (subObj) => {
        console.log("subscriber added", subObj)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(subObj)
        }
        fetch("https://le-cine-backend.herokuapp.com/api/v1/subscribers", options)
            .then((res) => res.json())
            .then((data) => {
            console.log(data)
        })
    }

    render() {
        return (
            <>
                <div style={{ "textAlign": "center", "marginTop": "50px", "zIndex": "1" }}>
                    {/* <h1>new PFC logo</h1> */}
                    <img src={process.env.PUBLIC_URL + '../../../images/PFC-new-logo.png'} alt="Pandemic Film Club intro" style={{"width":"600px","border":"1px solid black"}} />
                    <br />
                    <br />
                    <br />
                        <h3>Search for films here</h3>
                    {/* <button class="read-more-btn"><h2>Search for films</h2></button> */}
                    <Link to={"/movies/search/"}>
                        <button class="read-more-btn">Search for films</button>
                    </Link>
                    <br />
                </div>
                <div style={{ "marginLeft": "auto", "marginRight": "auto" }}>
                    {/* ===== */}
                    <br />
                    {/* <h4>If you haven't done so, signup for notifications to get the link</h4>
                        <button className="read-more-btn" onClick={this.signupHandler} >Signup for Text Notifications</button> */}
                    <br />
                    {this.state.signedUp ?
                        <div style={{"textAlign":"center"}}>
                            <Alert variant="success" style={{"width": "50%", "marginLeft":"auto", "marginRight":"auto"}}>
                                Thanks for signing up!
                            </Alert>
                        </div>
                        :
                            this.state.showSignup ?
                            <NotificationSignupForm signupHandler={this.signupHandler} signedUpHandler={this.signedUpHandler} addSubscriberHandler={this.addSubscriberHandler}/>
                                :
                                <div style={{"marginLeft":"auto", "marginRight":"auto", "width":"60%", "padding":"20px" ,"backgroundColor":"#efefef"}}>
                                    <h4>If you haven't done so, signup for notifications to get the link</h4>
                                    <button className="read-more-btn" onClick={this.signupHandler} >Signup for Text Notifications</button>
                                </div>
                            }
                    {/* <h1>area to signup for sms and/or email notifications</h1> */}
                    {/* ================================================================ */}
                    {this.state.nextMeeting ?
                        <div style={{"textAlign": "center", "paddingTop":"20px"}}>
                            <h1>{this.state.nextMeeting.title}</h1>
                            <div style={{"textAlign": "center"}}>
                                <h3>{moment(this.state.nextMeeting.date).format("MMM Do YY")} | {moment(this.state.nextMeeting.time, "HH:mm:ss").format("hh:mm A")}</h3>
                            </div>
                            <br />
                            {/* <h4 style={{"color":"blue"}}>Please use the form above to signup up for notifications</h4> */}
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