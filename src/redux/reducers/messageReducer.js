let messageReducer = (state ={ messages: []}, action) => {
    switch(action.type){
        case "LOAD_MESSAGES":
            return {
                messages: [...state.messages, ...action.payload]
            }
        case "ADD_MESSAGE":
            return {
                messages: [action.payload, ...state.messages]
            }
        case "RESET_MSG":
            return {
                messages: []
            }
        case "ADD_LATEST":
            if (action.payload.id !== state.messages[0].id)
                return {
                    messages: [action.payload, ...state.messages]
                }
        default: 
            return state
    }
    
}

export default messageReducer