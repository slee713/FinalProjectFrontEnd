import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from './containers/NavBar'
import HikingTrailsContainer from './containers/HikingTrailsContainer'
import HikingTripsContainer from './containers/HikingTripsContainer'
import HikingTrailPage from './containers/HikingTrailPage'
import TripContainer from './containers/TripContainer'
import ProfilePage from './containers/ProfilePage'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path='/' render={(routerProps) => <HikingTrailsContainer {...routerProps} />}/>
        <Route exact path='/trail/:id' render={(routerProps) => <HikingTrailPage  {...routerProps}/>}/>
        <Route exact path='/mytrips' render={(routerProps) => <HikingTripsContainer {...routerProps}/>}/>
        <Route exact path='/mytrips/:id' render={ (routerProps) => <TripContainer {...routerProps}/>}/>
        <Route exact path='/profile' render={ (routerProps) => <ProfilePage {...routerProps}/>}/>
      </Switch>
      
    </BrowserRouter>
  );
}

export default App;
