import React from 'react'
import {Card} from 'semantic-ui-react'
function TripCard(props){
    return(
        <div>
            <Card>
                <Card.Content>
                    <Card.Header content='Jake Smith' />
                    <Card.Meta content='Musicians' />
                    <Card.Description content='Jake is a drummer living in New York.' />
                </Card.Content>
            </Card>
        </div>
    )
}

export default TripCard