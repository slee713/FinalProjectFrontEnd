import React from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'
import './NavBar.css'
function NavBar(props) {
    return(
        <div className="navbar">
            <div>Home</div>
            { 
            false ?
            <div className='options'>
                <button>My Profile</button>
                <button>My Hiking Trips</button>
                <button>Logout</button>
            </div>:
            <div className='options'>
                <Login/>
                <Signup/>
            </div>
            }
        </div>
    )
}

export default NavBar