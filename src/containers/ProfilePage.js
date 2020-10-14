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
    removingFriend 
} from '../redux/actions'
import './ProfilePage.css'
function ProfilePage(props){

    const user = useSelector(state => state.loginReducer.user)
    const friendRequests = useSelector(state => state.friendRequestReducer.friendRequests)
    const users = useSelector(state => state.allUserReducer.users)

   const dispatch = useDispatch()

    useEffect(()=> {
        props.loadUsers()
        props.loadFriendRequests()
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
    return(
        <div className="profile">
           <div className="userInfo">
               <Card
                    image={user.img_url ? user.img_url : "https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg"}
                    header={`${user.first_name} ${user.last_name}`}
                    meta={user.username}
                    extra={extra}
                />
           </div>
           <div className="newsfeed">
               <h2>Friend's Upcoming Trips</h2>
                <div>

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
                                Users
                           </Card.Header>
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
        loadUsers: () => dispatch(fetchingUsers())
    }
}

export default connect(null, mapDispatchToProps)(ProfilePage)