import React, { useState } from 'react'
import { Button,
         Form, 
         Grid, 
         Header, 
         Image, 
         Message, 
         Segment 
        } from 'semantic-ui-react'

const LoginForm = () => {

    const users = [
        {
            'email': 'johndoe@gmail.com',
            'password': 'password@1234'
        },
    ]
    const [loading, setloading] = useState(false)
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const submitBtn = () => {
        setloading(true)
       setTimeout(() => {
        setloading(false)
            if(email !== '' && password !== ''){

            }else{

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
                />
                <Form.Input
                    fluid
                    icon='eye'
                    iconPosition='right'
                    placeholder='Password'
                    type='password'
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

        </Segment>
        
    )
}

export default LoginForm