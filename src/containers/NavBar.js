import React from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'
function NavBar(props) {
    return(
        <div className="navbar">
            <button>Home</button>
            { 
            true ?
            <div>
                <button>My Profile</button>
                <button>My Hiking Trips</button>
                <button>Logout</button>
            </div>:
            <div>
                <Login/>
                <Signup/>
            </div>
            }
        </div>
    )
}

export default NavBar