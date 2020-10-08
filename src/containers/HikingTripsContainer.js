import React, { useEffect } from 'react' 
import { connect } from 'react-redux'
import {fetchingHikingTrips} from '../redux/actions'

function HikingTripsContainer(props){

    useEffect(()=>{
        props.fetchingHikingTrips()
    }, [])

    return (
        <div>
            HikingTripsContainer
        </div>
    )
}

const mapStateToProps = state => {
    return {
        trips: state.userTripsReducer.trips,
        url: state.urlReducer.URL
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchingHikingTrips: () => dispatch( fetchingHikingTrips() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HikingTripsContainer)