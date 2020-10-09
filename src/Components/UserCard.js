import React from 'react';

// const formatBirthday = (props) => {
//     let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//     return console.log(props.user.birthday.toLocaleDateString("en-US", options))
// }

const UserCard = (props) => {
    return(
        <React.Fragment>
            <img src={props.user.image} alt="user-profile-pic" style={{"borderRadius":"60px", "height": "100px"}} />
            <br />
            <br />
            <h3>{props.user.first_name} {props.user.last_name}</h3>
            {/* ADD BIRTHDAY HERE */}
        </React.Fragment>
    )
}

export default UserCard