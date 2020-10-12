let selectedTripReducer = (state = {trip: {}}, action ) => {
    switch(action.type){
        case "SELECT_TRIP":
            return {
                ...state,
                trip: action.payload
            }
        case "UPDATED_TRIP":
            return {
                ...state,
                trip: action.payload
            }
        case "ADD_GROUP_ITEM":
            return{
                ...state,
                trip: {...state.trip,
                    group_gear_items: [ ...state.trip.group_gear_items,
                        action.payload
                    ]
                }
            }
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
            state = {
                trip :{...state.trip,
                    group_gear_items: [...state.trip.group_gear_items.filter(item => item.id !== action.payload)]
                }
            }
            return state
        default:
            return state
    }
}

export default selectedTripReducer