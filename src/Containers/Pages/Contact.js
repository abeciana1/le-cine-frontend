import React from 'react';
// import Footer from '../Components/Footer'

const Contact = (props) => {
    return (
        <React.Fragment>
            <div className="page-container">
        <div className="page-left">
            <aside>
                <h1 style={{"fontSize": "100px", "marginTop": "200px"}}>Contact</h1>
            </aside>
        </div>
        <div className="page-middle">
            <div className="page-body">
                ADD COPY
            </div>
        </div>
        <div className="page-right">
            
            <img id="lightbulb-gif" src={process.env.PUBLIC_URL + './images/ezgif.com-video-to-gif (9).gif'} alt="abstract design" />
        </div>
        {/* <Footer /> */}
    </div>
        </React.Fragment>
    )
}

export default Contact