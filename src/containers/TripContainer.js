import React, { useEffect } from 'react'
import {connect } from 'react-redux'
import './TripContainer.css'
import { fetchingTrailData } from '../redux/actions'
import TrailInfo from '../components/TrailInfo'
import GearList from '../components/GearList'
import FoodPlan from '../components/FoodPlan'
import RoutePlan from '../components/RoutePlan'


function TripContainer(props){
    const [view, setView] = React.useState('trail')

    useEffect(()=>{
        props.fetchTrailData(props.trip.hiking_project_id)
    }, [])

    return(
        <div className="body">
            <div className="tripInfo">
                <div className="general">
                    <div className="info">

                    </div>
                    <div className="maps">
                        
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
                     view === 'gear' ? <GearList /> :
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
        fetchTrailData: (id) => dispatch(fetchingTrailData(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripContainer)