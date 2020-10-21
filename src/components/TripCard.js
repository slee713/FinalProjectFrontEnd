import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {Card} from 'semantic-ui-react'

function TripCard(props){

    const handleClick = () => {
        props.selectTrip(props.trip)
        props.history.push(`/mytrips/${props.trip.id}`)
    }

    return(
        <div className="trip-card-body" onClick={handleClick}>
            <img src={props.trip.img ? props.trip.img : "https://static.thenounproject.com/png/129830-200.png"}/>
            <div className="trip-card-details" onClick={handleClick}>
                <h2>{props.trip.name}</h2>
                <p><strong>Start Date: </strong> {props.trip.start_date}</p>
                <p><strong>End Date: </strong> {props.trip.end_date}</p>
                <p><strong>Hikers: </strong>{props.trip.users.map(user=>`${user.first_name} ${user.last_name}`).join(', ')}</p>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectTrip: (payload) => {dispatch({type: "SELECT_TRIP", payload})}
    }
}

export default withRouter(connect(null, mapDispatchToProps)(TripCard))