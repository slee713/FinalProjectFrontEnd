const URL = "http://localhost:3000/api/v1/"


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

export { fetchingHikingTrips }