"use strict"
import React from 'react';

class Footer extends React.Component{
    render(){
        return(
            <footer className="footer text-center">
                <div className="container">
                    <p className="footer-text"> Made with React-Bootstrap + Redux. </p>
                </div>
            </footer>
        );
    }
}
export default Footer