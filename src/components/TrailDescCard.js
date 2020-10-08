import React from 'react'
import {Button, Header, Image, Modal} from 'semantic-ui-react'

function TrailDescCard(props){
    const [open, setOpen] = React.useState(false)
    const {id, 
        name, 
        stars, 
        location, 
        length, 
        imgMedium, 
        ascent, 
        descent,
        high,
        low,
        difficulty,
        summary,
        conditionStatus,
        conditionDetails,
        conditionDate, 
        url
} = props.trail

    return(
        <Modal
            onClose={()=>setOpen(false)}
            onOpen={()=> setOpen(true)}
            open={open}
            trigger={<Button>More Info</Button>}
        >
            <Modal.Header>{name}</Modal.Header>
            <Modal.Content image>
                <Image size='medium' src={imgMedium} wrapped />
                <Modal.Description>
                    <p>Location: {location}</p>
                    <p>Summary: {summary}</p>
                    <p>Difficulty: {difficulty}</p>
                    <p>Rating: {stars}</p>
                    <p>Length: {length}</p>
                    <p>Ascent: {ascent},  Descent: {descent}</p>
                    <p>Highest Elevation: {high}, Loweset Elevation: {low}</p>
                    <p>Condition: {conditionStatus}, {conditionDetails} - {conditionDate}</p>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={()=> setOpen(false)}>
                    Close
                </Button>
                
            </Modal.Actions>
        </Modal>
    )
}

export default TrailDescCard