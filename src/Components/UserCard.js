import React from 'react';
import moment from 'moment'

const UserCard = (props) => {
    return(
        <React.Fragment>
            <img src={props.user.image} alt="user-profile-pic" style={{"borderRadius":"100px", "height": "10em"}} />
            <br />
            <br />
            <h3>{props.user.first_name} {props.user.last_name}</h3>
            <h4>{moment(props.user.birthday).format('MMMM Do')}</h4>
        </React.Fragment>
    )
}

export default UserCard