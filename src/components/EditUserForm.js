import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Form, Modal , Button} from 'semantic-ui-react'
import {
    updatingUser
} from '../redux/actions'

function EditUserForm(){
    const [open, setOpen] = useState(false)

    const user = useSelector(state => state.loginReducer.user)
    const dispatch = useDispatch()

    const [firstName , setFirstName ] = useState(user.first_name)
    const [lastName , setLastName ] = useState(user.last_name)
    const [username , setUsername] = useState(user.username)
    const [imgUrl, setImgUrl ] = useState(user.img_url)
    const [email, setEmail] = useState(user.email)

    const updateUser = (e) => {
        e.preventDefault()
        dispatch(updatingUser(username, e.target.password.value, firstName, lastName, email, imgUrl))
        setOpen(false)
    }

    return(
        <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size='small'
        trigger={<p>Edit Account</p>}
        >
            <Modal.Header>Edit Account</Modal.Header>
            <Modal.Content>
                <Form onSubmit={(e)=> updateUser(e)}>
                    <Form.Group unstackable widths={2}>
                        <Form.Input 
                            label='First name' 
                            value={firstName} 
                            placeholder='First name' 
                            name="first_name" 
                            onChange={(e)=> setFirstName(e.target.value)}/>
                        <Form.Input 
                            label='Last name' 
                            value={lastName} 
                            laceholder='Last name' 
                            name="last_name"
                            onChange={(e)=> setLastName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group widths={2}>
                        <Form.Input 
                            label='Profile Picture' 
                            value={imgUrl} 
                            placeholder='Image Url' 
                            name="img_url"
                            onChange={(e)=> setImgUrl(e.target.value)}/>
                        <Form.Input 
                            label='Email' 
                            value={email} 
                            placeholder='Email' 
                            name="email"
                            onChange={(e)=> setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group widths={2}>
                        <Form.Input 
                            label='Username' 
                            value={username} 
                            placeholder='Username' 
                            name="username"
                            onChange={(e)=> setUsername(e.target.value)}/>
                        <Form.Input 
                        required 
                        label='Password' 
                        type="password" 
                        placeholder='Password' 
                        name="password"/>
                    </Form.Group>
                    <Button type='submit' style={{width: '100%', 'background-color': '#438f44'}}>Submit</Button>
                </Form>
                
            </Modal.Content>

            
        </Modal>
    )
}

export default EditUserForm