let friendRequestReducer = (state = {friendRequests: []}, action) => {
    switch(action.type){
        case "LOAD_REQUESTS":
            return {
                ...state,
                friendRequests: [...action.payload]
            }
        
        default:
            return state
    }
}

export default friendRequestReducer