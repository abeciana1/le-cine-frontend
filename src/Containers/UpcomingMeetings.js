import React from 'react'
import ClubMeetingComponent from '../Components/ClubMeetingComponent'
import moment from 'moment'

class UpcomingMeetings extends React.Component {

    state = {
        meetings: []
    }

    componentDidMount() {
        this.setState({
            meetings: this.props.meetings
        })
    }

    getMeetings = () => {
        let todayDate = moment().format('YYYY-MM-DD')
        let upcoming = this.props.meetings.filter(meeting => moment(meeting.date).isAfter(todayDate))
        return upcoming.map(meeting => <ClubMeetingComponent key={meeting.id} club={this.props.club} meeting={meeting} deleteMeetingHandler={this.deleteMeetingHandler} />)
    }

    deleteMeetingHandler = (meetingObj) => {
        this.props.deleteMeetingHandler(meetingObj)
        const options = {method: 'DELETE'}
        fetch(
          "https://le-cine-backend.herokuapp.com/api/v1/meetings/" +
            meetingObj.id,
          options
        ).then((res) => res.json());
    }

    render() {
        return(
            <React.Fragment>
            {this.state.meetings ?
                <React.Fragment>
                    <div className="page-normal-margin">
                        {this.getMeetings()}
                    </div>
                </React.Fragment>
                :null }
                </React.Fragment>
        )
    }
}

export default UpcomingMeetings