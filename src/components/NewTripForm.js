import React from 'react'
import { Modal, Button, Form} from 'semantic-ui-react'


function NewTripForm(props) {
    const [open, setOpen] = React.useState(false)

    return(
       <Modal
        onClose={() => setOpen(false)}
        onOpen={ () => setOpen(true)}
        open = {open}
        trigger = {<p>Create Hiking Trip</p>}
        >
            <Modal.Header>Hiking Trip Form</Modal.Header>
            <Modal.Content>
                <Form onSubmit={null}>
                    <Form.Field >
                        <Form.Input required label='Event Name' placeholder='Event Name' name="name" />
                    </Form.Field>
                    <Form.Group unstackable widths={2}>
                        <Form.Input  required label='Start Date' placeholder='Start Date' name="start_date" />
                        <Form.Input  required label='End Date' placeholder='End Date' name="end_date" />
                    </Form.Group>
                    <Form.Field>
                        <Form.TextArea label="Description" placeholder='Description' name='description'/>
                    </Form.Field>
                    <Button type="submit">Create Trip</Button>
                </Form>
                
            </Modal.Content>
        </Modal>

    )
}

export default NewTripForm