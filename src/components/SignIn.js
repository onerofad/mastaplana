import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Grid, Header, List, Segment, Button, Image, Icon, Container, Dropdown, Form } from "semantic-ui-react"
 
const users = [
    {
        id: 1,
        email: 'johndoe@gmail.com',
        password: 'password@1234'
    }
]
const SignIn = () => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [loading, setloading] = useState(false)

    const [emailerror, setemailerror] = useState(false)
    const [passworderror, setpassworderror] = useState(false)
    const navigate = useNavigate()

    const handleEmail = (e) => setemail(e.target.value)
    const handlePassword = (e) => setpassword(e.target.value)


    const loginBtn = () => {
        const user = users.filter(u => u.id === 1)[0]
        if(email === ''){
            setemailerror({content: 'Enter email address'})
        }else if(password === ''){
            setpassworderror({content: 'Enter password'})
        }else if(user.email !== email){
            setemailerror({content: 'Email does not exist'})
        }else if(user.password !== password){
            setpassworderror({content: 'Password does not exist'})
        }else{
            setloading(true)
            setTimeout(() => {
                setloading(false)
                navigate("/dashboard")
            }, 3000)     
        }
    }
    return(
        <Container>
        <Segment vertical style={{backgroundColor: '#133467', margin: 40}}>
            <Grid>
<               Grid.Row style={{ margin: '10px 40px'}}>
                    <Grid.Column> 
                        <Header as="h1" inverted content="MASTA PLANA" />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
                <Grid textAlign="center" style={{height: '75vh'}} verticalAlign="middle">
                    
                       
                    <Grid.Row >
                        <Grid.Column style={{ maxWidth: 450}}>
                            <Form size="big">
                                <Form.Field>
                                    <Form.Input placeholder="Email Address" 
                                        value={email}
                                        onChange={handleEmail}
                                        error={emailerror}
                                        type="text"
                                        onClick={() => setemailerror(false)}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input placeholder="Password"
                                        value={password} 
                                        onChange={handlePassword}
                                        error={passworderror}
                                        type="password"
                                        onClick={() => setpassworderror(false)}
                                    />
                                </Form.Field> 
                                <Form.Field>
                                <Button
                                    size="large"
                                    style={{ color: '#fff', backgroundColor: "#3E72C0"}}
                                    onClick={() => loginBtn()}
                                    loading={loading}
                                >
                                    LOGIN
                                </Button>
                                <Link to="/signup" style={{ marginLeft: 10, color: '#fff'}}>
                                    Member Sign up
                                </Link>
                                </Form.Field>      
                            </Form>
                        </Grid.Column>
                     
                    </Grid.Row>                
                </Grid>
        </Segment>
        </Container>

    )

}
export default SignIn