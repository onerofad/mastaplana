import React, { useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Grid, Header, Message, Modal, Segment } from 'semantic-ui-react'

const initialState = {
    open: false,
    size: undefined
}

function modalReducer(state, action){
    switch(action.type){
        case 'open':
            return { open: true, size: action.size}

        case 'close':
            return {open: false}
        
        default:
            return new Error("An error has occurred")
    }
}
const LoginForm = () => {

    const users = [
        {
            'email': 'johndoe@gmail.com',
            'password': 'password@1234'
        },
    ]
    const navigate = useNavigate()
    const [loading, setloading] = useState(false)
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const handleEmail = (e) => setemail(e.target.value)

    const handlePassword = (e) => setpassword(e.target.value)

    const [state, dispatch] = React.useReducer(modalReducer, initialState)
    const {open, size} = state

    const submitBtn = () => {
        if(email === '' || password === ''){
            dispatch({type: 'open', size: 'mini'})
            return null
        }else
            setloading(true)
            setTimeout(() => {
                setloading(false)
                        const user = users.find(u => u.email === email)
                        if(user.email === email && user.password === password){
                            navigate("/dashboard")
                        }
            }, 3000)
    }
    return(
        <Segment color='secondary'>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                MASTA PLANA LOGIN
            </Header>
            <Form size='large'>
                <Segment stacked>
                <Form.Input 
                    fluid 
                    icon='user outline' 
                    iconPosition='right' 
                    placeholder='E-mail address' 
                    name={email}
                    onChange={handleEmail}
                    
                />
                <Form.Input
                    fluid
                    icon='eye'
                    iconPosition='right'
                    placeholder='Password'
                    type='password'
                    name={password}
                    onChange={handlePassword}
                />

                <Button 
                    color='teal' 
                    fluid 
                    size='large'
                    onClick={submitBtn} 
                    loading={loading}
                >
                    Login
                </Button>
                </Segment>
            </Form>
            <Message>
                New to us? <a href='#'>Sign Up</a>
            </Message>
            </Grid.Column>
        </Grid>
        <Modal
            open={open}
            size={size}
            onClose={() => dispatch({type: 'close'})}
        >
            <Modal.Header>Error Message</Modal.Header>
            <Modal.Content>
                <Header as="h5" content="Empty Fields Not Permitted" />
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={() => dispatch({type: 'close'})}>
                    close
                </Button>

            </Modal.Actions>
        </Modal>

        </Segment>
        
    )
}

export default LoginForm