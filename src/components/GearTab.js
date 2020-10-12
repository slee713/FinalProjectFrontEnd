import React from 'react'
import { Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import GearTable from './GearTable'

function GearTab (props){

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