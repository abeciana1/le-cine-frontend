import React from 'react'
import { Row, Col } from 'react-bootstrap'
import MediaQuery from 'react-responsive'

class MemberCard extends React.Component {

    state = {
        member: null
    }

    componentDidMount() {
        fetch("http://localhost:3000/api/v1/users/" + this.props.memberId)
        .then(res => res.json())
        .then(data => {
            this.setState({ member: data})
        })
    }

    removeHandler = (e) => {
        this.props.removeHandler(this.props.userClubId)
    }


    render() {
        return(
            <React.Fragment>
            {this.state.member ?
            <React.Fragment>
            <MediaQuery maxWidth={999}>
            <div style={{"marginLeft": "20px", "marginRight": "20px"}}>
                    <div className="card-white">
                        <div style={{"marginLeft": "20px", "paddingRight": "40px"}}>
                                <Row>
                                    <Col xs lg="2">
                                        <img src={this.state.member.image} alt="user profile pic" style={{"height":"150px", "borderRadius":"70px"}} />
                                    </Col>
                                    <Col sm={2}></Col>
                                    <Col>
                                        {this.props.club.host_id === this.props.user.id ? 
                                        <div>
                                        <h2>{this.state.member.first_name} {this.state.member.last_name}</h2>
                                        <br />
                                            <p>{this.state.member.email}</p>
                                            <a href={"mailto:" + this.state.member.email}>
                                                <button className="read-more-btn">Email {this.state.member.first_name}</button>
                                            </a>
                                            <br />
                                            <br />
                                            <button onClick={this.removeHandler} className="read-more-btn">Remove Member</button>
                                        </div>
                                        :
                                        <>
                                        <br />
                                        <br />
                                        <h2>{this.state.member.first_name} {this.state.member.last_name}</h2>
                                        </>
                                        }
                                    </Col>
                                </Row>
                        </div>
                    </div>
                    <br />
                </div>
            </MediaQuery>
            <MediaQuery minWidth={1000}>
                <div style={{"marginLeft": "20px", "marginRight": "20px"}}>
                    <div className="card-white">
                        <div style={{"marginLeft": "20px", "paddingRight": "40px"}}>
                                <Row>
                                    <Col xs lg="2">
                                        <img src={this.state.member.image} alt="user profile pic" style={{"height":"150px", "borderRadius":"70px"}} />
                                    </Col>
                                    <Col sm={2}></Col>
                                    <Col>
                                        {this.props.club.host_id === this.props.user.id ? 
                                        <div>
                                        <h2>{this.state.member.first_name} {this.state.member.last_name}</h2>
                                        <br />
                                            <p>{this.state.member.email}</p>
                                            <a href={"mailto:" + this.state.member.email}>
                                                <button className="read-more-btn">Email {this.state.member.first_name}</button>
                                            </a>
                                            <button onClick={this.removeHandler} className="read-more-btn" style={{"marginLeft":"20px"}}>Remove Member</button>
                                        </div>
                                        :
                                        <>
                                        <br />
                                        <br />
                                        <h2>{this.state.member.first_name} {this.state.member.last_name}</h2>
                                        </>
                                        }
                                    </Col>
                                </Row>
                        </div>
                    </div>
                    <br />
                </div>
                </MediaQuery>
            </React.Fragment>
            :
            null
            }
            </React.Fragment>
        )
    }
}

export default MemberCard