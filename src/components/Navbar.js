import React, {Component} from "react";


import {Link} from "react-router-dom";

class Navbar extends Component{



    render() {

        return (
            <div id="bar">
                <Link to="/Playercards" id="linkText">Cards</Link>
                <Link to="/Agents" id="linkText">Agents</Link>
                <Link to="/Home" id="linkText">Home</Link>
                <Link to="/Maps" id="linkText">Maps</Link>
                <Link to="/Weapons" id="linkText">Weapons</Link>
            </div>
        );

    }

}





export default Navbar