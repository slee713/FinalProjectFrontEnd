import React, { useEffect } from 'react' 
import { connect } from 'react-redux'
import {fetchingHikingTrips} from '../redux/actions'
import TripCard from '../components/TripCard'

function HikingTripsContainer(props){

    useEffect(()=>{
        props.fetchingHikingTrips()
    }, [])

   

    return (
        <div>
            {props.trips.map(trip => 
                <div>
                    <TripCard key={trip.id} trip={trip}/>
                </div>
            )}
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
        fetchingHikingTrips: () => dispatch( fetchingHikingTrips() ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HikingTripsContainer)