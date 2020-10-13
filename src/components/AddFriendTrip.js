import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Header, Form, Button, Dropdown} from 'semantic-ui-react'

function AddFriendTrip(){

    const [open, setOpen] = React.useState(false)
    const [addedFriends, setAddedFriends] = React.useState([])
    const user = useSelector(state => state.loginReducer.user)
    const tripMembers = useSelector(state => state.selectedTripReducer.trip.users.map(user => user.id))

    const nonMembers = user.friends.filter(friend => !tripMembers.includes(friend.id))

    const options = nonMembers.map(member => {
        return({key: member.id, text: member.first_name, value: member.id})
    })

    const submit = (e) => {
        e.preventDefault()
        console.log(addedFriends)
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
            trigger={<p>Add Friends To Trip</p>}
        >
            <Modal.Header>Add Friends To Trip</Modal.Header>
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