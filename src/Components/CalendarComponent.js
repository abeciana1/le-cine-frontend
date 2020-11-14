import React from 'react'
import moment from 'moment'
import MediaQuery from 'react-responsive'

const CalendarComponent = (props) => {
        return (
            <React.Fragment>
            <MediaQuery maxWidth={999}>
                <div style={{"width": "120px", "marginLeft":"20px", "paddingTop":"20px"}}>
                    <div style={{"border": "1px solid black"}}>
                        <div style={{"color":"white", "backgroundColor": "red", "textAlign":"center"}}>
                            <h4><strong>{moment(props.meeting.date).format('MMM YYYY')}</strong></h4>
                        </div>
                        <div style={{"textAlign":"center", "paddingTop": "2px", "paddingBottom": "2px"}}>
                            <h1 style={{"fontSize":"60px"}}><strong>{moment(props.meeting.date).format('D')}</strong></h1>
                        </div>
                    </div>
                </div>
            </MediaQuery>
            <MediaQuery minWidth={1000}>
                <div style={{"width": "15%", "marginLeft":"20px", "marginTop": "50px"}}>
                    <div style={{"border": "1px solid black"}}>
                        <div style={{"color":"white", "backgroundColor": "red", "textAlign":"center"}}>
                            <h4><strong>{moment(props.meeting.date).format('MMMM YYYY')}</strong></h4>
                        </div>
                        <div style={{"textAlign":"center", "paddingTop": "5px", "paddingBottom": "5px"}}>
                            <h1 style={{"fontSize":"60px"}}><strong>{moment(props.meeting.date).format('D')}</strong></h1>
                        </div>
                    </div>
                </div>
                </MediaQuery>
            </React.Fragment>
        )
    }

export default CalendarComponent