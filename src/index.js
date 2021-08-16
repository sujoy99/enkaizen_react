import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import ToDo from "./components/toDo/toDo";

import { Route, BrowserRouter as Router } from "../node_modules/react-router-dom";

const myRouter = (

  <Router>
   

    <Route  exact path="/" component={App}/>
    {/* <Route  path="/about" component={About}/> */}
    <Route  path="/admin" component={ToDo}/>

  </Router>

)

ReactDOM.render(myRouter , document.getElementById('root') );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
