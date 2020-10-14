let friendRequestReducer = (state = {friendRequests: []}, action) => {
    switch(action.type){
        case "LOAD_REQUESTS":
            return {
                ...state,
                friendRequests: [...action.payload]
            }
        case "HANDLE_REQUEST":
            
            return {
                ...state,
                friendRequests: [...state.friendRequests.filter(request => request.id!== action.payload.id)]
            }
        default:
            return state
    }
}

export default friendRequestReducer