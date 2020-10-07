import React from 'react'
import Login from '../components/Login'

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
                <button>Signup</button>
            </div>
            }
        </div>
    )
}

export default NavBar