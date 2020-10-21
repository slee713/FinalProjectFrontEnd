import React, {useEffect} from 'react'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api'
import { useSelector, useDispatch } from 'react-redux'
import TrailSearch from '../components/TrailSearch'
import HikingTrailsCollection from '../containers/HikingTrailsCollection'
import {
    fetchingTrails
} from '../redux/actions'
import tempData from '../tempData'
import './HikingTrailsContainer.css'

const libraries = ["places"]
const mapContainerStyle={
    width: '100vw',
    height: '100vh'
}

function HikingTrailsContainer(props){
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY_MOD_5,
        libraries
    })
    const [mapView, setMapView] = React.useState(false)
    const [lat , setLat] = React.useState(38.889248)
    const [lng, setLng] = React.useState(-77.050636)
    const dispatch = useDispatch()
    const hikingTrails = useSelector(state => state.hikingTrailsReducer.trails)

    useEffect(()=>{
        // dispatch(fetchingTrails(38.889248, -77.050636))
    },[])

    const searchResults = (lat, lng) => {
        setLat(lat)
        setLng(lng)
        dispatch(fetchingTrails(lat, lng))
    }

    const list= () => {
        setMapView(false)
    }

    const map = () => {
        setMapView(true)
    }
    
    const [selected, setSelected] = React.useState(null)

    const mapRef = React.useRef()

    const onMapLoad = React.useCallback(map=> {
        mapRef.current = map
    }, [])

    const panTo = React.useCallback(({lat,lng}) => {
        mapRef.current.panTo({lat,lng})
        mapRef.current.setZoom(13)
    }, [])

    const center = {
        lat: lat,
        lng: lng
    }

    if(loadError) return "Error Loading Map"
    if(!isLoaded) return "Loading Maps"

   

    

    return(
        <div>
            <div className="search-container">
                
                <TrailSearch searchResults={searchResults} panTo={panTo} />
            
                <div className="buttons">
                    <button onClick={list}>List</button>
                    <button onClick={map}>Map</button>
                </div>
            </div>
            {mapView ? 
            <div className="map">
                <GoogleMap 
                    mapContainerStyle={mapContainerStyle} 
                    zoom={11}
                    center={center}
                    onLoad={onMapLoad}
                >
                    {hikingTrails.map(trail => 
                        <Marker 
                            key={trail.id}
                            position={{
                                lat: trail.latitude,
                                lng: trail.longitude
                            }}
                            onClick={()=> setSelected(trail)}
                        />)}
                    {selected ? 
                    <InfoWindow 
                        position={{lat: parseFloat(selected.latitude), lng: parseFloat(selected.longitude)}}
                        onCloseClick={()=> setSelected(null)}>
                        <div className="info-window">
                            <img src={selected.imgSqSmall}/>
                            <div>
                                <h2>{selected.name}</h2>
                                <p>Distance: {selected.length} miles</p>
                                <p>Rating: {selected.stars}</p>
                            </div>
                        </div>
                    </InfoWindow> : null}
                </GoogleMap>
            </div>
            :
            <HikingTrailsCollection hikingTrails={hikingTrails}/>
            }
            
        </div>
    )
}

export default HikingTrailsContainer