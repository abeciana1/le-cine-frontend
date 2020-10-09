import React from 'react'
import { Form } from 'react-bootstrap'

class MovieSearchBar extends React.Component {

    state = {
        searchTerm: ""
    }

    searchHandler = (e) => {
        this.setState({ searchTerm: e.target.value})
        this.props.searchHandler(e.target.value)
    }

    render() {
        return (
            <React.Fragment>
                {/* <Form.Label htmlFor="inputPassword5">Password</Form.Label> */}
                <Form.Control
                    type="text"
                    // name="searchTerm"
                    id="inputPassword5"
                    aria-describedby="passwordHelpBlock"
                    style={{"width": "60%"}}
                    onChange={this.searchHandler}
                    value={this.state.searchTerm}
                />
                <Form.Text id="passwordHelpBlock" muted>
                    Search for any film by it's title!
                </Form.Text>
            </React.Fragment>
        )
    }
}

export default MovieSearchBar