import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { Card, Feed, Icon, Image } from 'semantic-ui-react'
import { 
    fetchingFriendRequests, 
    fetchingUsers, 
    acceptingFriendRequest,
    sendingFriendRequest,
    rejectingFriendRequest,
    removingFriend,
    fetchingUser,
    fetchingFriendsTrips,
    fetchingTrailData
} from '../redux/actions'
import './ProfilePage.css'
import TripDescCard from '../components/TripDescCard'
import EditUserForm from '../components/EditUserForm'
import DeleteUserModal from '../components/DeleteUserModal'


function ProfilePage(props){

    const user = useSelector(state => state.loginReducer.user)
    const friendRequests = useSelector(state => state.friendRequestReducer.friendRequests)
    const users = useSelector(state => state.allUserReducer.users)
    const friendsTrips = useSelector(state => state.friendTripsReducer.friendsTrips)

    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    let todaysDate = yyyy + '-' + mm + '-' + dd

   const dispatch = useDispatch()

    useEffect(()=> {
        // props.loadUsers()
        // props.loadFriendRequests()
        
        let update = setInterval(()=>{
            props.loadUser()
            props.loadFriendTrips()
            // // // props.loadUsers()
            props.loadFriendRequests()
        }, 1000)

        return () => {
            clearInterval(update)
        }
    }, [])

    const extra = (
        <a>
            <Icon name="user"/>
            {user.friends.length} Friends
        </a>
    )

   const acceptRequest = (request) => {
        dispatch(acceptingFriendRequest(request))
   }

   const rejectRequest = (request) => {
       dispatch(rejectingFriendRequest(request))
   }

   const requestFriend = (user, friend) => {
        dispatch(sendingFriendRequest(user, friend))
        dispatch({type: "REMOVE_USER", payload: friend })
   }

   const removeFriend = (friend) => {
        dispatch(removingFriend(friend))
   }

   const searchUsers = (e) => {
       e.preventDefault()
       if (e.target.search.value.length > 0)
        props.loadUsers(e.target.search.value)
       else
        dispatch({type: "RESET_USERS"})
   }

  
    return(
        <div className="profile">
           <div className="userInfo">
                <div className="user-image">
                    <img src={user.img_url}/>
                </div>
                <div className="user-detail">
                    <h3>{`${user.first_name} ${user.last_name}`}</h3>
                    <p>{user.email}</p>
                    <p>Username: {user.username}</p>
                    <div className="user-options">
                        <EditUserForm />
                        <DeleteUserModal />
                    </div>
                    
                </div>
           </div>
           <div className="newsfeed">
               <h1>Friend's Upcoming Trips</h1>
                <div className='feed'>
                    {friendsTrips.map(trip => {
                        if(trip.start_date >= todaysDate)
                            return <TripDescCard key={trip.id} trip={trip}/>
                    }
                    )}
                </div>
           </div>
           <div className="users">
               <div className="friend-requests">
                   <h2>Notifications:</h2>
                   {friendRequests.length > 0 ? 
                   friendRequests.map(request => 
                        <div className='requests'>
                            <img src={request.user.img_url ? request.user.img_url : "https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg"} style={{ 'max-width': '30px', height: 30,borderRadius: '15px'}}/>
                            
                                <p>Would you like to add {request.user.first_name} as a Friend?</p>
                                <div className='request-buttons'>
                                    <p className='add-friend' onClick={()=>acceptRequest(request)}>Yes</p>
                                    <p className='delete-friend' onClick={() => rejectRequest(request)}>No</p>
                                </div>
                            
                        </div>  
                    ):
                    <p>You have 0 notifications</p>
                    }

               </div>
               
               <div className="all-users">
                    
                   
                        <h2>Search for Hikers</h2>
                        <form onSubmit={(e) => searchUsers(e)}>
                            <input type="text" name="search"/>
                            <button style={{backgroundColor: '#438f44', height: '25px', borderRadius: '5px'}} type="submit">Search</button>
                        </form>
                        <div className='search-users-results'>
                            {users.map(aUser => 
                                <div className = "search-user">
                                    <div className = 'user-info'>
                                        <img src={aUser.img_url ? aUser.img_url : "https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg"} style={{ 'max-width': '30px', height: 30,borderRadius: '15px'}}/>
                                        <p>{`${aUser.first_name} ${aUser.last_name}`}</p>
                                    </div>
                                    <p className='add-friend' onClick={() => requestFriend(user, aUser)}>Add</p>
                                </div>    
                            )}
                        </div>
                   
               </div>
               <div className="friends">
                    
                   <h2>Friends</h2>
                   {user.friends.map(friend => 
                        <div className = "user-friend">
                            <div className = "user-info">
                                <img src={friend.img_url ? friend.img_url : "https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg"} style={{ 'max-width': '30px', height: 30,borderRadius: '15px'}}/>
                                <p>{`${friend.first_name} ${friend.last_name}`}</p>
                            </div>
                            <p className='delete-friend' onClick={() => removeFriend(friend)}>Delete</p>
                        </div>
                    
                    )}
                    
               </div>
           </div>
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        loadFriendRequests: () => dispatch(fetchingFriendRequests()),
        loadUsers: (search) => dispatch(fetchingUsers(search)),
        loadUser: () => dispatch(fetchingUser()),
        loadFriendTrips: () => dispatch(fetchingFriendsTrips()),
        resetUsers: ()=> dispatch({type: "RESET_USERS"})
    }
}

export default connect(null, mapDispatchToProps)(ProfilePage)