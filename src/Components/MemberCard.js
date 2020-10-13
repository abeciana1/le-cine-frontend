import React from 'react'
import { Row, Col } from 'react-bootstrap'

class MemberCard extends React.Component {
    render() {
        return(
            <React.Fragment>
            {this.props.user ?
            <React.Fragment>
                <div style={{"marginLeft": "20px", "marginRight": "20px"}}>
                    <div style={{"backgroundColor": "white", "paddingTop":"40px", "paddingBottom":"40px"}}>
                        <div style={{"marginLeft": "20px", "paddingRight": "40px"}}>
                                <Row>
                                    <Col xs lg="2">
                                        <img src={this.props.member.image} alt="user profile pic" style={{"height":"150px", "borderRadius":"70px"}} />
                                    </Col>
                                    <Col sm={2}></Col>
                                    <Col>
                                        <h2>{this.props.member.first_name} {this.props.member.last_name}</h2>
                                        <br />
                                        {this.props.club.host_id === this.props.user.id ? 
                                        <div>
                                            <p>{this.props.member.email}</p>
                                            <button className="read-more-btn">Email {this.props.member.first_name}</button>
                                            <button className="read-more-btn" style={{"marginLeft":"20px"}}>Remove Member</button>
                                        </div>
                                        :
                                        null
                                        }
                                    </Col>
                                </Row>
                        </div>
                    </div>
                    <br />
                </div>
            </React.Fragment>
            :
            null
            }
            </React.Fragment>
        )
    }
}

export default MemberCard