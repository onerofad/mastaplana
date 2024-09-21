import { Grid, Header, List, Segment, Button, Image, Icon, Container, Dropdown, Form, Search } from "semantic-ui-react"

const SignUp = () => {
    return(
        <Container>
        <Segment vertical style={{backgroundColor: '#14253F', marginTop: 80}}>
                <Grid>
                    <Grid.Row style={{margin: '10px 40px'}}>
                        <Grid.Column width={10} verticalAlign="middle">
                            <Icon inverted name="angle left" color="green" size="big" />
                            <Header inverted content="Member" color="#fff" />
                        </Grid.Column>
                        <Grid.Column width={2} textAlign="center" verticalAlign="middle">
                            <Header inverted content="DOWNLOAD" />
                            <Icon inverted color="blue" name="cloud download" size="large" />
                        </Grid.Column>
                        <Grid.Column width={2} verticalAlign="middle">
                            <Icon name="calendar alternate outline" inverted color="#fff" size="huge" />
                        </Grid.Column>
                        <Grid.Column width={2} style={{alignSelf: 'right'}}>
                            <Segment textAlign="right" size="mini" circular color="#fff">
                            </Segment>
                            <Header  inverted content="Profile" />


                        </Grid.Column>
                    </Grid.Row>   
                    <Grid.Row  style={{margin: '10px 40px'}}>
                        <Grid.Column>
                            <Segment vertical style={{backgroundColor: '#fff', borderRadius: 10, borderWidth: '5px', borderStyle: 'solid', borderColor: '#7c5353'}}>
                                <Header textAlign="center" content="MASTA PLANA" as="h1" />
                            </Segment>
                        </Grid.Column>
                       
                    </Grid.Row>  
                    <Grid.Row style={{margin: '10px 40px'}}>
                        <Grid.Column>
                            <Segment vertical style={{backgroundColor: '#fff', borderRadius: 10, borderWidth: '5px', borderStyle: 'solid', borderColor: '#fff'}}>
                                <Form size="huge" style={{padding: '40px 40px'}}>
                                    <Grid>                                
                                        <Grid.Row >
                                            <Grid.Column>
                                                <Form.Group widths="equal">
                                                    <Form.Input placeholder="First name" />
                                                    <Form.Input placeholder="Middle name" />
                                                    <Form.Input placeholder="Last name" />
                                                </Form.Group>
                                            </Grid.Column>       
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Form.Group widths="equal">
                                                    <Form.Input placeholder="Phone number" />
                                                    <Form.Input placeholder="Email address" />
                                                    <Form.Input placeholder="Access number" />
                                                </Form.Group>
                                            </Grid.Column>       
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column textAlign="center">
                                                <Search  placeholder="Search" />
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row> 
                    <Grid.Row style={{margin: '10px 40px'}}>
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
export default SignUp