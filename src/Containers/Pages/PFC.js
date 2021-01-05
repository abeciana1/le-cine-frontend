import React from 'react';

class PFC extends React.Component{

    state = {
        club: null,
        meetings: null
    }

    componentDidMount = () => {
        // let params = {clubName:"PRIVATE CLUB"}
        // let params = { clubName:  };
        // const url = new URL("https://localhost:4000/find-club-by-name")
        // debugger
        // url.search = new URLSearchParams(params).toString();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                name: "PRIVATE CLUB"
            })
        }
        fetch("http://localhost:4000/api/v1/find-club-by-name", options)
        .then(res => res.json())
        .then(data => {
            this.setState({
                club: data,
                meetings: data.meetings
            }, ()=> this.sortMeetings())
        })
    };

    sortMeetings = () => {

        let sortedArr = this.state.meetings.sort(function (a, b) {
        return a.age - b.age;
        }); // Sort by age (lowest first)
        console.log(sortedArr)
    };
    

    render() {
        console.log(this.state)
        return (
            <>
                <div className="page-normal-margin">
                    <h1>Pandemic Film Club</h1>
                </div>
                <div style={{"textAlign": "center", "marginTop":"50px"}}>
                    <img src={process.env.PUBLIC_URL + '../../../images/pandemic-film-club.gif'} alt="Pandemic Film Club intro" style={{"width":"600px"}} />
                </div>
                <div style={{ "textAlign": "center", "marginTop": "50px" }}>
                    <h1>area to signup for sms and/or email notifications</h1>
                    ================================================================
                    <h1>area to promote next meeting
                            <br />
                        <em>if signed in user - can see link and enter meeting page</em> 
                    </h1>
                    ================================================================                
                    <h1>
                        column, row of past movies shown
                    </h1>
                </div>
            </>
        )
    }
}

export default PFC