import React from 'react'
import {connect } from 'react-redux'

function TripContainer(props){
    return(
        <div>
            Trip Container Page
        </div>
    )
}

const mapStateToProps = state => {
    return {
        trip: state.selectedTripReducer.trip
    }
}

export default connect(mapStateToProps)(TripContainer)