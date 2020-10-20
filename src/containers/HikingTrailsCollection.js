import React from 'react'
import TrailCard from '../components/TrailCard'
import './HikingTrailsCollection.css'


function HikingTrailsCollection(props){

    return(
        <div className="trails-container">
            {props.hikingTrails.map(trail => 
                <div className="trail-card">
                    <TrailCard key={trail.id} trail={trail}/>
                </div>
            )}
        </div>
    )
}



export default HikingTrailsCollection