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
        props.loadFriendTrips()
        let update = setInterval(()=>{
            // props.loadUser()
            // // // props.loadUsers()
            // props.loadFriendRequests()
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
   }

   const removeFriend = (friend) => {
        dispatch(removingFriend(friend))
   }

   const searchUsers = (e) => {
       e.preventDefault()
       
       props.loadUsers(e.target.search.value)
       
   }

  
    return(
        <div className="profile">
           <div className="userInfo">
               {/* <Card
                    image={user.img_url ? user.img_url : "https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg"}
                    header={`${user.first_name} ${user.last_name}`}
                    meta={user.username}
                    extra={extra}
                /> */}
                <div className="user-image">
                    <img src={user.img_url ? user.img_url : "https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg"}/>
                </div>
                <div className="user-detail">
                    <h3>{`${user.first_name} ${user.last_name}`}</h3>
                    <p>{user.email}</p>
                    <EditUserForm />
                    <DeleteUserModal />
                </div>
           </div>
           <div className="newsfeed">
               <h2>Friend's Upcoming Trips</h2>
                <div>
                    {friendsTrips.map(trip => {
                        if(trip.start_date >= todaysDate)
                            return <TripDescCard key={trip.id} trip={trip}/>
                    }
                    )}
                </div>
           </div>
           <div className="users">
               <div className="requests">
                   <Card>
                       <Card.Content>
                           <Card.Header>
                                Friend Requests
                           </Card.Header>
                       </Card.Content>
                       <Card.Content>
                           <Feed>
                               {friendRequests.map(request => 
                                <Feed.Event>
                                    <Feed.Label image={request.user.img_url ? request.user.img_url : "https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg"}/>
                                    <Feed.Content>
                                        <Feed.Summary>
                                            {request.user.first_name} wants to be your friend!
                                            Would You like to Add {request.user.first_name}?
                                            <button onClick={()=>acceptRequest(request)}>Yes</button>
                                            <button onClick={() => rejectRequest(request)}>No</button>
                                        </Feed.Summary>
                                    </Feed.Content>
                                </Feed.Event>
                                )}
                           </Feed>
                       </Card.Content>
                   </Card>

               </div>
               <div className="friends">
                    <Card>
                       <Card.Content>
                           <Card.Header>
                                Friends
                           </Card.Header>
                       </Card.Content>
                       <Card.Content>
                           <Feed>
                               {user.friends.map(friend => 
                                <Feed.Event>
                                    <Feed.Label image={friend.img_url ? friend.img_url : "https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg"}/>
                                    <Feed.Content>
                                        <Feed.Summary>
                                            {`${friend.first_name} ${friend.last_name}`}
                                            <button onClick={() => removeFriend(friend)}>Remove</button>
                                        </Feed.Summary>
                                    </Feed.Content>
                                </Feed.Event>
                                )}
                           </Feed>
                       </Card.Content>
                   </Card>
                    
               </div>
               <div className="users">
                    <Card>
                       <Card.Content>
                           <Card.Header>
                                Search 
                           </Card.Header>
                       </Card.Content>
                        <Card.Content>
                            <form onSubmit={(e) => searchUsers(e)}>
                                <input type="text" name="search"/>
                                <button type="submit">Search</button>
                            </form>
                        </Card.Content>
                       <Card.Content>
                           <Feed>
                               {users.map(aUser => 
                                <Feed.Event>
                                    <Feed.Label image={aUser.img_url ? aUser.img_url : "https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg"}/>
                                    <Feed.Content>
                                        <Feed.Summary>
                                            {`${aUser.first_name} ${aUser.last_name}`}
                                            <button onClick={() => requestFriend(user, aUser)}>Add</button>
                                        </Feed.Summary>
                                    </Feed.Content>
                                </Feed.Event>
                                )}
                           </Feed>
                       </Card.Content>
                   </Card>
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
        loadFriendTrips: () => dispatch(fetchingFriendsTrips())
    }
}

export default connect(null, mapDispatchToProps)(ProfilePage)