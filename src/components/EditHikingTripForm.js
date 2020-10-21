import React from 'react'
import { Modal, Header, Form, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import { updatingHikingTripInfo } from '../redux/actions'



function EditHikingTripForm(props){
    const [open, setOpen] = React.useState(false)
    const [id, setId] = React.useState(props.trip.id)
    const [name, setName] = React.useState(props.trip.name)
    const [img, setImg] = React.useState(props.trip.img)
    const [start_date, setStartDate] = React.useState(props.trip.start_date)
    const [end_date, setEndDate] = React.useState(props.trip.end_date)
    const [description, setDescription] = React.useState(props.trip.description)
    const [hiking_project_id, setHikingProjectId] = React.useState(props.trip.hiking_project_id)

    const updateTrip = (e) =>{
        e.preventDefault()
        props.updateTrip(id, hiking_project_id, name, start_date, end_date, description)
        setOpen(false)
    }

  

    return(
        <Modal
            onClose={()=>setOpen(false)}
            onOpen={()=> setOpen(true)}
            open={open}
            size={'small'}
            trigger={<p>Edit</p>}
        >
            <Modal.Header>Edit Hiking Trip</Modal.Header>
            <Modal.Content>
                <Form onSubmit={(e) => updateTrip(e)}> 
                    <Form.Field>
                        <input id="id" name="name" type="hidden" value={id}/>
                        <input id='hiking_project_id' type="hidden" value={hiking_project_id}/>
                    </Form.Field>
                    <Form.Group widths={2}>
                        <Form.Field>
                            <label for="name">Name</label>
                            <input id="name" name="name" value={name} onChange={(e)=> setName(e.target.value)}/>
                        </Form.Field>
                        <Form.Field>
                            <label for="img">Image URL</label>
                            <input id="img" name="img" value={img} onChange={(e) => setImg(e.target.value)}/>
                        </Form.Field>
                    </Form.Group>
                    
                    <Form.Group widths={2}>
                        <Form.Field>
                            <label for="start_date">Start Date</label>
                            <input type="date" name="start_date" value={start_date} onChange={(e) => setStartDate(e.target.value)}/>
                        </Form.Field>
                        <Form.Field>
                            <label for="end_date">End Date</label>
                            <input type="date" name="end_date" value={end_date} onChange={(e) => setEndDate(e.target.value)}/>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <Form.TextArea label="Description" name='description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </Form.Field>
                    <Button type="submit" style={{width: '100%', 'background-color': '#438f44', color: 'black'}}>Update Information</Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        trip: state.selectedTripReducer.trip
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateTrip: (id, hiking_project_id, name, start_date, end_date, description) => dispatch(updatingHikingTripInfo(id, hiking_project_id, name, start_date, end_date, description))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditHikingTripForm)

