import React from 'react'
import { Modal, Button } from 'semantic-ui-react'
import { useSelector , useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
   deletingHikingTrip
} from '../redux/actions'

function DeleteTripModal(props){
    const [open, setOpen] = React.useState(false)

    const dispatch = useDispatch()
    const trip = useSelector(state => state.selectedTripReducer.trip)

    const confirm = () => {
        dispatch(deletingHikingTrip(trip))
        props.history.push('/mytrips')
    }

    const decline = () => {
        setOpen(false)
    }

    return( 
        <Modal 
            onClose={()=> setOpen(false)}
            onOpen={()=> setOpen(true)}
            open={open}
            size='mini'
            trigger={<p>Delete Trip</p>}
        >
            <Modal.Content>
                <h2>Are you sure you want to delete this hiking trip?</h2>
                <div className = "buttons">
                    <button onClick={confirm}>Yes</button>
                    <button onClick={decline}>No</button>
                </div>
            </Modal.Content>
        </Modal>
    )
}

export default withRouter(DeleteTripModal)