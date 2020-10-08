import React from 'react';

const BackgroundImage = () => {
    return(
        <div style={{"textAlign": "center", "zIndex": "-1"}}>
            <img style={{"zIndex": "-1", "height": "1357px"}} src={process.env.PUBLIC_URL + '/images/background-graphic.png'} alt="Bauhaus background"/>
        </div>
    )
}

export default BackgroundImage