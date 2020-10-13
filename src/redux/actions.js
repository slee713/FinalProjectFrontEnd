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
            if (updatedTrip.error)
                alert(updatedTrip.error)
            else
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
            if(newGroupItem.error)
                alert(newGroupItem.error)
            else
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
            if (updatedGroupItem.error)
                alert(updatedGroupItem.error)
            else
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
        .then(newItem => {
            if(newItem.error)
                alert(newItem.error)
            else
                addedPersonalItem(newItem)
        })
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
        .then(updatedItem => {
            if(updatedItem.error)
                alert(updatedItem.error)
            else
                dispatch(updatedPersonalItem(updatedItem))
        })
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

function addedFoodPlan(foodPlan){
    return {type: "ADD_FOOD_PLAN", payload: foodPlan}
}

function addingFoodPlan(day, breakfast, lunch, dinner, snacks, notes, hiking_trip_id){
    return (dispatch) => {
        fetch(URL + `food_plans?hiking_trip_id=${hiking_trip_id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                day,
                breakfast,
                lunch,
                dinner,
                snacks,
                notes
            })
        })
        .then(res => res.json())
        .then(resp => {
            if (resp.error)
                alert(resp.error)
            else
                dispatch(addedFoodPlan(resp))
        })
    }
}

function updatedFoodPlan(foodPlan){
    return {type: "UPDATE_FOOD_PLAN", payload: foodPlan}
}

function updatingFoodPlan(id, day, breakfast,lunch, dinner, snacks, notes){
    return (dispatch) => {
        fetch(URL+`food_plans/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                day,
                breakfast, 
                lunch,
                dinner,
                snacks, 
                notes
            })
        })
        .then(res => res.json())
        .then(foodPlan => {
            if (foodPlan.error)
                alert(foodPlan.error)
            else 
                dispatch(updatedFoodPlan(foodPlan))
        })
    }
}

function deletedFoodPlan(id){
    return { type: "DELETE_FOOD_PLAN", payload: id}
}

function deletingFoodPlan(id){
    return (dispatch)=>{
        fetch(URL+`food_plans/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(dispatch(deletedFoodPlan(id)))
    }
}

function addedStop(newStop){
    return {type: "ADD_STOP", payload: newStop}
}

function addingStop(stop, name, elevation, distance, notes, hiking_trip_id){
    return (dispatch) => {
        fetch(URL + `stops?hiking_trip_id=${hiking_trip_id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                stop,
                name,
                elevation,
                distance,
                notes
            })
        })
        .then(res => res.json())
        .then(newStop => {
            if (newStop.error)
                alert(newStop.error)
            else 
                dispatch(addedStop(newStop))
        })
    }
}

function updateStop(updatedStop){
    return { type: 'UPDATE_STOP', payload: updatedStop}
}

function updatingStop(id, stop, name, elevation, distance, notes){
    return (dispatch) => {
        fetch(URL + `stops/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                stop, 
                name,
                elevation,
                distance,
                notes
            })
        })
        .then(res => res.json())
        .then(updatedStop => {
            if (updatedStop.error)
                alert(updatedStop.error)
            else 
                dispatch(updateStop(updatedStop))
        })
    }
}

function deleteStop(id){
    return {type: "DELETE_STOP", payload: id}
}

function deletingStop(id){
    return (dispatch) => {
        fetch(URL +`stops/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(dispatch(deleteStop(id)))
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
    deletingPersonalItem,
    addingFoodPlan,
    updatingFoodPlan,
    deletingFoodPlan,
    addingStop,
    updatingStop,
    deletingStop
}