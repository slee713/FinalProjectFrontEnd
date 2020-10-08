import React from 'react'
import { connect } from 'react-redux'
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
            {name}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        trail: state.selectedTrailReducer.selectedTrail
    }
}

export default connect(mapStateToProps)(HikingTrailPage)