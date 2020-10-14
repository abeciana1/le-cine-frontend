import React from 'react';

const About = (props) => {
    return (
        <React.Fragment>
        <div>
            <div className="page-container">
        <div className="page-left">
            <aside>
                <h1 style={{"fontSize": "100px", "marginTop": "200px"}}>About</h1>
            </aside>
            
        </div>
        
        <div className="page-middle">
            <div className="page-body" style={{"height":"100%"}}>
                ADD COPY
            </div>
            <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
                    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
        </div>
        <div className="page-right">
            
            <img id="lightbulb-gif" src={process.env.PUBLIC_URL + './images/ezgif.com-video-to-gif (9).gif'} alt="abstract design" />
        </div>
        </div>
        <div style={{"bottom": "0", "left": "0", "marginBottom": "0px"}}>
        </div>
        </div>
    </React.Fragment>
    )
}

export default About