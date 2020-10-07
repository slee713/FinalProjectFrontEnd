import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from './containers/NavBar'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      
    </BrowserRouter>
  );
}

export default App;
