import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Header, Form, Button, Dropdown} from 'semantic-ui-react'
import {  addingFriendToTrip } from '../redux/actions'
function AddFriendTrip(){

    const [open, setOpen] = React.useState(false)
    const [addedFriends, setAddedFriends] = React.useState([])

    const user = useSelector(state => state.loginReducer.user)
    const trip = useSelector(state => state.selectedTripReducer.trip)
    const tripMembers = useSelector(state => state.selectedTripReducer.trip.users.map(user => user.id))
    
    const dispatch = useDispatch()

    const nonMembers = user.friends.filter(friend => !tripMembers.includes(friend.id))

    const options = nonMembers.map(member => {
        return({key: member.id, text: member.first_name, value: member})
    })

    const submit = (e) => {
        e.preventDefault()
        addedFriends.forEach(friend => {
            dispatch(addingFriendToTrip(friend, trip.id))
        })
        setAddedFriends([])
        setOpen(false)
    }

    const handleChange = (event, data) => {
       
       let friends = [...data.value]
       setAddedFriends(friends)
        
    }
    

    return(
        <Modal 
            onClose={() => setOpen(false)}
            onOpen={()=> setOpen(true)}
            open={open}
            trigger={<p>Invite Friends</p>}
        >
            <Modal.Header>Invite Friends</Modal.Header>
            <Modal.Content>
                <Form onSubmit={(e) => submit(e)}>
                    <label>Select Friends</label>
                    <Dropdown 
                        placeholder="friends" 
                        name="friends" 
                        fluid multiple selection search 
                        options={options}
                        onChange={handleChange}
                    />
                    <Button type="submit">Invite to Trip</Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default AddFriendTrip