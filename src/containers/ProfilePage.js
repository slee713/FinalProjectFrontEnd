import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { Card, Feed, Icon, Image } from 'semantic-ui-react'
import { fetchingFriendRequests, fetchingUsers } from '../redux/actions'
import './ProfilePage.css'
function ProfilePage(props){

    const user = useSelector(state => state.loginReducer.user)
    const friendRequests = useSelector(state => state.friendRequestReducer.friendRequests)
    const users = useSelector(state => state.allUserReducer.users)

   

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

    const submitPost = (e) => {
        e.preventDefault()
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
                                            <button>Yes</button>
                                            <button>No</button>
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
                                            <button>Remove</button>
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
                               {users.map(user => 
                                <Feed.Event>
                                    <Feed.Label image={user.img_url ? user.img_url : "https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg"}/>
                                    <Feed.Content>
                                        <Feed.Summary>
                                            {`${user.first_name} ${user.last_name}`}
                                            <button>Add</button>
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