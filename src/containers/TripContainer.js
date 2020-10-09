import React from 'react'
import {connect } from 'react-redux'
import './TripContainer.css'


function TripContainer(props){
    return(
        <div className="body">
            <div className="tripInfo">
                <div className="tripNavBar">
                    <p>General Info</p>
                    <p>Gear List</p>
                    <p>Food Plan</p>
                    <p>Route Plan</p>
                </div>
                <div className="displayWindow">

                </div>
            </div>
            <div className="chatFeature">

            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        trip: state.selectedTripReducer.trip
    }
}

export default connect(mapStateToProps)(TripContainer)