let messageReducer = (state ={ messages: []}, action) => {
    switch(action.type){
        case "LOAD_MESSAGES":
            return {
                messages: [...state.messages, ...action.payload]
            }
        case "ADD_MESSAGE":
            return {
                messages: [ ...state.messages, action.payload]
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