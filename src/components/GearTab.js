import React from 'react'
import { Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import GearTable from './GearTable'

function GearTab (props){
    

//     const editButton= (item) => {
//         setAction("edit")
//         setId(item.id)
//         setName(item.name)
//         setQty(item.qty)
//         setNotes(item.notes)
//     }

//    const submitForm = (e)=>{
//        e.preventDefault()
//        console.log(id, name, qty, notes)
//        e.target.reset()

//    }

    return (
        <div>
            <GearTable category="Group" hikingTripID= {props.trip.id} items={props.trip.group_gear_items} />
            <GearTable category="Personal" hikingTripID= {props.trip.id} items={props.user.personal_gear_items}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        trip: state.selectedTripReducer.trip,
        user: state.loginReducer.user
    }
}

export default connect(mapStateToProps)(GearTab)