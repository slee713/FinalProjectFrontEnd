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
            <div className="trail-content">
                <h5>{name}</h5>
                <div className="trail-row">
                    <div className="trail-col-1">
                        <p><strong>Location:</strong> {location}</p>
                        <p><strong>Total Length:</strong> {length} miles</p>
                        <p><strong>Ascent:</strong> {ascent} FT</p>
                        <p><strong>Highest Elevation:</strong> {high} FT</p>
                        <p><strong>Condition Status:</strong>     {`${conditionStatus} - ${conditionDetails}`}</p>
                    </div>
                    <div className="trail-col-2">
                        <p><strong>Difficulty:</strong> {difficulty}</p>
                        <p ><strong>Descent:</strong> {descent} FT </p>
                        <p ><strong>Lowest Elevation: </strong>{low} FT</p>
                        <br/>
                        <p><strong>Last Reported: </strong>{conditionDate}</p>
                    </div>
                </div>
                <p>Summary
                    <ul>
                        <li>
                            {summary}
                        </li>
                    </ul>
                </p>
            </div>
            
        </div>
    )
}

export default TrailInfo