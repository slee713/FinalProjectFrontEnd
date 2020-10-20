import React from 'react'
import { connect } from 'react-redux'
import NewTripForm from '../components/NewTripForm'
import './HikingTrailPage.css'

function HikingTrailPage(props){
    

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
    } = props.trail


    return (
        <div className="trail-body">
            <img src = {imgMedium}/>
            <div className="trail-details">
                <h1>{name}</h1>
                <p>Location: {location}</p>
                <p>Total Length: {length} miles</p>
                <p>Difficulty: {difficulty}</p>
                <div className="ascent-descent">
                    <p>Ascent: {ascent} FT</p>
                    <p className="total">Descent: {descent} FT </p>
                </div>
                <div className="ascent-descent">
                    <p>Highest Elevation: {high} FT</p>
                    <p className="max">Lowest Elevation: {low} FT</p>
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
                <div>
                    {props.loggedIn ? 
                    <NewTripForm trailid={id}/> : null}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        trail: state.selectedTrailReducer.selectedTrail,
        loggedIn: state.loginReducer.loggedIn
    }
}

export default connect(mapStateToProps)(HikingTrailPage)