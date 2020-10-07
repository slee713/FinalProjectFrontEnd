import React from 'react'

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
                <button>Login</button>
                <button>Signup</button>
            </div>
            }
        </div>
    )
}

export default NavBar