import React from 'react'
import {useSelector} from 'react-redux'

function TrailInfo(props) {

    const trail = useSelector(state => state.trailInfoReducer.trail)

    const {id, 
        name, 
        stars, 
        location, 
        length, 
        imgMedium, 
        ascent, 
        descent,
        high,
        low,
        difficulty,
        summary,
        conditionStatus,
        conditionDetails,
        conditionDate, 
        url
    } = trail

    return (
        <div className="trail-info-body">
            <div className="trail-info-details">
                <h1>{name}</h1>
                <p>Location: {location}</p>
                <p>Total Length: {length} miles</p>
                <p>Difficulty: {difficulty}</p>
                <div className="row">
                    <div >
                        <p>Ascent: {ascent} FT</p>
                        <p>Highest Elevation: {high} FT</p>
                    </div>
                    <div >
                        <p >Descent: {descent} FT </p>
                        <p >Lowest Elevation: {low} FT</p>
                    </div>
                </div>
                
                <p>Summary
                    <ul>
                        <li>
                                {summary}
                        </li>
                    </ul>
                </p>
                <p>Condition Status:     {`${conditionStatus} - ${conditionDetails}`}</p>
                <p>Last Reported: {conditionDate}</p>
            </div>
        </div>
    )
}

export default TrailInfo