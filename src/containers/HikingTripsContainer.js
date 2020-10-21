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
        <div className="trips-container">
            <div className="trips-container-header">
                 <h1>My Hiking Trips</h1>
                 <div>
                     <label>Sort By</label>
                     <select>
                         <option disabled selected value> -- Select an Option -- </option>
                         <option>Start Date (Earliest to Latest)</option>
                         <option>Start Date (Latest to Earliest)</option>
                     </select>
                 </div>

                 <div>
                     <label>Filter By</label>
                     <select>
                         <option disable selected value>-- Select and Option --</option>
                         <option>Upcoming</option>
                         <option>Past</option>
                     </select>
                 </div>
            </div>
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