import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

class ClubMeetingComponent extends React.Component {

    deleteHandler = (e) => {
        this.props.deleteMeetingHandler(this.props.meeting)
    }

    render() {
        return(
            <React.Fragment>
            {this.props.club ?
            <React.Fragment>
                <div style={{"backgroundColor": "white", "marginLeft": "20px", "marginRight": "20px", "paddingBottom": "10px"}}>
                    <div style={{"marginLeft": "20px", "marginRight": "20px", "paddingTop":"5px", "paddingBottom":"5px"}}>
                        <h2>{this.props.meeting.title}</h2>
                        <h4>{moment(this.props.meeting.date).format("MMM Do YYYY")} | {this.props.meeting.time}</h4>
                        <h6><a href={"http://" + this.props.meeting.link} alt="meeting link">Meeting Link</a></h6>
                        <p>{this.props.meeting.excerpt}</p>
                    </div>
                <Link to={"/clubs/" + this.props.club.id + "/meetings/" + this.props.meeting.id} >
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