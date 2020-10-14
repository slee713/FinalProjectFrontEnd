import React from 'react'
import { connect } from 'react-redux'
import NewTripForm from '../components/NewTripForm'


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
        <div>
            <div>
                {name}
            </div>
            <div>
                {props.loggedIn ? 
                <NewTripForm trailid={id}/> : null}
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