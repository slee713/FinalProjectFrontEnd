import React from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'
import './NavBar.css'
import { connect } from 'react-redux'

function NavBar(props) {

    const logout = () => {
        localStorage.clear()
        props.logout()
    }

    return(
        <div className="navbar">
            <div>Home</div>
            { 
            props.logged_in ?
            <div className='options'>
                <button>My Profile</button>
                <button>My Hiking Trips</button>
                <button onClick={logout}>Logout</button>
            </div>:
            <div className='options'>
                <Login/>
                <Signup/>
            </div>
            }
        </div>
    )
}
const mapStateToProps = state => {
    return {
        logged_in: state.loginReducer.logged_in
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch({type: 'LOGOUT'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)