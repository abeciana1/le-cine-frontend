import React from 'react'
import { Form } from 'react-bootstrap'
import MediaQuery from 'react-responsive'

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
            <MediaQuery maxWidth={999}>
                <Form onSubmit={this.submitHandler} style={{"paddingTop": "30px", "paddingBottom": "30px"}}>
                    <Form.Group controlId="searchBar">
                        <Form.Control name="text" type="text" value={this.state.email} onChange={this.searchHandler} style={{"width": "100%"}} placeholder="Search for movies by title"/>
                    </Form.Group>
                </Form>
            </MediaQuery>
            <MediaQuery minWidth={1000}>
                <Form onSubmit={this.submitHandler} style={{"paddingTop": "60px", "paddingBottom": "60px"}}>
                    <Form.Group controlId="searchBar">
                        <Form.Control name="text" type="text" value={this.state.email} onChange={this.searchHandler} style={{"width": "60%"}} placeholder="Search for movies by title"/>
                    </Form.Group>
                </Form>
            </MediaQuery>
            </React.Fragment>
        )
    }
}

export default MovieSearchBar