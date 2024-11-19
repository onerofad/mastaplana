import { useNavigate } from "react-router-dom"
import { useEffect, useReducer, useState, useRef } from "react"
import { Container, Segment, Grid, Dropdown, Header, Modal, Icon, Search, Button, Table, Form } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { useAddMemberMutation, useGetMembersQuery } from "../features/api/apiSlice"
import emailjs from '@emailjs/browser';

const initialState = {
    size: undefined,
    open: false
}

function openMember(state, action){
    switch(action.type){
        case 'open':
            return {open: true, size: action.size}

        case 'close':
            return {open: false}

        default:
            return new Error('An error has occurred')
    }
}

const Members = ({mobile}) => {

    const form = useRef()

    const sendEmail = (e) => {
        e.preventDefault()

        emailjs
        .sendForm('service_xb23hnw', 'template_ym6f2ho', form.current, {
            publicKey: 'ksmb9LVXc2VEPulHb',
        })
        .then(
            () => {
            console.log('SUCCESS!');
            },
            (error) => {
            console.log('FAILED...', error.text);
            },
        );
    }
    useEffect(() => {
        dispatch({type: 'open', size: "mini"})
    }, [])

    const options = [
        {key: 'o', text: 'owner', value: 'owner'},
        {key: 't', text: 'member', value: 'member'}
    ]

    const emailId = sessionStorage.getItem("email")

    const navigate = useNavigate()

    const [state, dispatch] = useReducer(openMember, initialState)
    const {open, size} = state

    const [memberEmail, setmemberEmail] = useState("")
    const [memberEmailError, setmemberEmailError] = useState(false)
    
    const [role, setRole] = useState("")
    const [roleError, setRoleError] = useState(false)

    const [member_owner, setmember_owner] = useState(emailId)
   
    const [loading, setloading] = useState(false)

    const handlememberEmail = (e) => {
        setmemberEmail(e.target.value)
    }

    const {data:members, isSuccess} = useGetMembersQuery()

    let members_details
    if(isSuccess){
        members_details = members.map(m => (
            <Table.Row>
                <Table.Cell>{m.memberEmail}</Table.Cell>
                <Table.Cell>{m.accessnumber}</Table.Cell>
                <Table.Cell>{m.member_owner}</Table.Cell>
                <Table.Cell>{m.status}</Table.Cell>
            </Table.Row>
        ))
    }

    const [getMember, {isLoading}] = useAddMemberMutation()
    const saveMember = [memberEmail, role, member_owner].every(Boolean) && !isLoading

    const addMember = async () => {
        if(memberEmail === ''){
            setmemberEmailError({content: 'Enter member email;', pointer: 'above'})
        }else if(role === ''){
            setRoleError({content: 'Enter a role', pointer: 'above'})
        }else{
            
                try{
                    if(saveMember){
                        setloading(true)
                        await getMember({memberEmail, role, member_owner}).unwrap()
                        setloading(false)
                        setmemberEmail("")
                    }
                }catch(error){
                    console.log('An error has occurred ' + error)
                }
            
        }
    }
    return(
        <Container>
        <Segment vertical style={{backgroundColor: '#133467', margin: mobile ? 10 : 40}}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={ mobile ? 4 : 6} verticalAlign="middle">
                            <Link style={{ fontSize: 20, color: '#fff'}} to="/dashboard">
                                <Icon inverted name="angle left" color="green" size='big' />
                            </Link>
                        </Grid.Column>
                        <Grid.Column width={ mobile ? 4 : 6} verticalAlign="middle">
                            <Header 
                                as={ mobile ? 'h4' : 'h1'} 
                                inverted 
                                content="MEMBERS" 
                                color="#fff" 
                                style={{
                                    fontFamily: 'Spicy Rice',
                                    fontWeight: 400,
                                    fontStyle: 'normal'
                                }}
                            />
                        </Grid.Column>
                        <Grid.Column width={ mobile ? 4 : 2} verticalAlign="middle">
                            <Icon name="calendar alternate outline" inverted color="#fff" size="big" />
                        </Grid.Column>
                        <Grid.Column width={ mobile ? 4 : 2} style={{textAlign: 'center'}}>
                            <Segment floated="right" vertical style={{ 
                                alignSelf: 'right', 
                                alignContent: 'center',
                                width: 50, 
                                height: 50, 
                                borderRadius: 100,
                                backgroundColor: '#fff'
                            }}>
                                <Dropdown 
                                    text={sessionStorage.getItem("fname").charAt(0).toUpperCase()} 
                                    inline
                                >
                                  <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => navigate("/signin")}>
                                        Log out
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>   
                    <Grid.Row>
                        <Grid.Column>
                            <Segment vertical style={{padding: mobile ? 20 : 30, borderRadius: 10, backgroundColor: '#fff'}}>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                            <Search
                                                placeholder="Search Member"
                                                size={mobile ? "mini" : "large"}
                                                fluid
                                            />

                                        </Grid.Column>
                                        <Grid.Column width={8}>
                                            <Button
                                                size={mobile ? "mini" : "large"}
                                                floated="right"
                                                icon
                                                labelPosition="left"
                                                onClick={() => dispatch({type: 'open', size: "mini"})}
                                                style={{
                                                    borderRadius: 10,
                                                    color: "green"
                                                }}
                                            >
                                                <Icon name="user" />
                                                Add Member
                                            </Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Table fixed size={mobile ? "small" : "large"}>
                                                <Table.Header>
                                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                                    <Table.HeaderCell>Access Code</Table.HeaderCell>
                                                    <Table.HeaderCell>Role</Table.HeaderCell>
                                                    <Table.HeaderCell>Status</Table.HeaderCell>
                                                </Table.Header>
                                                <Table.Body>
                                                    {members_details}
                                                </Table.Body>

                                            </Table>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>                                
                </Grid>
                <Modal
                    open={open}
                    size={size}
                >
                    <Modal.Header>
                        Invite a team member
                        <Icon
                            onClick = {() => dispatch({type: 'close'})}
                            link
                            name="close"
                            style={{
                                float: 'right'
                            }}
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Member Email</label>
                                <Form.Input
                                    placeholder="Member Email"
                                    value={memberEmail}
                                    onChange={handlememberEmail}
                                    error={memberEmailError}
                                    onClick={() => setmemberEmailError(false)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Role</label>
                                <Form.Select
                                    placeholder="Role"
                                    options={options}
                                    error={roleError}
                                    value={role}
                                    onChange={(e, {value}) => setRole(value.toString())}
                                    onClick={() => setRoleError(false)}
                                />
                            </Form.Field>
                            <Button
                                color="youtube"
                                size="large"
                                onClick={() => dispatch({type: 'close'})}
                            >
                                Cancel
                            </Button>
                            <Button
                                loading = {loading}
                                color="green"
                                size="large"
                                onClick={addMember}
                            >
                                Send Invitation
                            </Button>
                        </Form>

                    </Modal.Content>
                </Modal>
        </Segment>
        </Container>

    )
}
export default Members