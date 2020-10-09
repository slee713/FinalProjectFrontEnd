import React, { useEffect } from 'react'
import {connect } from 'react-redux'
import './TripContainer.css'
import { fetchingTrailData } from '../redux/actions'
import TrailInfo from '../components/TrailInfo'
import GearList from '../components/GearList'
import FoodPlan from '../components/FoodPlan'
import RoutePlan from '../components/RoutePlan'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api'

import EditHikingTripForm from '../components/EditHikingTripForm'

const mapContainerStyle = {
    width: '40vw',
    height: '40vh'
}
const libraries=['places']


function TripContainer(props){
    const [view, setView] = React.useState('trail')

    const { hiking_project_id , id,  name, start_date, end_date, description, group_gear_items, stops, users} = props.trip

    const {latitude , longitude, location } = props.trail

    useEffect(()=>{
        // props.fetchTrailData(props.trip.hiking_project_id)
    }, [])

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY_MOD_5,
        libraries
    })
    




    const mapRef = React.useRef()

    const onMapLoad = React.useCallback(map=> {
        mapRef.current = map
    }, [])
    const center = {
        lat: latitude,
        lng: longitude
    }
    if(loadError) return "Error Loading Map"
    if(!isLoaded) return "Loading Maps"

    return(
        <div className="body">
            <div className="tripInfo">
                <div className="general">
                    <div className="info">
                        <div className= 'header'>
                            <h3>{name}</h3>
                            <div>
                                <EditHikingTripForm/>
                                <p>Delete</p>
                            </div>
                        </div>
                        <p>Location: {location}</p>
                        <p>Start Date: {start_date}</p>
                        <p>End Date: {end_date}</p>
                        <p>Description:</p>
                        <p>{description}</p>
                    </div>
                    <div className="maps">
                    <GoogleMap 
                        mapContainerStyle={mapContainerStyle} 
                        zoom={11}
                        center={center}
                        onLoad={onMapLoad}
                    >  
                        <Marker 
                            position={{
                                lat: latitude,
                                lng: longitude
                            }}
                        />
                     </GoogleMap>
                    </div>
                </div>
                <div className="tripNavBar">
                    <p onClick={()=> setView('trail')}>Trail Info</p>
                    <p onClick={()=> setView('gear')}>Gear List</p>
                    <p onClick={()=> setView('food')}>Food Plan</p>
                    <p onClick={()=> setView('route')}>Route Plan</p>
                </div>
                <div className="displayWindow">
                    { view === 'trail' ? <TrailInfo /> :
                     view === 'gear' ? <GearList  /> :
                     view === 'food' ? <FoodPlan /> :
                     view === 'route' ? <RoutePlan /> : null
                    }
                </div>
            </div>
            <div className="chatFeature">

            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        trip: state.selectedTripReducer.trip,
        trail: state.trailInfoReducer.trail
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // fetchTrailData: (id) => dispatch(fetchingTrailData(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripContainer)