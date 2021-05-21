import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Mensajes from './pages/Mensajes/Mensajes.page';
import Login from './pages/Login/Login.page'; 
import { RoutePropio } from './components/RoutePropio/RoutePropio.component';

function App(props) {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>ReactJS | Imagina Formación</h1>
        </header>
        <div className="App-body">
          <RoutePropio exact path="/"><Login /></RoutePropio>
          <RoutePropio exact path="/mensajes"><Mensajes/></RoutePropio> 
        </div>
      </div>
    </Router>
  );
}

export default App;
