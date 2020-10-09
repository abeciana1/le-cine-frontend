import React from 'react'
import UserCard from '../Components/UserCard'

const UserContainer = (props) => {
    return (
        <div>
            <div style={{"zIndex": "3", "backgroundColor": "#EFEFEF", "width": "40%", "textAlign": "center", "paddingTop": "40px", "paddingBottom": "40px"}}>
                <UserCard user={props.user} />
            </div>
        </div>
    )
}

export default UserContainer