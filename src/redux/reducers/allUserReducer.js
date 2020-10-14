let allUserReducer = (state = {users: []}, action) => {
    switch(action.type){
        case "ALL_USERS":
            return {
                ...state,
                users: action.payload
            }
        case "REMOVE_USER":
            return {
                ...state,
                users: [...state.users.filter(user => user.id !== action.payload.id)]
            }
        case "ADD_USER":
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        default:
            return state
    }
}

export default allUserReducer