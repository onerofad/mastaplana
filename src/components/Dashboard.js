import { useNavigate } from "react-router-dom"
import { Grid, Header, Segment, Icon, Container, Label, Dropdown } from "semantic-ui-react"

const Dashboard = () => {
    const navigate = useNavigate()
    return(
        <Container>
        <Segment vertical style={{backgroundColor: '#14253F', margin: 40}}>
                <Grid>
                    <Grid.Row style={{margin: '5px 40px'}}>
                        <Grid.Column width={12} verticalAlign="middle">
                            <Header inverted content="Member" color="#fff" />
                        </Grid.Column>
                        <Grid.Column width={2} verticalAlign="middle">
                            <Icon name="calendar alternate outline" inverted color="#fff" size="big" />
                        </Grid.Column>
                        <Grid.Column width={2} style={{alignSelf: 'right'}}>
                            <Segment textAlign="right" size="tiny" circular color="#fff">
                                <Dropdown text="JD">
                                  <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => navigate("/signin")}>
                                        Log out
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                            </Segment>
                            {/*<Header  inverted content="Profile" />*/}
                        </Grid.Column>
                    </Grid.Row>   
                    <Grid.Row  style={{margin: '5px 40px'}}>
                        <Grid.Column>
                            <Segment vertical style={{backgroundColor: '#fff', borderRadius: 10, borderWidth: '5px', borderStyle: 'solid', borderColor: '#7c5353'}}>
                                <Header textAlign="center" content="MASTA PLANA" as="h1" />
                            </Segment>
                        </Grid.Column>
                       
                    </Grid.Row>  
                    <Grid.Row style={{margin: '5px 40px'}}>
                        <Grid.Column>
                            <Segment vertical style={{paddingTop: 20, paddingBottom: 20, borderRadius: 10, borderWidth: '5px', borderStyle: 'solid', borderColor: '#fff'}}>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={2} textAlign="center">
                                            <Icon inverted size="huge" color="green" name="edit outline" />
                                            <Header as="h4" inverted content="DOCUMENT" />
                                        </Grid.Column>
                                        <Grid.Column width={2} textAlign="center">
                                            <Icon inverted size="huge" color="green" name="ticket" />
                                            <Header as="h4" inverted content="SCAN" />
                                        </Grid.Column>
                                        <Grid.Column width={2} textAlign="center">
                                            <Icon inverted size="huge" color="green" name="image outline" />
                                            <Header as="h4" inverted content="PHOTOS" />
                                        </Grid.Column>
                                        <Grid.Column width={2} textAlign="center">
                                            <Icon inverted size="huge" color="green" name="file alternate outline" />
                                            <Header as="h4" inverted content="DOCUMENT" />
                                        </Grid.Column>
                                        <Grid.Column width={2} textAlign="center">
                                            <Icon inverted size="huge" color="green" name="music" />
                                            <Header as="h4" inverted content="AUDIO" />
                                        </Grid.Column>
                                        <Grid.Column width={2} textAlign="center">
                                            <Icon inverted size="huge" color="green" name="youtube square" />
                                            <Header as="h4" inverted content="VIDEO" />
                                        </Grid.Column>
                                        <Grid.Column width={2} textAlign="center">
                                            <Icon inverted size="huge" color="green" name="bell outline" />
                                            <Header as="h4" inverted content="NOTICE CENTER" />
                                        </Grid.Column>
                                        <Grid.Column width={2} textAlign="center">
                                            <Icon inverted size="huge" color="green" name="home" />
                                            <Header as="h4" inverted content="OFFICE" />
                                        </Grid.Column>
                                       
                                    </Grid.Row>
                                </Grid>

                            </Segment>
                        </Grid.Column>
                    </Grid.Row> 
                    <Grid.Row style={{margin: '5px 40px'}}>
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