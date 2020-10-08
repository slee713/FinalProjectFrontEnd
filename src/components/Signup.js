import React from 'react'
import { Modal, Button, Form} from 'semantic-ui-react'
import { connect } from 'react-redux'

function Signup(props){
    const [open, setOpen] = React.useState(false)

    const signup = (e) => {
        e.preventDefault()
        let config = {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Accept': 'application/json'
            }, 
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
                first_name: e.target.first_name.value,
                last_name: e.target.last_name.value,
                email: e.target.email.value,
                img_url: e.target.img_url.value
            })
        }
        fetch('http://localhost:3000/api/v1/users', config)
        .then(res => res.json())
        .then(resp => {
            if (resp.error)
                alert(resp.error)
            else {
                localStorage.token = resp.token
                props.login()
                setOpen(false)
            }
        })
    }
    return(
        <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<p>Signup</p>}
        >
            <Modal.Header>Signup</Modal.Header>
            <Modal.Content>
                <Form onSubmit={(e)=> signup(e)}>
                    <Form.Group unstackable widths={2}>
                        <Form.Input required label='First name' placeholder='First name' name="first_name" />
                        <Form.Input required label='Last name' placeholder='Last name' name="last_name"/>
                    </Form.Group>
                    <Form.Group widths={2}>
                        <Form.Input label='Profile Picture' placeholder='Image Url' name="img_url"/>
                        <Form.Input required label='Email' placeholder='Email' name="email"/>
                    </Form.Group>
                    <Form.Group widths={2}>
                        <Form.Input required label='Username' placeholder='Username' name="username"/>
                        <Form.Input required label='Password' type="password" placeholder='Password' name="password"/>
                    </Form.Group>
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

const mapStateToProps = state => {
    return {
        logged_in: state.loginReducer.logged_in
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: () => dispatch({type: "LOGIN"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)