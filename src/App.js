import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from './containers/NavBar'
import HikingTrailsContainer from './containers/HikingTrailsContainer'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path='/' render={(routerProps) => <HikingTrailsContainer {...routerProps} />}/>
      </Switch>
      
    </BrowserRouter>
  );
}

export default App;
