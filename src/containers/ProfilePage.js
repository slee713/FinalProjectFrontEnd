import React from 'react'
import { useSelector } from 'react-redux'
import { Card, Feed, Icon, Image } from 'semantic-ui-react'
import './ProfilePage.css'
function ProfilePage(){

    const user = useSelector(state => state.loginReducer.user)
    
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
                               {user.friends.map(friend => 
                                <Feed.Event>
                                    <Feed.Label image={friend.img_url ? friend.img_url : "https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg"}/>
                                    <Feed.Content>
                                        <Feed.Summary>
                                            {friend.first_name} wants to be your friend!
                                            Would You like to Add {friend.first_name}?
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
                   
                    {user.friends.map(friend => 
                        <Card>
                            <Card.Content>
                                <Image
                                    floated='right'
                                    size='mini'
                                    src={friend.img_url ? friend.img_url : "https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg"}
                                />
                                <Card.Header>{`${friend.first_name} ${friend.last_name}`}</Card.Header>
                                <Card.Meta>{friend.username}</Card.Meta>
                            </Card.Content>
                        </Card>
                    )}        
                    
               </div>
               <div className="users">

               </div>
           </div>
        </div>
    )
}

export default ProfilePage