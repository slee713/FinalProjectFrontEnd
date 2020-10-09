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
                    <Card.Header content='Jake Smith' />
                    <Card.Meta content='Musicians' />
                    <Card.Description content='Jake is a drummer living in New York.' />
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