let friendTripsReducer = (state ={friendsTrips: []}, action) => {
    switch(action.type){
        case "LOAD_FRIENDS_TRIPS":
            return {
                ...state,
                friendsTrips: action.payload
            }
        default:
            return state
    }
}

export default friendTripsReducer