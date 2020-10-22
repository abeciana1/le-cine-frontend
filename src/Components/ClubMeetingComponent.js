import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

class ClubMeetingComponent extends React.Component {

    state = {
        meeting: null
    }

    componentDidMount() {
        this.setState({meeting: this.props.meeting})
    }

    deleteHandler = (e) => {
        this.props.deleteMeetingHandler(this.state.meeting)
    }

    render() {
        console.log(this.props.meeting)
        return(
            <React.Fragment>
            {this.state.meeting ?
            <React.Fragment>
                <div style={{"backgroundColor": "white", "marginLeft": "20px", "marginRight": "20px", "paddingBottom": "10px"}}>
                    <div style={{"marginLeft": "20px", "marginRight": "20px", "paddingTop":"5px", "paddingBottom":"5px"}}>
                        <h2>{this.state.meeting.title}</h2>
                        <h4>{moment(this.state.meeting.date).format("MMM Do YYYY")} | {this.state.meeting.time}</h4>
                        <h6><a href={"http://" + this.state.meeting.link} alt="meeting link">Meeting Link</a></h6>
                        <p>{this.state.meeting.excerpt}</p>
                    </div>
                <Link to={"/clubs/" + this.props.club.id + "/meetings/" + this.state.meeting.id} >
                    <button className="read-more-btn" style={{"marginLeft": "20px"}}>View Details</button>
                </Link>
                <button className="read-more-btn" style={{"marginLeft": "20px"}} onClick={this.deleteHandler}>Remove Meeting</button>
                </div>
                <br />
                <br />
            </React.Fragment>
            :
            null
            }
            </React.Fragment>
        )
    }
}

export default ClubMeetingComponent