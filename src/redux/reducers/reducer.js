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
                user: {...action.payload,
                    food_plans: [...action.payload.food_plans.sort((a,b) => a.day > b.day ? 1: -1)]
                }
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
            let foodPlans= [...state.user.food_plans, action.payload]
            state = {
                ...state,
                user: {
                    ...state.user,
                    food_plans: [
                        ...foodPlans.sort((a,b) => a.day > b.day ? 1 : -1)
                    ]
                }
            }
            return state
        case "UPDATE_FOOD_PLAN":
            let updatedFoodPlans = [
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
            state = {
                ...state,
                user: {
                    ...state.user,
                    food_plans: [
                        ...updatedFoodPlans.sort((a,b) => a.day > b.day ? 1 : -1)
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