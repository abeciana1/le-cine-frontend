import React from 'react'
import { Form } from 'react-bootstrap'

class AddMovieToClub extends React.Component {

    state = {
        selectedClub: null
    }

    getClubOptions = () => {
        return this.props.user.clubs.map(club => <option value={club.id}>{club.name}</option>)
    }

    clubSelection = (e) => {
        console.log("select")
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log("submit")
    }

    render() {
        console.log(this.props.user.clubs.length === 0)
        return (
            <React.Fragment>
                <div style={{"marginLeft": "20px", "marginRight": "20px"}}>
                    <Form onSubmit={this.submitHandler}>
                        <Form.Group controlId="clubWatchlistAddForm">
                            <Form.Label>Which club would you like to add this movie to?</Form.Label>
                            <Form.Control as="select" onChange={this.clubSelection}>
                            {this.props.user.clubs.length === 0 ? <option data-err="not-option">Sorry, you don't seem to be a member of any clubs</option> : <option>- Choose One -</option>}
                            {this.getClubOptions()}
                            </Form.Control>
                        </Form.Group>
                        {this.props.user.clubs.length === 0 ? null : <input type="submit" value="Add To Club Watchlist" className="read-more-btn"/>}
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}

export default AddMovieToClub