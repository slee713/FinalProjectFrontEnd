import React from 'react'
import { Modal, Button } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
    deletingUser
} from '../redux/actions'

function DeleteUserModal(props){
    const [open, setOpen] = React.useState(false)

    const dispatch = useDispatch()

    const confirm = () => {
        dispatch(deletingUser())
        dispatch({type: "LOGOUT"})
        localStorage.clear()
        props.history.push('/')
    }

    const decline =() => {
        setOpen(false)
    }

    return(
        <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size='mini'
        trigger={<p>Delete Account</p>}
        >
            <Modal.Content>
                <h2>Are you sure you want to delete your account?</h2>
                <div className="buttons">
                    <button onClick={confirm}>Yes</button>
                    <button onClick={decline}>No</button>
                </div>
            </Modal.Content>

        </Modal>
    )
}

export default withRouter(DeleteUserModal)