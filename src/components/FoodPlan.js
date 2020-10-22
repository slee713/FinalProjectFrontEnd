import React, { useState } from 'react'
import { Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {
    addingFoodPlan,
    updatingFoodPlan,
    deletingFoodPlan
} from '../redux/actions'

function FoodPlan(props){
    const [action, setAction] = useState('add')
    const [id, setId] = useState(null)
    const [day, setDay] = useState(null)
    const [breakfast, setBreakfast ] = useState(null)
    const [lunch , setLunch ] = useState(null)
    const [dinner, setDinner ] = useState(null)
    const [snacks , setSnacks ]  = useState(null)
    const [notes, setNotes] = useState(null)

    const editBtn = (item) => {
        setAction('edit')
        setId(item.id)
        setDay(item.day)
        setBreakfast(item.breakfast)
        setLunch(item.lunch)
        setDinner(item.dinner)
        setSnacks(item.snacks)
        setNotes(item.notes)
    }

    const submitForm = (e) => {
        e.preventDefault()
        if (day < props.trip.start_date)
            alert('Day cannot be before Trip Start Date')
        else if(day > props.trip.end_date)
            alert('Date cannot be after Trip End Date')
        else {
            if (action === 'add')
                props.addFoodPlan(day, breakfast,lunch, dinner,snacks,notes, props.hiking_trip_id)
            else 
                props.updateFoodPlan(id, day, breakfast, lunch ,dinner ,snacks, notes)
            setAction('add')
            setId(null)
            setDay(null)
            setBreakfast(null)
            setLunch(null)
            setDinner(null)
            setSnacks(null)
            setNotes(null)
            e.target.reset()
        }
    }

    const deleteFoodPlan = (id) => {
        props.deleteFoodPlan(id)
    }

    return(
        <div className = "gear-table-container">
            <h4>Food Plan</h4>
            <form onSubmit={(e)=> submitForm(e)}>
                <input type="hidden" name="id"  value ={id} onChange={(e)=> setId(e.target.value)}/>
                <label>Date</label>
                <input name="date" type="date" value={day} onChange={(e) => setDay(e.target.value)}/>
                <label>Breakfast</label>
                <input name="breakfast" value={breakfast} onChange={(e) => setBreakfast(e.target.value)}/>
                <label>Lunch</label>
                <input name="lunch" value={lunch} onChange={(e) => setLunch(e.target.value)}/><br/>
                <label>Dinner</label>
                <input name="dinner" value={dinner} onChange={(e) => setDinner(e.target.value)}/>
                <label>Snacks</label>
                <input name="snacks" value={snacks} onChange={(e) => setSnacks(e.target.value)}/>
                <label>Notes</label>
                <input name="notes" value={notes} onChange={(e) => setNotes(e.target.value)}/>
                <button type="submit">{action==='add' ? 'Add Food Plan' : 'Update Food Plan'}</button>
            </form>
            <Table singleline>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Day</Table.HeaderCell>
                        <Table.HeaderCell>Breakfast</Table.HeaderCell>
                        <Table.HeaderCell>Lunch</Table.HeaderCell>
                        <Table.HeaderCell>Dinner</Table.HeaderCell>
                        <Table.HeaderCell>Snacks</Table.HeaderCell>
                        <Table.HeaderCell>Notes</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {props.foodPlans.map(item => {
                      if(item.user_hike.hiking_trip_id === props.trip.id){
                        return (<Table.Row>
                            <Table.Cell>{item.day}</Table.Cell>
                            <Table.Cell>{item.breakfast}</Table.Cell>
                            <Table.Cell>{item.lunch}</Table.Cell>
                            <Table.Cell>{item.dinner}</Table.Cell>
                            <Table.Cell>{item.snacks}</Table.Cell>
                            <Table.Cell>{item.notes}</Table.Cell>
                            <Table.Cell>
                                <button onClick={() =>editBtn(item)}>Edit</button>
                                <span><button style={{backgroundColor: 'red'}} onClick={() => deleteFoodPlan(item.id)}>Delete</button></span>
                            </Table.Cell>
                        </Table.Row>)
                      }
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        foodPlans: state.loginReducer.user.food_plans,
        trip: state.selectedTripReducer.trip
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addFoodPlan: (day, breakfast, lunch, dinner, snacks, notes, hiking_trip_id) => {
            dispatch(addingFoodPlan(day, breakfast,lunch, dinner, snacks, notes, hiking_trip_id))
        },
        updateFoodPlan: (id, day, breakfast, lunch, dinner, snacks, notes) => {
            dispatch(updatingFoodPlan(id, day, breakfast, lunch, dinner, snacks, notes))
        },
        deleteFoodPlan: (id) => dispatch(deletingFoodPlan(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodPlan)