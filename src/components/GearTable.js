import React from 'react'
import { Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { 
    addingGroupGearItem, 
    updatingGroupGearItem, 
    deletingGroupGearItem,
    addingPersonalItem,
    updatingPersonalItem,
    deletingPersonalItem
} from '../redux/actions'

function GearTable(props){
    const [action, setAction] = React.useState('add')
    const [id, setId] = React.useState(null)
    const [name, setName] = React.useState('')
    const [qty, setQty] = React.useState(null)
    const [notes,setNotes] = React.useState('')

    const editButton= (item) => {
        setAction("edit")
        setId(item.id)
        setName(item.name)
        setQty(item.qty)
        setNotes(item.notes)
    }

    const submitForm = (e)=>{
        e.preventDefault()
        console.log(id, name, qty, notes)

        
        if (action === 'add')
            props.addItem(props.category, name, qty, notes, props.hikingTripID)
        else 
            props.updateItem(props.category, id, name, qty, notes)
        
        setAction('add')
        setId(null)
        setName(null)
        setQty(null)
        setNotes(null)
        e.target.reset()
    }

    const deleteItem = (id) => {
        props.deleteItem(props.category, id)
    }

    return(
        <div>
            <h4>{props.category} Gear</h4>
            <form onSubmit={(e) => submitForm(e)}>
                <input type="hidden" value={id} />
                <label>Item</label>
                <input name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <label>Quantity</label>
                <input name="qty" value={qty} onChange={(e)=>setQty(e.target.value)}/>
                <label>Description</label>
                <input name="notes" type="text" value={notes} onChange={(e)=>setNotes(e.target.value)}/>
                    
                <button >{action === 'add' ? 'Add Item' : 'Update Item'}</button> 
                
            </form>
            <Table singleline>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Item</Table.HeaderCell>
                        <Table.HeaderCell>Quantity</Table.HeaderCell>
                        <Table.HeaderCell>Notes</Table.HeaderCell>
                        {props.type === 'group' ? <Table.HeaderCell>Name</Table.HeaderCell> : null}
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
    
                <Table.Body>
                    {props.items.map(item => 
                        <Table.Row>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.qty}</Table.Cell>
                            <Table.Cell>{item.notes}</Table.Cell>
                            {props.type === 'group' ? <Table.Cell>{item.user_hike.user.first_name}</Table.Cell> : null}
                            <Table.Cell>
                                {item.user_hike ?  item.user_hike.user_id == localStorage.id ?
                                <span> <button onClick={()=> editButton(item)}>Edit</button>
                               <button onClick={() => deleteItem(item.id)}>Delete</button></span> :
                               null : <span> <button onClick={()=> editButton(item)}>Edit</button>
                               <button onClick={() => deleteItem(item.id)}>Delete</button></span>}
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </div>    
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addItem: (category, name, qty, notes, hikingTripId) => {
            if (category==='Group')
                dispatch(addingGroupGearItem(name, qty, notes, hikingTripId))
            else 
                dispatch(addingPersonalItem(name,qty,notes))
            },
        updateItem: (category,id, name, qty, notes) => {
            if (category==='Group')
                dispatch(updatingGroupGearItem(id, name, qty,notes))
            else
                dispatch(updatingPersonalItem(id, name, qty, notes))
            },
        deleteItem: (category, id) => {
            if(category === 'Group')
                dispatch(deletingGroupGearItem(id))
            else 
                dispatch(deletingPersonalItem(id))
        }
    }
}

export default connect(null, mapDispatchToProps)(GearTable)