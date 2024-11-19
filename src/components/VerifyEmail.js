import { Button, Container, Grid, Header, Segment, Modal, Icon } from "semantic-ui-react"
import { Link, useParams } from "react-router-dom"
import { useGetUsersQuery, useVerify_emailMutation } from "../features/api/apiSlice"
import { useReducer, useState } from "react"

const VerifyEmail = ({mobile}) => {

    let verifyemail = 1

    const param = useParams()

    let emailId = param.email 

    const [loading, setloading] = useState(false)

    const [msg, setMsg] = useState(false)

    const {data:users, isSuccess} = useGetUsersQuery()
    let current_user
    if(isSuccess){
        current_user = users.filter(u => u.email === emailId)[0]
    }

    const [updateEmail, {isLoading}] = useVerify_emailMutation()

    const saveEmail = [verifyemail].every(Boolean) && !isLoading

    const verifyBtn = async () => {
        try{
            if(saveEmail){
                setloading(true)
                await updateEmail({id: current_user.id, verifyemail}).unwrap()
                setloading(false)
                if(current_user.verifyemail === 1){
                    setMsg(true)
                }
                
            }
        }catch(error){
            console.log('An error has occurred ' + error)
        }     
    }

    return(
        <Container>
            <Segment vertical style={{margin: mobile ? 20 : 40, padding: 30, borderRadius: 10, backgroundColor: '#fff'}}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Header
                                content="Verify Email Address"
                                as="h1"  
                                textAlign="center"                   
                            />

                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Header textAlign="center" as="h4" content={param.email} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column textAlign="center">
                            <Button 
                                color="green"
                                size="large"
                                onClick={verifyBtn}
                                loading={loading}
                            >
                                Verify your email
                            </Button>
                            {
                                msg &&
                                    <Header as="h5">
                                        Email Already Verified
                                        <Link style={{color: '#fff'}} to="/signin" >Sign In</Link>
                                    </Header>
                            
                            }
                            
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>
    )

}
export default VerifyEmail