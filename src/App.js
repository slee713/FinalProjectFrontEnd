import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from './containers/NavBar'
import HikingTrailsContainer from './containers/HikingTrailsContainer'
import HikingTripsContainer from './containers/HikingTripsContainer'
import HikingTrailPage from './containers/HikingTrailPage'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path='/' render={(routerProps) => <HikingTrailsContainer {...routerProps} />}/>
        <Route exact path='/trail/:id' render={(routerProps) => <HikingTrailPage  {...routerProps}/>}/>
        <Route exact path='/mytrips' render={(routerProps) => <HikingTripsContainer {...routerProps}/>}/>
      </Switch>
      
    </BrowserRouter>
  );
}

export default App;
