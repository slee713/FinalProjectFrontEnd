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
        case "ADD_PERSONAL_ITEM":
            state = {
                ...state,
                user: {
                    ...state.user,
                    personal_gear_items:[
                        ...state.user.personal_gear_items,
                        action.payload
                    ]
                }
            }
            return state
        case "UPDATE_PERSONAL_ITEM":
            state = {
                ...state,
                user: {
                    ...state.user,
                    personal_gear_items:[...state.user.personal_gear_items.map(item => {
                        if (item.id === action.payload.id){
                            return {
                                ...action.payload
                            }
                        }
                        else 
                            return item
                    })]
                }
            }
            return state
        case "DELETE_PERSONAL_ITEM":
            state = {
                ...state,
                user: {
                    ...state.user,
                    personal_gear_items: [...state.user.personal_gear_items.filter(item => item.id !== action.payload)]
                }
            }
            return state
        case "ADD_FOOD_PLAN":
            state = {
                ...state,
                user: {
                    ...state.user,
                    food_plans: [
                        ...state.user.food_plans,
                        action.payload
                    ]
                }
            }
            return state
        case "UPDATE_FOOD_PLAN":
            state = {
                ...state,
                user: {
                    ...state.user,
                    food_plans: [
                        ...state.user.food_plans.map(plan => {
                            if(plan.id === action.payload.id){
                                return {
                                    ...action.payload
                                }
                            }
                            else 
                                return plan
                        })
                    ]
                }
            }
            return state
        case "DELETE_FOOD_PLAN":
            state = {
                ...state,
                user: {
                    ...state.user,
                    food_plans: [...state.user.food_plans.filter(plan => plan.id !== action.payload)]
                }
            }
            return state
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