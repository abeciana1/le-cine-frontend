import React from 'react'
import ClubIndexListing from '../../Components/ClubIndexListing'
import { Row } from 'react-bootstrap'

class ClubsAll extends React.Component {

    getMyClubs = () => {
        return this.props.userClubs.map(userClub => <ClubIndexListing key={userClub.id} userClub={userClub} clubId={userClub.club_id} />)
    }

    render () {
        return(
            <React.Fragment>
                <div className="page-normal-margin">
                    <h1>All My Clubs</h1>
                    <br />
                    <br />
                    <div style={{"zIndex": "3", "backgroundColor": "#EFEFEF", "width": "80%", "paddingTop": "30px", "paddingBottom": "30px"}}>
                        <div style={{"marginLeft" : "20px",}}>
                            <Row>
                                {this.getMyClubs()}
                            </Row>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            // : null }
            // </React.Fragment>
        )
    }
}

export default ClubsAll