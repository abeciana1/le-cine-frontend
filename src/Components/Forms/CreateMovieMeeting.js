import React from 'react'
import { Form } from 'react-bootstrap'

class CreateMovieMeeting extends React.Component {

    state = {
        movie_id: 0,
        meeting_id: this.props.meeting.id,
        discussion: true,
        watch_along: false
    }

    getMovieOptions = () => {
        console.log(this.props.movies)
        return this.props.movies.map(movie => <option key={movie.id} value={movie.id}>{movie.title}</option>)
    }

    discussion = (e) => {
        this.setState({discussion: !this.state.discussion})
    }

    watchAlong = (e) => {
        this.setState({watch_along: !this.state.watch_along})
    }

    movieSelection = (e) => {
        // console.log(e.target.value)
        this.setState({movie_id: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        // console.log("submit")
        this.props.submitHandler(this.state)
    }



    render() {
        return(
            <React.Fragment>
                <Form onSubmit={this.submitHandler}>
                    <Form.Group>
                        <Form.Label>Which movie would you like to add to the meeting?</Form.Label>
                        <Form.Control required as="select" name="selectedMovie" onChange={this.movieSelection}>
                            {this.props.club.movies.length === 0 ? <option data-err="not-option">Sorry, you don't seem to have any movies in your club watchlist!</option> : <option>- Choose One -</option>}
                            {this.getMovieOptions()}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Is this movie for discussion?</Form.Label>
                        <Form.Check
                            type="checkbox"
                            checked={this.state.discussion}
                            onChange={this.discussion}
                            label="For Discussion"
                            name="privacy"
                            style={{"marginLeft": "5px"}}
                            />
                        <Form.Check
                            type="checkbox"
                            checked={this.state.watch_along}
                            onChange={this.watchAlong}
                            label="For Watch Along"
                            name="privacy"
                            style={{"marginLeft": "5px"}}
                            />
                    </Form.Group>
                    <Form.Group>
                        <Form.Text style={{"color":"red"}}>{this.state.movie_id === "- Choose One -" ? "This is not an option, the submit button has been disabled!" : null}</Form.Text>
                        {this.state.movie_id !== 0 ? <input type="submit" value="Add Movie To Meeting" className="read-more-btn" disabled={this.state.movie_id === "- Choose One -" ? true : false}/> : null}
                    </Form.Group>
                </Form>
            </React.Fragment>
        )
    }
}

export default CreateMovieMeeting