//import other reducers
import {combineReducers} from 'redux'

let initialState = {logged_in: false}

let loginReducer = (state = initialState, action) => {
    switch(action.type){
        case "LOGIN":
            return {
                ...state,
                logged_in: true
            }
        case "LOGOUT":
            return {
                ...state,
                logged_in: false
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({loginReducer})

export default rootReducer