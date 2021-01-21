import React from 'react';
import MediaQuery from 'react-responsive'

const About = (props) => {
    
    return (
      <React.Fragment>
        <MediaQuery maxWidth={999}>
          <div
            style={{
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: "1rem",
              display: "inline",
            }}
          >
            <h1>About Us</h1>
                <div style={{ "fontSize": "20px", "marginLeft": "5px", "marginRight": "5px"}}>                                
                    <div>
                    I'd like to invite you to join me in a weekly odyssey, full of
                    movies and good times and the occasional communal activity.
                    We're not just going to survive, we're going to thrive thanks
                    to the power of the LE CINEMA.
                    </div>
                    <br />
                    <br />
                    <div>
                    Each week, we shall pick a movie we can all watch from a
                    shortlist I'll send out every Saturday afternoon. Ideally
                    it'll be a bit obscure or new so everybody will get to see it
                    with fresh eyes. Then, based on everybody's availability we
                    will use Discord to do a discussion of the film at the end of
                    each week.
                    </div>
                    <br />
                    <br />
                    <em> - Russell Seyfert</em>
                    <br />
                    <br /> 
                    <div style={{ textAlign: "center" }}>
                    <img
                        src={process.env.PUBLIC_URL + "/images/PFC-new-logo.png"}
                        alt="PFC new logo"
                        style={{ width: "400px", border: "1px solid black" }}
                    />
                    </div>
                </div>
          </div>
        </MediaQuery>
        <MediaQuery minWidth={1000}>
          <div>
            <div className="page-container">
              <div className="page-left">
                <aside>
                  <h1 style={{ fontSize: "100px", marginTop: "200px" }}>
                    About
                  </h1>
                </aside>
              </div>

              <div className="page-middle">
                <div style={{ fontSize: "20px" }}>                                
                    <div>
                    I'd like to invite you to join me in a weekly odyssey, full of
                    movies and good times and the occasional communal activity.
                    We're not just going to survive, we're going to thrive thanks
                    to the power of the LE CINEMA.
                    </div>
                    <br />
                    <br />
                    <div>
                    Each week, we shall pick a movie we can all watch from a
                    shortlist I'll send out every Saturday afternoon. Ideally
                    it'll be a bit obscure or new so everybody will get to see it
                    with fresh eyes. Then, based on everybody's availability we
                    will use Discord to do a discussion of the film at the end of
                    each week.
                    </div>
                    <br />
                    <br />
                    <em> - Russell Seyfert</em>
                    <br />
                    <br />
                    <div style={{ textAlign: "center" }}>
                    <img
                        src={process.env.PUBLIC_URL + "/images/PFC-new-logo.png"}
                        alt="PFC new logo"
                        style={{ width: "600px", border: "1px solid black" }}
                    />
                    </div>
                </div>
              </div>
              <div className="page-right">
                <img
                  id="lightbulb-gif"
                  src={
                    process.env.PUBLIC_URL +
                    "./images/ezgif.com-video-to-gif (9).gif"
                  }
                  alt="abstract design"
                />
              </div>
            </div>
            <div style={{ bottom: "0", left: "0", marginBottom: "0px" }}></div>
          </div>
        </MediaQuery>
      </React.Fragment>
    );
}

export default About