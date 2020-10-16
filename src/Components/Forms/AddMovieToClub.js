import React from 'react'
import { Form } from 'react-bootstrap'

class AddMovieToClub extends React.Component {

    state = {
        selectedClubId: 0,
        disabled: false
    }

    getClubOptions = () => {
        return this.props.user.clubs.map(club => <option key={club.id} value={club.id}>{club.name}</option>)
    }

    clubSelection = (e) => {
        this.setState({
            selectedClubId: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.clubWatchlistSubmit(this.state.selectedClubId)
    }

    render() {
        return (
            <React.Fragment>
                <div style={{"marginLeft": "20px", "marginRight": "20px"}}>
                    <Form onSubmit={this.submitHandler}>
                        <Form.Group controlId="clubWatchlistAddForm">
                            <Form.Label>Which club would you like to add this movie to?</Form.Label>
                            <Form.Control as="select" name="selectedClub" onChange={this.clubSelection}>
                            {this.props.user.clubs.length === 0 ? <option data-err="not-option">Sorry, you don't seem to be a member of any clubs</option> : <option>- Choose One -</option>}
                            {this.getClubOptions()}
                            </Form.Control>
                            <Form.Text style={{"color":"red"}}>{this.state.selectedClubId === "- Choose One -" ? "This is not an option, the submit button has been disabled!" : null}</Form.Text>
                        </Form.Group>
                        {this.state.selectedClubId !== 0 ? <input type="submit" value="Add To Club Watchlist" className="read-more-btn" disabled={this.state.selectedClubId === "- Choose One -" ? true : false}/> : null}
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}

export default AddMovieToClub