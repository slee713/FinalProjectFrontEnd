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
        // fetch(HikingProjURL+`${hiking_project_id}&key=${process.env.REACT_APP_HIKING_PROJECT_API}`)
        // .then(res => res.json())
        // .then(resp => {
        //     dispatch(loadTrailData(resp.trails[0]))
        // })
    }
}

function updateHikingTripInfo(hiking_trip){
    return {type: "UPDATED_TRIP", payload: hiking_trip}
}

function updatingHikingTripInfo(id, hiking_project_id, name, start_date, end_date, description){
    return (dispatch) => {
        fetch(URL+`hiking_trips/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                name,
                hiking_project_id,
                start_date,
                end_date,
                description
            })
        })
        .then(res => res.json())
        .then(updatedTrip => {
            dispatch(updateHikingTripInfo(updatedTrip))
        })
    }
}


function addedGroupGearItem(item){
    return {type: "ADD_GROUP_ITEM", payload: item}
}

function addingGroupGearItem(name, qty, notes, hiking_trip_id){
    return (dispatch) => {
        fetch(URL+`group_gear_items?hiking_trip_id=${hiking_trip_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                name,
                qty,
                notes
            })
        })
        .then(res => res.json())
        .then(newGroupItem => {
            
            dispatch(addedGroupGearItem(newGroupItem))
        })
    }
}

function updatedGroupGearItem(item){
    return {type: "UPDATE_GROUP_ITEM", payload: item}
}

function updatingGroupGearItem(id, name, qty, notes){
    return (dispatch) => {
        fetch(URL+`group_gear_items/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                name,
                qty,
                notes
            })
        })
        .then(res => res.json())
        .then(updatedGroupItem => {
            dispatch(updatedGroupGearItem(updatedGroupItem))
        })
    }
}


function deletedGroupGearItem(id){
    return {type: 'DELETE_GROUP_ITEM', payload: id}
}

function deletingGroupGearItem(id){
    return (dispatch) => {
        fetch(URL+`group_gear_items/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
        }})
        .then( 
            dispatch(deletedGroupGearItem(id))
        )
    }
}

function addedPersonalItem(item){
    return {type: "ADD_PERSONAL_ITEM", payload: item}
}

function addingPersonalItem(name, qty, notes){
    return (dispatch) => {
        fetch(URL + `personal_gear_items`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                name,
                qty,
                notes
            })
        })
        .then(resp => resp.json())
        .then(newItem => addedPersonalItem(newItem))
    }
}

function updatedPersonalItem(item){
    return {type: "UPDATE_PERSONAL_ITEM", payload: item}
}

function updatingPersonalItem(id, name, qty, notes){
    return (dispatch) => {
        fetch(URL+`personal_gear_items/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                name,
                qty, 
                notes
            })
        })
        .then(res => res.json())
        .then(updatedItem => dispatch(updatedPersonalItem(updatedItem)))
    }
}

function deletedPersonalItem(id){
    return {type: 'DELETE_PERSONAL_ITEM', payload: id}
}

function deletingPersonalItem(id){
    return (dispatch) => {
        fetch(URL+`personal_gear_items/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(dispatch(deletedPersonalItem(id)))
    }
}





export { 
    fetchingHikingTrips, 
    creatingHikingTrip, 
    fetchingTrailData, 
    updatingHikingTripInfo , 
    addingGroupGearItem,
    updatingGroupGearItem,
    deletingGroupGearItem,
    addingPersonalItem,
    updatingPersonalItem,
    deletingPersonalItem
}