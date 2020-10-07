import React from 'react'
import HikingTrailsCollection from './HikingTrailsCollection'

function HikingTrailsContainer(props){
    return(
        <div className="hikingTrailsContainer">
            <h1>search</h1>
            <HikingTrailsCollection/>
        </div>
    )
}

export default HikingTrailsContainer