let selectedTripReducer = (state = {trip: {}}, action ) => {
    switch(action.type){
        case "SELECT_TRIP":
            return {
                ...state,
                trip: action.payload
            }
        case "UPDATED_TRIP":
            return {
                ...state,
                trip: action.payload
            }
        default:
            return state
    }
}

export default selectedTripReducer