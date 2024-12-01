import { useNavigate } from "react-router-dom"
import { Grid, Header, Label, Segment, Icon, Container, Dropdown, Button, Portal } from "semantic-ui-react"
import { useAcceptMembershipMutation, useDeclineMembershipMutation, useGetMembersQuery } from "../features/api/apiSlice"
import { useState } from "react"

const Dashboard = ({mobile}) => {

    const navigate = useNavigate()

    const [loading, setloading] = useState(false)

    const [loading1, setloading1] = useState(false)

    const [updateAcceptInvite, {isLoading}] = useAcceptMembershipMutation()

    //const updateAccept = [status].every(Boolean) && !isLoading
    const accept = async (editId) => {
        try{
            let status = "accept"
            setloading(true)
            await updateAcceptInvite({id: editId, status}).unwrap()
            setloading(false)
        }catch(error){
            console.log('An error has occurred ' + error)
        }
    }

    const [updateDeclineInvite] = useDeclineMembershipMutation()

   // const updateDecline = [status].every(Boolean) && !isLoading

    const decline = async (editId) => {
        try{
            let status = "decline"
            setloading1(true)
            await updateDeclineInvite({id: editId, status}).unwrap()
            setloading1(false)
        }catch(error){
            console.log('An error has occurred ' + error)
        }
    }

    const {data:members, isSuccess} = useGetMembersQuery()

    let notifications
    let count = 0
    if(isSuccess){
        const current_notifications = members.filter(m => m.memberEmail === sessionStorage.getItem("email"))
        if(current_notifications){
            notifications = current_notifications.map(n => {
                if(n.status === 'pending'){
                    ++count
                    return(
                        <p>
                            1. Pending member request from<br/>
                            <span style={{color: "green"}}> 
                                {n.community_owner}
                            </span>
                            <Button 
                                size="mini" 
                                color="positive"
                                onClick={() => accept(n.id)}
                                loading={loading}
                            >
                                yes
                            </Button>
                            <Button 
                                size="mini" 
                                color="negative"
                                onClick={() => decline(n.id)}
                                loading={loading1}
                            >
                                No
                            </Button>
                        </p>
                    )
                }
            })
        }
    }
    
    return(
        <Container>
        <Segment vertical style={{backgroundColor: '#133467', margin: mobile ? 20 : 40}}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={mobile ? 4 : 5} verticalAlign="middle">
                            <Button 
                                color="green"
                                size={ mobile ? "mini" : "large"}
                                onClick={() => {
                                    navigate("/community")
                                }
                                }
                            >
                                COMMUNITY
                            </Button>
                            {/*<Header inverted content="Add Member" color="#fff" />*/}
                        </Grid.Column>
                        <Grid.Column width={ mobile ? 4 : 5} verticalAlign="middle">
                            <Header 
                                as={ mobile ? '' : 'h1'} 
                                inverted 
                                content="DASHBOARD" 
                                color="#fff" 
                                style={{
                                    fontFamily: 'Spicy Rice',
                                    fontWeight: 400,
                                    fontStyle: 'normal'
                                }}
                            />
                        </Grid.Column> 
                        <Grid.Column width={mobile ? 4 : 2} verticalAlign="middle">
                            <Portal
                                closeOnTriggerClick
                                openOnTriggerClick
                                trigger={
                                    <Icon 
                                        name="bell outline" 
                                        inverted 
                                        color="#fff" 
                                        size="big" 
                                    />
                                }
                            
                            >
                                <Segment
                                    style={{
                                        left: '50%',
                                        position: 'fixed',
                                        top: '18%',
                                        zIndex: 500,
                                    }}
                                    >
                                    <Header attached>Pending Member Invites</Header>
                                        {notifications}
                                    </Segment>
                            </Portal>
                            
                            <Label circular color="red">{count}</Label>
                        </Grid.Column>                          
                        <Grid.Column width={mobile ? 4 : 2} verticalAlign="middle">
                            <Icon name="calendar alternate outline" inverted color="#fff" size="big" />
                        </Grid.Column>
                        <Grid.Column width={mobile ? 4 : 2} style={{textAlign: 'center'}}>
                            <Segment floated="right" vertical style={{ 
                                alignSelf: 'right', 
                                alignContent: 'center',
                                width: 50, 
                                height: 50, 
                                borderRadius: 100,
                                backgroundColor: '#fff'
                            }}>
                                <Dropdown 
                                    text={
                                        sessionStorage.getItem("fname").charAt(0).toUpperCase()
                                        + " " +
                                        sessionStorage.getItem("lname").charAt(0).toUpperCase()
                                    }
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
                            <Segment vertical style={{backgroundColor: '#fff', borderRadius: 10, borderWidth: '5px', borderStyle: 'solid', borderColor: '#7c5353'}}>
                                <Header 
                                    textAlign="center" 
                                    content="MASTA PLANA" 
                                    as="h1" 
                                    style={{
                                        fontFamily: 'Spicy Rice',
                                        fontWeight: 400,
                                        fontStyle: 'normal'
                                    }}
                                />
                            </Segment>
                        </Grid.Column>
                       
                    </Grid.Row>  
                    <Grid.Row>
                        <Grid.Column>
                            <Segment vertical style={{paddingTop: 20, paddingBottom: 20, borderRadius: 10, borderWidth: '5px', borderStyle: 'solid', borderColor: '#fff'}}>
                                <Grid textAlign="center">
                                    <Grid.Row>
                                        <Grid.Column width={mobile ? 8 : 2} textAlign="center" style={{marginTop: 40}}>
                                            <Icon inverted size="huge"  link={true} onClick={() => navigate("/document")} color="green" name="edit outline" />
                                            <Header as="h4" inverted content="DOCUMENT" />
                                        </Grid.Column>
                                        {/*<Grid.Column width={mobile ? 8 : 2} textAlign="center" style={{marginTop: 40}}>
                                            <Icon inverted size="huge" color="green" name="ticket" />
                                            <Header as="h4" inverted content="SCAN" />
                                        </Grid.Column> */}
                                        <Grid.Column width={mobile ? 8 : 2} textAlign="center" style={{marginTop: 40}}>
                                            <Icon inverted size="huge" link={true} onClick={() => navigate("/photos")} color="green" name="image outline" />
                                            <Header as="h4" inverted content="PHOTOS" />
                                        </Grid.Column>
                                        {/*<Grid.Column width={mobile ? 8 : 2} textAlign="center" style={{marginTop: 40}}>
                                            <Icon inverted size="huge" color="green" name="file alternate outline" />
                                            <Header as="h4" inverted content="DOCUMENT" />
                                        </Grid.Column> */}
                                        <Grid.Column width={mobile ? 8 : 2} textAlign="center" style={{marginTop: 40}}>
                                            <Icon inverted size="huge" link={true} onClick={() => navigate("/audio")} color="green" name="music" />
                                            <Header as="h4" inverted content="AUDIO" />
                                        </Grid.Column>
                                        <Grid.Column width={mobile ? 8 : 2} textAlign="center" style={{marginTop: 40}}>
                                            <Icon inverted size="huge" link={true} onClick={() => navigate("/video")} color="green" name="youtube square" />
                                            <Header as="h4" inverted content="VIDEO" />
                                        </Grid.Column>
                                       {/*} <Grid.Column width={mobile ? 8 : 2} textAlign="center" style={{marginTop: 40}}>
                                            <Icon inverted size="huge" color="green" name="bell outline" />
                                            <Header as="h4" inverted content="NOTICE CENTER" />
                                        </Grid.Column> */}
                                        {/*<Grid.Column width={mobile ? 8 : 2} textAlign="center" style={{marginTop: 40}}>
                                            <Icon inverted size="huge" color="green" name="home" />
                                            <Header as="h4" inverted content="OFFICE" />
                                        </Grid.Column> */}
                                       
                                    </Grid.Row>
                                </Grid>

                            </Segment>
                        </Grid.Column>
                    </Grid.Row> 
                    <Grid.Row>
                        <Grid.Column>
                            <Segment vertical style={{borderRadius: 10, borderWidth: '5px', borderStyle: 'solid', borderColor: '#fff'}}>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                            <Icon inverted size="huge" color="green" name="microphone" />
                                        </Grid.Column>
                                        <Grid.Column width={8} textAlign="right">
                                            <Icon  inverted size="huge" color="green" name="chat" />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>           
                </Grid>
        </Segment>
        </Container>

    )

}
export default Dashboard