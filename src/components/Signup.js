import React from 'react'
import {Header, Image, Modal, Checkbox, Button, Form} from 'semantic-ui-react'
function Signup(props){
    const [open, setOpen] = React.useState(false)

    const signup = (e) => {
        e.preventDefault()
    }
    return(
        <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<p>Signup</p>}
        >
            <Modal.Header>Signup</Modal.Header>
            <Modal.Content>
                <Form onSubmit={(e)=> signup(e)}>
                    <Form.Group unstackable widths={2}>
                        <Form.Input required label='First name' placeholder='First name' name="first_name" />
                        <Form.Input required label='Last name' placeholder='Last name' name="last_name"/>
                    </Form.Group>
                    <Form.Group widths={2}>
                        <Form.Input label='Address' placeholder='Address' name="address"/>
                        <Form.Input required label='Email' placeholder='Email' name="email"/>
                    </Form.Group>
                    <Form.Group widths={2}>
                        <Form.Input required label='Username' placeholder='Username' name="username"/>
                        <Form.Input required label='Password' type="password" placeholder='Password' name="password"/>
                    </Form.Group>
                    <Button type='submit'>Submit</Button>
                </Form>
                
            </Modal.Content>

            <Modal.Actions>
                <button color='green' onClick={() => setOpen(false)}>
                Back
                </button>
            </Modal.Actions>
        </Modal>
    )
}

export default Signup