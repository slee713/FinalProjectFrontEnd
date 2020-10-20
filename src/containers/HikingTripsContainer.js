import React, { useEffect } from 'react' 
import { connect, useDispatch } from 'react-redux'
import {fetchingHikingTrips} from '../redux/actions'
import TripCard from '../components/TripCard'

function HikingTripsContainer(props){

    const dispatch = useDispatch()

    useEffect(()=>{
        let fetchingTrips = setInterval(()=>{
            props.fetchingHikingTrips()
        }, 1000)

        return () => {
            clearInterval(fetchingTrips)
        }
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