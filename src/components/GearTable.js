import React from 'react'
import { Table } from 'semantic-ui-react'

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
        e.target.reset()
 
    }

    return(
        <div>
            <h4>Shared Gear</h4>
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
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
    
                <Table.Body>
                    {props.items.map(item => 
                        <Table.Row>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.qty}</Table.Cell>
                            <Table.Cell>{item.notes}</Table.Cell>
                            <Table.Cell>
                                <p onClick={()=> editButton(item)}>Edit</p>
                                <p>Delete</p>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </div>    
    )
}

export default GearTable