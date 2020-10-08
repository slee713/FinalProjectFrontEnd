import React from 'react'
import { Card, Image} from 'semantic-ui-react'
import TrailDescCard from './TrailDescCard'
function TrailCard(props){
    const {id, name, stars, location, length, imgSmall} = props.trail
    return (
        <Card className = "card">
            <Image className="img" src={imgSmall} wrapped ui={false}/>
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>
                    <p>{location}</p>
                    <p>Stars: {stars}</p>
                    <p>Distance: {length} miles</p>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='more-info-btn-div'>
                    <TrailDescCard trail={props.trail}/>
                </div>
            </Card.Content>
        </Card>
    )
}

export default TrailCard