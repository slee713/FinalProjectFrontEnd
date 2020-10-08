let selectedTrailReducer = (state ={selectedTrail: {}}, action) => {
    switch(action.type){
        case "SELECT":
            return {
                ...state,
                selectedTrail: action.payload
            }
        default:
            return state
    }
}

export default selectedTrailReducer