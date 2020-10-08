let userTripsReducer = (state = {trips: []}, action) => {
    switch(action.type){
        case "FETCHED_USER_TRIPS":
            return {
                ...state,
                trips: action.payload
            }
        default:
            return state
    }
}

export default userTripsReducer 