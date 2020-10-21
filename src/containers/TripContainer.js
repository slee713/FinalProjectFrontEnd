import React, { useEffect } from 'react'
import {connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './TripContainer.css'
import { fetchingTrailData, deletingHikingTrip, fetchingHikingTrip, fetchingMessages, creatingMessage } from '../redux/actions'
import TrailInfo from '../components/TrailInfo'
import GearTab from '../components/GearTab'
import FoodPlan from '../components/FoodPlan'
import RoutePlan from '../components/RoutePlan'
import AddFriendTrip from '../components/AddFriendTrip'
import {Menu } from 'semantic-ui-react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api'
import MembersList from '../components/MembersList'
import DeleteTripModal from '../components/DeleteTripModal'

import EditHikingTripForm from '../components/EditHikingTripForm'

const mapContainerStyle = {
    width: '20vw',
    height: '20vh'
}
const libraries=['places']


function TripContainer(props){
    const [view, setView] = React.useState('trail')
    // const [page, setPage] = React.useState(1)

    const { hiking_project_id , id,  name, start_date, end_date, description, img, group_gear_items, stops, users} = props.trip

    const {latitude , longitude, location } = props.trail

    useEffect(()=>{
        props.fetchTrailData(hiking_project_id)
        // props.loadMessages(id)
        
        let load = setInterval(()=>{
            props.loadMessages(id)
            // props.loadHikingTrip(id)
        }, 1000)

        return () => {
            clearInterval(load)
            props.resetTrail()
            props.resetMessages()
        }
    }, [])

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY_MOD_5,
        libraries
    })
    
    // const deleteTrip = () => {
    //     props.deleteTrip(props.trip)
    //     props.history.push('/mytrips')
    // }

    const submitMessage = (e) => {
        e.preventDefault()
        props.createMessage(e.target.content.value, id)
        e.target.reset()
    }

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

    // const fetchMoreData = () => {
        
    //     props.loadMessages(id, page+1)
    //     setPage(page +1)
    // }

    return(
        <div className="trip-body"> 
            <div className="tripInfo">
                <img src={img ? img : props.trail.imgMedium}/>
                <div className="general">
                    <div className="info">
                        <div className= 'header'>
                            <h1>{name}</h1>
                            <div className="trip-options">
                                    <AddFriendTrip />
                                    <EditHikingTripForm/>
                                    <DeleteTripModal />
                            </div>    
                        </div>
                        <div className = 'trip-details'>
                            <div className='trip-detail-col'>
                                <div className='detail-row'>
                                    <div className="trip-detail-col2">
                                        <p><strong>Location:</strong> {location}</p>
                                        <p><strong>Description:</strong></p>
                                    </div>
                                    <div className="trip-detail-col2">
                                        <p><strong>Start Date:</strong> {start_date}</p>
                                        <p><strong>End Date:</strong> {end_date}</p>
                                    </div>
                                </div>
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
                    </div>
                </div>
                <div className="tripNavBar">
                    <Menu tabular>
                        <Menu.Item
                            name ="Trail Info"
                            active={view === 'trail'}
                            onClick={()=> setView('trail')}
                        />
                        <Menu.Item
                            name ="Gear List"
                            active={view === 'gear'}
                            onClick={()=> setView('gear')}
                        />
                        <Menu.Item
                            name ="Food Plan"
                            active={view === 'food'}
                            onClick={()=> setView('food')}
                        />
                        <Menu.Item
                            name ="Route Plan"
                            active={view === 'route'}
                            onClick={()=> setView('route')}
                        />
                        <Menu.Item
                            name="Members"
                            active={view === 'members'}
                            onClick={()=> setView('members')}
                        />
                    </Menu>
                    {/* <Menu name onClick={()=> setView('trail')}>Trail Info</Menu>
                    <p onClick={()=> setView('gear')}>Gear List</p>
                    <p onClick={()=> setView('food')}>Food Plan</p>
                    <p onClick={()=> setView('route')}>Route Plan</p> */}
                </div>
                <div className="displayWindow">
                    { view === 'trail' ? <TrailInfo /> :
                     view === 'gear' ? <GearTab  /> :
                     view === 'food' ? <FoodPlan hiking_trip_id={props.trip.id}/> :
                     view === 'route' ? <RoutePlan /> : 
                     view === 'members' ? <MembersList /> : null
                    }
                </div>
            </div>
            <div className="chatFeature">
                <div className = "chat-messages"
                style={{
                    height: '90%',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                  }}>
                    {/* <InfiniteScroll
                        dataLength={props.messages.length}
                        next={() => fetchMoreData()}
                        hasMore={true}
                        style={{ display: 'flex', flexDirection: 'column-reverse' }}
                        inverse={true}
                        loader={<h4>Loading...</h4>}
                        endMessage={<h4>End of Messages</h4>}
                        height={'290px'}
                        scrollableTarget={'chat-messages'}
                    > */}
                        {props.messages.map(msg => 
                            msg.user_hike.user_id == localStorage.id ?
                            <div className="user-chat-message" style={{display: 'flex', flexDirection:  'row-reverse'}}>
                                <img src={msg.user_hike.user.img_url} style={{ 'max-width': '20px', height: 20, 'border-radius': '10px'}}/>
                                <p>{msg.content}</p>
                            </div>:
                            <div className="chat-message" style={{display: 'flex', flexDirection:  'row'}}>
                                <img src={msg.user_hike.user.img_url} style={{ 'max-width': '20px', height: 20}}/>
                                <p>{`${msg.content} - ${msg.user_hike.user.first_name}`}</p>
                            </div>

                        
                        )}

                    {/* </InfiniteScroll> */}
                    
                </div>
                <div className="chat-input">
                    <form onSubmit={(e)=> submitMessage(e)}>
                        <input name="content" type="text" placeholder="Message..."/>
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        trip: state.selectedTripReducer.trip,
        trail: state.trailInfoReducer.trail,
        messages: state.messageReducer.messages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTrailData: (id) => dispatch(fetchingTrailData(id)),
        deleteTrip: (trip) => dispatch(deletingHikingTrip(trip)),
        loadHikingTrip: (id) => dispatch(fetchingHikingTrip(id)),
        loadMessages: (hiking_trip_id, page) => dispatch(fetchingMessages(hiking_trip_id, page)),
        createMessage: (content, hiking_trip_id) => dispatch(creatingMessage(content, hiking_trip_id)),
        resetTrail: () => dispatch({type: "RESET_TRAIL"}),
        resetMessages: () => dispatch({type: "RESET_MSG"})
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TripContainer))