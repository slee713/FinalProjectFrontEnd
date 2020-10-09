const URL = "http://localhost:3000/api/v1/"
const HikingProjURL = "https://www.hikingproject.com/data/get-trails-by-id?ids="

function fetchedHikingTrips(hikingTrips){
    return {type: "FETCHED_USER_TRIPS", payload: hikingTrips}
}

function fetchingHikingTrips(){
    return (dispatch) => {
        fetch(URL + 'hiking_trips', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(res => res.json())
        .then(hikingTrips => {
            dispatch(fetchedHikingTrips(hikingTrips))
        })
    }
}

function setSelectedTrip(hiking_trip){
    return {type: "SELECT_TRIP", payload: hiking_trip}
}


function creatingHikingTrip(e, id){
    return (dispatch) => {
        fetch(URL+'/hiking_trips', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                hiking_project_id: id,
                name: e.target.name.value,
                start_date: e.target.start_date.value,
                end_date: e.target.end_date.value,
                description: e.target.description.value,
            })
        })
        .then(res => res.json())
        .then(hikingTrip => {
            if (hikingTrip.error)
                alert(hikingTrip.error)
            else
                dispatch(setSelectedTrip(hikingTrip))
        })
    }
}


function loadTrailData(trail){
    return {type: "LOAD_TRAIL", payload: trail}
}

function fetchingTrailData(hiking_project_id){
    return (dispatch) => {
        fetch(HikingProjURL+`${hiking_project_id}&key=${process.env.REACT_APP_HIKING_PROJECT_API}`)
        .then(res => res.json())
        .then(resp => {
            dispatch(loadTrailData(resp.trails[0]))
        })
    }
}



export { fetchingHikingTrips, creatingHikingTrip, fetchingTrailData }