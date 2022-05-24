import React, { Component } from 'react';
// import { Switch, Route } from 'react-router-dom';
import './App.css';
import logo from './trivia.png';

// apenas para o push
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header>
      </div>
    )
  }
}
