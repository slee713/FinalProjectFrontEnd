import React from 'react'
import { useSelector } from 'react-redux'
function ProfilePage(){

    const user = useSelector(state => state.loginReducer.user)
    
    return(
        <div>
            My Profile
        </div>
    )
}

export default ProfilePage