import React from 'react'
import { connect } from 'react-redux'
import { Header, Image, Modal} from 'semantic-ui-react'
import {Form, Button} from 'semantic-ui-react'

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
        .then(resp => {
           
            if (resp.error)
                alert(resp.error)
            else{
                props.loginStatus()
                localStorage.token = resp.token
                localStorage.id = resp.user.id
                setOpen(false)
                props.login(resp.user)
            }
        })
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='mini'
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
                <Button type='submit' style={{width: '100%'}}>Login</Button>
                </Form>
            </Modal.Content>
           
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
        login: (payload) => dispatch({type: "LOGIN", payload}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)