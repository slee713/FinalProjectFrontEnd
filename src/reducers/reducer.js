//import other reducers
import {combineReducers} from 'redux'

let initialState = {test: true}

let reducer = (state = initialState, action) => {
    switch(action.type){
        case "placeholder":
            return {
                ...state,
                test: !state.test
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({reducer})

export default rootReducer