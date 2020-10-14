import React from 'react'
import MyClubsContainer from '../MyClubsContainer'
import HostClubsContainer from '../HostClubsContainer'
import LoadingComponent from '../../Components/LoadingComponent'


class ClubsGeneral extends React.Component {

    render(){
        return(
            <React.Fragment>
            {this.props.user ? 
            <React.Fragment>
                <div style={{"marginLeft": "50px", "marginTop": "50px", "marginRight": "50px"}}>
                    <br />
                    <br />
                    <MyClubsContainer user={this.props.user} />
                    <br />
                    <br />
                    <HostClubsContainer user={this.props.user} />
                    <div style={{"paddingTop": "100px"}}></div>
                </div>
            </React.Fragment>
                :
                <LoadingComponent />
            }
            </React.Fragment>
        )
    }
}

export default ClubsGeneral