import React from 'react'
import { connect } from 'react-redux'
import { Header, Image, Modal } from 'semantic-ui-react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

function Login(props){
    const [open, setOpen] = React.useState(false)

    const login = (e) => {
        e.preventDefault()
        let configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value
            })
        }
        fetch("http://localhost:3000/api/v1/login", configObj)
        .then(res => res.json())
        .then(user => {
            if (user.error)
                alert(user.errot)
            else{
                localStorage.token = user.token
                setOpen(false)
                props.login()
            }
        })
    }

    return (
        <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<p>Login</p>}
        >
            <Modal.Header>Login</Modal.Header>
            <Modal.Content>
          
                <Form onSubmit={(e) => login(e)} ho>
                <Form.Field required>
                    <label for="username">Username</label>
                    <input id="username" placeholder='username' name="username"/>
                </Form.Field>
                <Form.Field required>
                    <label for="password">Password</label>
                    <input id="password" type="password" name='password'/>
                </Form.Field>
                <Button type='submit'>Submit</Button>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <button color='green' onClick={() => setOpen(false)}>
                    Back
                </button>
            </Modal.Actions>
      </Modal>
    )
}
const mapStateToProps = (state) => {
    return {
        logged_in: state.loginReducer.logged_in
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: () => dispatch({type: "LOGIN"}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)