let userTripsReducer = (state = {trips: []}, action) => {
    switch(action.type){
        case "FETCHED_USER_TRIPS":
            return {
                ...state,
                trips: action.payload
            }
        case "DELETE_TRIP_FROM_LIST":
            state = {
                ...state,
                trips: [...state.trips.filter(trip => trip.id !== action.payload)]
            }
            return state

        case "RESET_TRIPS":
            state = {
                trips: []
            }
            return state
        default:
            return state
    }
}

export default userTripsReducer 