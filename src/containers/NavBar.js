import React from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'
import './NavBar.css'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

function NavBar(props) {
    const [login, setLogin] = React.useState(props.logged_in)

    const logout = () => {
        localStorage.clear()
        props.logout()
        props.history.push('/')
    }

    const home = () => {
        props.history.push('/')
    }

    const myTrips = () => {
        props.history.push('/mytrips')
    }



    const myProfile = () => {
        props.history.push('/profile')
    }

    return(
        <div className="navbar">
            <div className="logo">
                <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Backpack_icon.svg/1200px-Backpack_icon.svg.png"}/>
                <div onClick={home}>GearUP</div>
            </div>
            
            { 
            props.logged_in ?
            <div className='logged-in-options'>
                <p onClick={myTrips}>My Hiking Trips</p>
                <p onClick={myProfile}>My Profile</p>
                <p onClick={logout}>Logout</p>
            </div>:
            <div className='options'>
                <Login />
                <Signup />
            </div>
            }
        </div>
    )
}
const mapStateToProps = state => {
    return {
        logged_in: state.loginReducer.loggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch({type: 'LOGOUT'})
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))