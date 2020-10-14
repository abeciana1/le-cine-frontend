import React from 'react'
import moment from 'moment'

class CalendarComponent extends React.Component {

    // formatDay = () => {
    //     let day = moment(this.props.meeting.date).format('D')
    //     console.log(day)
    //     debugger
    // }

    render(){
        return (
            <React.Fragment>
                <div style={{"width": "15%", "marginLeft":"20px", "marginTop": "50px","position":"absolute", "top":"40px"}}>
                    <div style={{"border": "1px solid black"}}>
                        <div style={{"color":"white", "backgroundColor": "red", "textAlign":"center"}}>
                            <h4><strong>{moment(this.props.meeting.date).format('MMMM')}</strong></h4>
                        </div>
                        <div style={{"textAlign":"center", "paddingTop": "5px", "paddingBottom": "5px"}}>
                            <h1 style={{"fontSize":"60px"}}><strong>{moment(this.props.meeting.date).format('D')}</strong></h1>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default CalendarComponent