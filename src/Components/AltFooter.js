import React from 'react';

const AltFooter = () => {
    return(
        <footer style={{"bottom": "0", "width": "100%", "paddingTop": "50px", "zIndex": "1"}}>
            <div className="footer">
            <div style={{"marginLeft": "50px", "marginRight": "50px", "paddingTop": "50px"}}>
                <h1>Le Cine</h1>
                <a href="/about" style={{"textDecoration": "none", "color": "black", "fontSize": "20px"}}>About Us</a>
                <br />
                <a href="/contact" style={{"textDecoration": "none", "color": "black", "fontSize": "20px"}}>Contact Us</a>
            </div>
            </div>
        </footer>
    )
}

export default AltFooter