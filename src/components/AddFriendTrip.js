import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Header, Form, Button, Dropdown} from 'semantic-ui-react'
import Select from 'react-select'
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
        // return({key: member.id, text: member.first_name, value: member})
        return({key: member.id, label: member.first_name, value: member})
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
       let invited = [...addedFriends, data.option.value]
    //    
       setAddedFriends(invited)
        
    }
    

    return(
        <Modal 
            onClose={() => setOpen(false)}
            onOpen={()=> setOpen(true)}
            size={'mini'}
            open={open}
            trigger={<p className='edit-user'>Add Friends</p>}
        >
            <Modal.Header>Add Friends</Modal.Header>
            <Modal.Content>
                <Form onSubmit={(e) => submit(e)}>
                    <Select 
                        isMulti
                        name="friends"
                        options={options}
                        className='basic-multi-select'
                        classNamePrefix='select'
                        onChange={handleChange}
                        />
                    <Button type="submit" style={{width: '100%', 'background-color': '#438f44', color: 'black'}}>Add to Trip</Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default AddFriendTrip