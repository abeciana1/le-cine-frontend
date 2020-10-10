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

    // submitHandler = (e) => {
    //     e.preventDefault()
    //     // this.props.searchHandler(this.state.searchTerm)
    //     this.setState({
    //         searchTerm: ""
    //     })
    // }

    render() {
        return (
            <React.Fragment>
                <Form onSubmit={this.submitHandler} style={{"paddingTop": "60px", "paddingBottom": "60px"}}>
                        <Form.Group controlId="searchBar">
                            {/* <Form.Label>Email address</Form.Label> */}
                            <Form.Control name="text" type="text" value={this.state.email} onChange={this.searchHandler} style={{"width": "60%"}} placeholder="Search for movies by title"/>
                        </Form.Group>
                        {/* <input type="submit" value="Search" className="read-more-btn" style={{"backgorundColor": "#EFEFEF"}}/> */}
                    </Form>
            </React.Fragment>
        )
    }
}

export default MovieSearchBar