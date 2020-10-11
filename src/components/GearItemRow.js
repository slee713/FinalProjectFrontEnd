import React from 'react'
import { Table } from 'semantic-ui-react'

function GearItemRow(props){

    const { id, name, qty, notes} = props.item

    return(
        <Table.Row>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{qty}</Table.Cell>
            <Table.Cell>{notes}</Table.Cell>
            <Table.Cell>
                <p onClick={()=> props.editButton(props.item)}>Edit</p>
                <p>Delete</p>
            </Table.Cell>
        </Table.Row>
    )
}

export default GearItemRow