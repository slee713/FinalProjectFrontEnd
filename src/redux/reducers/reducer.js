import selectedTrailReducer from './selectedTrailReducer'
import urlReducer from './urlReducer'
import selectedTripReducer from './selectedTripReducer'
import userTripsReducer from './userTripsReducer'
import trailInfoReducer from './trailInfoReducer'
import {combineReducers} from 'redux'

let initialState = {logged_in: localStorage.token ? true : false, user: {}}

let loginReducer = (state = initialState, action) => {
    switch(action.type){
        case "LOGIN":
            return {
                ...state,
                logged_in: true,
                user: action.payload
            }
        case "LOGOUT":
            return {
                ...state,
                logged_in: false,
                user: {}
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    loginReducer,
    selectedTrailReducer, 
    urlReducer, 
    selectedTripReducer, 
    userTripsReducer,
    trailInfoReducer
 })

export default rootReducer