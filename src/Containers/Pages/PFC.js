import React from 'react';

const PFC = () => {
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

export default PFC