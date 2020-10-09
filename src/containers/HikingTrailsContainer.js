import React from 'react'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api'
import TrailSearch from '../components/TrailSearch'
import HikingTrailsCollection from '../containers/HikingTrailsCollection'
import tempData from '../tempData'

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
    const [hikingTrails, setHikingTrails] = React.useState(tempData.trails)

    const searchResults = (lat, lng) => {
        console.log(tempData)
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
        lat: 39.9527,
        lng: -105.2313
    }

    if(loadError) return "Error Loading Map"
    if(!isLoaded) return "Loading Maps"

    return(
        <div>
            <TrailSearch searchResults={searchResults} panTo={panTo} />
            <div>
                <button onClick={list}>List</button>
                <button onClick={map}>Map</button>
            </div>
            {mapView ? 
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
                    <div>
                        <h2>{selected.name}</h2>
                    </div>
                </InfoWindow> : null}
            </GoogleMap>
            :
            <HikingTrailsCollection hikingTrails={hikingTrails}/>
            }
            
        </div>
    )
}

export default HikingTrailsContainer