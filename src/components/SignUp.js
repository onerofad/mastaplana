import { useState } from "react"
import { Link } from "react-router-dom"
import { Grid, Header, Segment, Button, Icon, Container, Form } from "semantic-ui-react"
import { useAddUsersMutation, useGetUsersQuery } from "../features/api/apiSlice"

const SignUp = ({mobile}) => {

    const {data:users, isSuccess} = useGetUsersQuery()

    const [loading, setloading] = useState(false)

    const [fname, setfname] = useState('')
    const [mname, setmname] = useState('')
    const [lname, setlname] = useState('')
    const [email, setemail] = useState('')
    const [phone, setphone] = useState('')
    const [accessnumber, setaccessnumber] =useState('')

    const [fnameError, setfnameError] = useState(false)
    const [mnameError, setmnameError] = useState(false)
    const [lnameError, setlnameError] = useState(false)
    const [phoneError, setphoneError] = useState(false)
    const [emailError, setemailError] = useState(false)
    const [accessnumberError, setaccessnumberError] = useState(false)


    const handleFname = (e) => setfname(e.target.value)
    const handleMname = (e) => setmname(e.target.value)
    const handleLname = (e) => setlname(e.target.value)
    const handleEmail = (e) => setemail(e.target.value)
    const handlePhone = (e) => setphone(e.target.value)
    const handleAccessnumber = (e) => setaccessnumber(e.target.value)

    const [insertUser, {isLoading}] = useAddUsersMutation()
    const saveuser = [fname, mname, lname, phone, email, accessnumber].every(Boolean) && !isLoading

    const signupBtn = async () => {

        if(fname === ''){
            setfnameError({content: 'Please enter your first name', pointing: 'above'})
        }else if(mname === ''){
            setmnameError({content: 'Please enter your middle name', pointing: 'above'})
        }else if(lname === ''){
            setlnameError({content: 'Please enter your last name', pointing: 'above'})
        }else if(phone === ''){
            setphoneError({content: 'Please enter your phone number', pointing: 'above'})
        }else if(email === ''){
            setemailError({content: 'Please enter your email address', pointing: 'above'})
        }else if(accessnumber === ''){
            setaccessnumberError({content: 'Please enter your access number', pointing: 'above'})
        }else{
            const user = users.filter(u => u.email === email)[0]
            if(user){
                setemailError({content: 'Email address already exist', pointing: 'above'})
            }else{
                setloading(true)
                if(saveuser){
                    try{
                        await insertUser({fname, mname, lname, phone, email, accessnumber}).unwrap()
                        setfname('')
                        setmname('')
                        setlname('')
                        setphone('')
                        setemail('')
                        setaccessnumber('')
                        setloading(false)
                    }catch(error){
                    console.log('An error has occurred ' + error)
                    }
                }
            }
        }

    }

    return(
        <Container>
        <Segment vertical style={{backgroundColor: '#133467', margin: mobile ? 20 : 40}}>
                <Grid textAlign="center">
                    <Grid.Row>
                        <Grid.Column width={10} textAlign="left" verticalAlign="middle">
                            <Link style={{ fontSize: 20, color: '#fff'}} to="/signin">
                                <Icon inverted name="angle left" color="green" size={mobile ? 'large' : 'big'} />
                                Sign in
                            </Link>
                        </Grid.Column>
                        <Grid.Column textAlign="right" width={6} verticalAlign="middle">
                            <Header inverted content={ mobile ? 'Sign up' : 'Member Sign up'} color="#fff" />

                        </Grid.Column>
    
                    </Grid.Row>   
                    <Grid.Row>
                        <Grid.Column>
                            <Segment vertical style={{backgroundColor: '#fff', borderRadius: 10, borderWidth: '5px', borderStyle: 'solid', borderColor: '#7c5353'}}>
                                <Header textAlign="center" content="MASTA PLANA" as="h1" />
                            </Segment>
                        </Grid.Column>
                       
                    </Grid.Row>  
                    <Grid.Row>
                        <Grid.Column>
                            <Segment vertical style={{backgroundColor: '#fff', borderRadius: 10, borderWidth: '5px', borderStyle: 'solid', borderColor: '#fff'}}>
                                <Form size="big" style={{padding: mobile ? '10px 20px' : '20px 40px'}}>
                                    <Grid>                                
                                        <Grid.Row >
                                            <Grid.Column>
                                                <Form.Group widths="equal">
                                                    <Form.Input 
                                                        placeholder="First name" 
                                                        value={fname}
                                                        onChange={handleFname}
                                                        error={fnameError}
                                                        onClick={() => setfnameError(false)}
                                                        
                                                    />
                                                    <Form.Input 
                                                        placeholder="Middle name" 
                                                        value={mname}
                                                        onChange={handleMname}
                                                        error={mnameError}
                                                        onClick={() => setmnameError(false)}

                                                    />
                                                    <Form.Input 
                                                        placeholder="Last name" 
                                                        value={lname}
                                                        onChange={handleLname}
                                                        error={lnameError}
                                                        onClick={() => setlnameError(false)}

                                                    />
                                                </Form.Group>
                                            </Grid.Column>       
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Form.Group widths="equal">
                                                    <Form.Input 
                                                        placeholder="Phone number"
                                                        value={phone}
                                                        onChange={handlePhone}
                                                        error={phoneError}
                                                        onClick={() => setphoneError(false)}
                                                        
                                                    />
                                                    <Form.Input 
                                                        placeholder="Email address" 
                                                        value={email}
                                                        onChange={handleEmail}
                                                        error={emailError}
                                                        onClick={() => setemailError(false)}

                                                    />
                                                    <Form.Input 
                                                        placeholder="Access number" 
                                                        value={accessnumber}
                                                        onChange={handleAccessnumber}
                                                        error={accessnumberError}
                                                        onClick={() => setaccessnumberError(false)}

                                                    />
                                                </Form.Group>
                                            </Grid.Column>       
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column style={{textAlign: 'center'}}>
                                                <Button 
                                                    loading={loading} 
                                                    size="large" 
                                                    color="green" 
                                                    onClick={signupBtn}
                                                >
                                                    Sign up
                                                </Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>      
                </Grid>
        </Segment>
        </Container>

    )

}
export default SignUp