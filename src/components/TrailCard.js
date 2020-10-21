import React from 'react'
import { Card, Image} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

function TrailCard(props){
    const {id, name, stars, location, length, imgSmall} = props.trail

    const select = (payload) => {
        props.selectTrail(payload)
        props.history.push(`/trail/${id}`)
    }

    return (
        <Card className = "card" onClick={()=> select(props.trail)}>
            <Image className="img" src={imgSmall} wrapped ui={false}/>
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>
                    <p>{location}</p>
                    <p>Rating: {stars}</p>
                    <p>Distance: {length} miles</p>
                </Card.Description>
            </Card.Content>
        </Card>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        selectTrail: (payload) => dispatch({type: "SELECT", payload: payload})
    }
}

export default withRouter(connect(null, mapDispatchToProps)(TrailCard))