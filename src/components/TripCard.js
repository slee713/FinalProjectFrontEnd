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
        <div>
            <Card onClick={handleClick}>
                <Card.Content>
                    <Card.Header content={props.trip.name} />
                    <Card.Meta content={props.trip.start_date} />
                    <Card.Description content={props.trip.users.map(user => `${user.first_name} ${user.last_name}`).join(', ')} />
                </Card.Content>
            </Card>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectTrip: (payload) => {dispatch({type: "SELECT_TRIP", payload})}
    }
}

export default withRouter(connect(null, mapDispatchToProps)(TripCard))