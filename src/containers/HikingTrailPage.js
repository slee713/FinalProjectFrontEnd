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
                {props.logged_in ? 
                <NewTripForm trail={props.trail}/> : null}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        trail: state.selectedTrailReducer.selectedTrail,
        logged_in: state.loginReducer.logged_in
    }
}

export default connect(mapStateToProps)(HikingTrailPage)