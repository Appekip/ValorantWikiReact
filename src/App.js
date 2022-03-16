import React from "react";
import './App.css';
import Navbar from "./components/Navbar";
import Playercards from "./components/Playercards";
import Agents from "./components/Agents";
import Maps from "./components/Maps";
import Weapons from "./components/Weapons";
import Home from "./components/Home";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {

  return (
        <Router>
            <div className="App">
                <header className="App-header">
                        <div id="Content">
                        <Switch>
                            <Route path="/Home">
                                <Home/>
                            </Route>

                            <Route path="/Playercards">
                                <Playercards/>
                            </Route>

                            <Route path="/Maps">
                                <Maps/>
                            </Route>

                            <Route path="/Agents">
                                <Agents/>
                            </Route>

                            <Route path="/Weapons">
                                <Weapons/>
                            </Route>

                        </Switch>
                    </div>

                    <div id="Nav">
                        <Navbar/>
                    </div>


                </header>
            </div>
        </Router>
  );
}





export default App;
