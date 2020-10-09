let trailInfoReducer = (state = {trail: {}}, action ) => {
    switch(action.type){
        case "LOAD_TRAIL":
            return {
                ...state,
                trail: action.payload
            }
        default:
            return state
    }
}

export default trailInfoReducer