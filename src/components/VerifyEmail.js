import { Button, Container, Grid, Header, Segment, Modal, Icon } from "semantic-ui-react"
import { useParams } from "react-router-dom"
import { useGetUsersQuery, useVerify_emailMutation } from "../features/api/apiSlice"
import { useReducer, useState } from "react"

const iinitialState = {
    open: false,
    size: undefined,
}

function ModalReducer(state, action){
    switch(action.type){
        case 'open':
            return {open: true, size: action.size}

        case 'close':
            return {open: false}

        default:
            return new Error('An error occurred')
    }
}


const VerifyEmail = ({mobile}) => {

    const [state, dispatch] = useReducer(ModalReducer, iinitialState)

    const {open, size} = state

    const [verify, setverify] = useState(1)

    const param = useParams()

    const [userId, setuserId] = useState("")

    const {data:users, isSuccess} = useGetUsersQuery()

    if(isSuccess){
        const current_user = users.filter(u => u.email === param.email)[0]
        if(current_user){
            setuserId(current_user.id)
        }
    }

    const [updateEmail, {isLoading}] = useVerify_emailMutation()

    const saveEmail = [verify].every(Boolean) && !isLoading

    const verifyBtn = async () => {
        try{
            if(saveEmail){
                await updateEmail({id: userId, verify}).unwrap()
                dispatch({type: 'open', size: "mini"})
            }
        }catch(error){
            console.log('An error has occurred ' + error)
        }     
    }

    return(
        <Container>
            <Segment vertical style={{padding: 30, borderRadius: 10, backgroundColor: '#fff'}}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Header
                                content="Verify Email Address"
                                as="h1"  
                                inverted
                                textAlign="center"                   
                            />

                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Button 
                                color="green"
                                size="large"
                                onClick={verifyBtn}
                            >
                                Verify your email - {param.email}
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Modal
                    open={open}
                    size={size}
                >
                    <Modal.Header>
                        <Button
                            color="green"
                            size="large"
                            onClick={() => dispatch({type: 'open', size: "mini"})}
                        >
                            OK
                        </Button>    
                       
                       <Modal.Content>
                            <Header textAlign="center"  icon>
                                <Icon inverted circular size={20} name="checkmark" color="green" />
                                Email Successfully Verified
                            </Header>
                       </Modal.Content>
                    </Modal.Header>
                </Modal>
            </Segment>
        </Container>
    )

}
export default VerifyEmail