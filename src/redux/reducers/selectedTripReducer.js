let selectedTripReducer = (state = {trip: {}}, action ) => {
    switch(action.type){
        case "SELECT_TRIP":
            return {
                ...state,
                trip: {
                    ...action.payload,
                    stops: [...action.payload.stops.sort((a,b) => a.stop - b.stop)]
                }
            }
        case "UPDATED_TRIP":
            return {
                ...state,
                trip: {
                    ...action.payload,
                    stops: [...action.payload.stops.sort((a,b) => a.stop - b.stop)]
                }
            }
        case "DELETE_TRIP":
            return {
                ...state,
                trip: {}
            }
        case "ADD_GROUP_ITEM":
            state = {
                ...state,
                trip: {...state.trip,
                    group_gear_items: [ ...state.trip.group_gear_items,
                        action.payload
                    ]
                }
            }
            return state
        case "UPDATE_GROUP_ITEM":
            
            state={  ...state,
                trip: {...state.trip,
                    group_gear_items: [...state.trip.group_gear_items.map(item => {
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
        case 'DELETE_GROUP_ITEM':
            let group_items = [...state.trip.group_gear_items.filter(item => item.id !== action.payload)]
            state = {
                trip :{...state.trip,
                    group_gear_items: [...group_items]
                }
            }
            return state

        case 'ADD_STOP':
            let newStops = [...state.trip.stops, action.payload]
            state = {
                trip: {...state.trip,
                    stops: [...newStops.sort((a,b) => a.stop - b.stop)]
                }
            }
            return state

        case 'UPDATE_STOP':
            
            state = {
                trip: {...state.trip,
                    stops: [...state.trip.stops.map(stop => {
                        if (stop.id === action.payload.id)
                            return action.payload
                        else
                            return stop
                    })]
                }
            }
            return state
        case 'DELETE_STOP':
            state = {
                trip: {
                    ...state.trip,
                    stops: [...state.trip.stops.filter(stop => stop.id !== action.payload)]
                }
            }
            return state
        default:
            return state
    }
}

export default selectedTripReducer