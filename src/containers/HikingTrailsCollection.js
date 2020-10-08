import React from 'react'
import TrailCard from '../components/TrailCard'

function HikingTrailsCollection(props){
    return(
        <div>
            {props.hikingTrails.map(trail => 
                <div>
                    <TrailCard trail={trail}/>
                </div>
            )}
        </div>
    )
}

export default HikingTrailsCollection