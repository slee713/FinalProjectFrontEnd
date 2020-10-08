import React from 'react'
import { Modal, Button, Form} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


function NewTripForm(props) {
    const [open, setOpen] = React.useState(false)
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    let todaysDate = yyyy + '-' + mm + '-' + dd

    const createTrip = (e) => {
        e.preventDefault()
        if(e.target.start_date.value < todaysDate){
            alert("Starting date cannot be before today's date.")
        }
        if(e.target.end_date.value < e.target.start_date.value)
            alert("End Date must be after Start Date")
        else {
            fetch(props.url+'/hiking_trips', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                body: JSON.stringify({
                    hiking_project_id: props.trailid,
                    name: e.target.name.value,
                    start_date: e.target.start_date.value,
                    end_date: e.target.end_date.value,
                    description: e.target.description.value,
                })
            })
            .then(res => res.json())
            .then(resp => {
                if (resp.error)
                    alert(resp.error)
                else 
                    setOpen(false)
                    props.setSelectTrip(resp)
                    props.history.push(`/mytrips/${resp.id}`)
            })
        }
    }

    return(
       <Modal
        onClose={() => setOpen(false)}
        onOpen={ () => setOpen(true)}
        open = {open}
        trigger = {<p>Create Hiking Trip</p>}
        >
            <Modal.Header>Hiking Trip Form</Modal.Header>
            <Modal.Content>
                <Form onSubmit={(e) => createTrip(e)}>
                    <Form.Field >
                        <Form.Input required label='Event Name' placeholder='Event Name' name="name" />
                    </Form.Field>
                    <Form.Group unstackable widths={2}>
                        <Form.Input  type="date" required label='Start Date' placeholder='Start Date' name="start_date" />
                        <Form.Input  type="date" required label='End Date' placeholder='End Date' name="end_date" />
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

const mapStateToProps = state => {
    return {
        url: state.urlReducer.URL
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectTrip: (payload) => dispatch({type: "SELECT_TRIP", payload})
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewTripForm))