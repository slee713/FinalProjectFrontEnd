let messageReducer = (state ={ messages: []}, action) => {
    switch(action.type){
        case "LOAD_MESSAGES":
            return {
                messages: action.payload
            }
        default: 
            return state
    }
    
}

export default messageReducer