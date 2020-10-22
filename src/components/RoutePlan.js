import React, { useState } from 'react'
import {Table} from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import {
    addingStop,
    updatingStop,
    deletingStop
} from '../redux/actions'


function RoutePlan(){
    const [action , setAction ] = useState('add')
    const [id, setId ] = useState(null)
    const [stop, setStop] = useState(null)
    const [name, setName ] = useState(null)
    const [elevation, setElevation ] = useState(null)
    const [distance, setDistance] = useState(null)
    const [notes, setNotes] = useState(null)

    const trip = useSelector(state => state.selectedTripReducer.trip)
    const dispatch = useDispatch();

    const editStop = (stop) => {
        setAction('edit')
        setId(stop.id)
        setStop(stop.stop)
        setName(stop.name)
        setElevation(stop.elevation)
        setDistance(stop.distance)
        setNotes(stop.notes)
    }

    const submitForm = (e) => {
        e.preventDefault()
        if (action ==='add')
            dispatch(addingStop(stop, name, elevation, distance, notes, trip.id ))
        else 
            dispatch(updatingStop(id, stop, name, elevation, distance, notes))
        setAction('add')
        setId(null)
        setStop(null)
        setName(null)
        setElevation(null)
        setDistance(null)
        setNotes(null)
        e.target.reset()
    }

    const deleteStop = (id) => {
        dispatch(deletingStop(id))
    }

    return(
        <div className='gear-table-container'>
           <h4>Route Plan</h4>
           <form onSubmit={(e) => submitForm(e)}>
               <input type="hidden" name="id" value={id} />
               <label>Stop</label>
               <input type="number" name="stop" value={stop} onChange={(e) => setStop(e.target.value)} />
               <label>Name</label>
               <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
               <label>Elevation</label>
               <input type="number" name="elevation" value={elevation} onChange={(e) => setElevation(e.target.value)} /><br/>
               <label>Distance</label>
               <input type="number" name="distance" step="0.1" value={distance} onChange={(e) => setDistance(e.target.value)} />
               <label>Notes</label>
               <input type="text" name="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
               <button type="submit">{action === 'add' ? "Add Stop" : "Edit Stop"}</button>
            </form>
            <Table singleline>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Stop</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Elevation</Table.HeaderCell>
                        <Table.HeaderCell>Distance</Table.HeaderCell>
                        <Table.HeaderCell>Notes</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {trip.stops.map(stop => 
                        <Table.Row>
                            <Table.Cell>{stop.stop}</Table.Cell>
                            <Table.Cell>{stop.name}</Table.Cell>
                            <Table.Cell>{stop.elevation}</Table.Cell>
                            <Table.Cell>{stop.distance}</Table.Cell>
                            <Table.Cell>{stop.notes}</Table.Cell>
                            <Table.Cell>
                                <button onClick={() => editStop(stop)}>Edit</button>
                                <span>
                                    <button style={{backgroundColor: 'red'}} onClick={() => deleteStop(stop.id)}>Delete</button>
                                </span>
                            </Table.Cell>
                        </Table.Row>
                        )}
                </Table.Body>
            </Table>
        </div>
    )
}

export default RoutePlan