import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

class ClubMeetingComponent extends React.Component {


    render() {
        return(
            <React.Fragment>
                <div style={{"backgroundColor": "white", "marginLeft": "20px", "marginRight": "20px", "paddingBottom": "10px"}}>
                    <p style={{"marginLeft": "20px", "marginRight": "20px", "paddingTop":"5px", "paddingBottom":"5px"}}>
                        <h2>{this.props.meeting.title}</h2>
                        <h4>{moment(this.props.meeting.date).format("MMM Do YYYY")} | {this.props.meeting.time}</h4>
                        <h6><a href={this.props.meeting.link} alt="meeting link">Meeting Link</a></h6>
                        <p>{this.props.meeting.excerpt}</p>
                    </p>
                <Link to={"/meetings/" + this.props.meeting.id} >
                    <button className="read-more-btn" style={{"marginLeft": "20px"}}>View Details</button>
                </Link>
                </div>
                <br />
                <br />
            </React.Fragment>
        )
    }
}

export default ClubMeetingComponent