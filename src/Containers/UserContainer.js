import React from 'react'
import UserCard from '../Components/UserCard'
import MediaQuery from 'react-responsive'

const UserContainer = (props) => {
    return (
        <div>
            <MediaQuery maxWidth={999}>
                <div style={{"zIndex": "3", "backgroundColor": "#EFEFEF", "width": "100%", "textAlign": "center", "paddingTop": "40px", "paddingBottom": "40px"}}>
                <UserCard user={props.user} />
                </div>
            </MediaQuery>
            <MediaQuery minWidth={1000}>
            <div style={{"zIndex": "3", "backgroundColor": "#EFEFEF", "width": "40%", "textAlign": "center", "paddingTop": "40px", "paddingBottom": "40px"}}>
                <UserCard user={props.user} />
            </div>
            </MediaQuery>
        </div>
    )
}

export default UserContainer