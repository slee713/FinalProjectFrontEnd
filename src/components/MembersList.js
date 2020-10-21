import React from 'react'
import { useSelector } from 'react-redux'

export default function MembersList(){

    const users = useSelector(state => state.selectedTripReducer.trip.users)

    return(
        
            <div className='members-list-col'>
                {users.map(user => 
                    <div className='members-list-info' style={{display: 'flex', flexDirection: 'row'}}>
                        <img src={user.img_url} style={{width: '50px', height: '50px', 'border-radius': '25px'}}/>
                        <h5>{`${user.first_name} ${user.last_name}`}</h5>
                    </div>
                )}
            </div>
        
    )
}