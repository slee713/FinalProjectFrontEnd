import data from '../../tempData'

let hikingTrailsReducer = (state ={ trails: []}, action) => {
    switch(action.type){
        case "LOAD_TRAILS":
            return {
                ...state,
                trails: action.payload
            }
        default: 
            return state
    }
}

export default hikingTrailsReducer