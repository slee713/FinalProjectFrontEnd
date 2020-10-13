import React from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'
import './NavBar.css'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

function NavBar(props) {
    const [login, setLogin] = React.useState(localStorage.token ? true : false)

    const logout = () => {
        localStorage.clear()
        setLogin(false)
        props.logout()
        props.history.push('/')
    }

    const home = () => {
        props.history.push('/')
    }

    const myTrips = () => {
        props.history.push('/mytrips')
    }

    const loginStatus = () => {
        setLogin(true)
    }

    const myProfile = () => {
        props.history.push('/profile')
    }

    return(
        <div className="navbar">
            <div onClick={home}>Home</div>
            { 
            login ?
            <div className='options'>
                <button onClick={myProfile}>My Profile</button>
                <button onClick={myTrips}>My Hiking Trips</button>
                <button onClick={logout}>Logout</button>
            </div>:
            <div className='options'>
                <Login loginStatus={loginStatus}/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))