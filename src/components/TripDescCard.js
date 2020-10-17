import React, {useEffect} from 'react'
import {Button, Header, Image, Modal, Card} from 'semantic-ui-react'
import { useSelector , useDispatch } from 'react-redux'
import {
    fetchingTrailData
} from '../redux/actions'

function TripDescCard(props){
    const [open, setOpen] = React.useState(false)

    const trail = useSelector(state => state.trailInfoReducer.trail)
    const dispatch = useDispatch()

    const loadTrail = (id) => {
        dispatch(fetchingTrailData(id))
   }
   const resetTrail = () => {
       dispatch({type: "RESET_TRAIL"})
   }

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
} = trail

    return(
        <Modal
            onClose={()=>{
                setOpen(false)
                resetTrail()
                }
            }
            onOpen={()=> {
                setOpen(true)
                loadTrail(props.trip.hiking_project_id)
                }
            }
            open={open}
            trigger={
               <Card>
                   <Card.Content >
                       <Card.Header>{props.trip.name}</Card.Header>
                       <Card.Description>
                           <p>Start Date: {props.trip.start_date}</p>
                           <p>End Date: {props.trip.end_date}</p>
                           <p>Members: {props.trip.users.map(user => `${user.first_name} ${user.last_name},`)}</p>
                       </Card.Description>
                    </Card.Content>
               </Card>
            }
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
        </Modal>
    )
}



export default TripDescCard