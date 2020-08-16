import React from "react";
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './Components/Login.js';
import Signup  from './Components/Signup.js';
import Stock from './Components/Stock.js';
import Company from './Components/Company.js';

function App(){
  return(
    <Router>
       <Route exact path ="/" component = {Login}/>
       <Route path = "/signup" component = {Signup}/>
       <Route path = "/stock" component = {Stock}  />
       <Route path = "/company" component = {Company}/>
    </Router>
  )
 
}

export default App;

