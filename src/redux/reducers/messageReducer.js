let messageReducer = (state ={ messages: []}, action) => {
    switch(action.type){
        case "LOAD_MESSAGES":
            return {
                messages: [ ...action.payload]
            }
        case "ADD_MESSAGE":
            return {
                messages: [action.payload, ...state.messages]
            }
        case "RESET_MSG":
            return {
                messages: []
            }
        default: 
            return state
    }
    
}

export default messageReducer