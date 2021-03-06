import React from 'react'
import { Modal, Button, Form} from 'semantic-ui-react'
import { connect } from 'react-redux'

function Signup(props){
    const [open, setOpen] = React.useState(false)

    const signup = (e) => {
        e.preventDefault()
        let image
        if(e.target.img_url.value)
            image=e.target.img_url.value
        else
            image = "https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg"
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
                img_url: image
            })
        }
        fetch('http://localhost:3000/api/v1/users', config)
        .then(res => res.json())
        .then(resp => {
            if (resp.error)
                alert(resp.error)
            else {
                localStorage.token = resp.token
                localStorage.id = resp.user.id
                props.login(resp.user)
                setOpen(false)
            }
        })
    }
    return(
        <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size='small'
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
                    <Button type='submit' style={{width: '100%', 'background-color': '#438f44'}}>Submit</Button>
                </Form>
                
            </Modal.Content>

            
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
        login: (payload) => dispatch({type: "LOGIN", payload})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)