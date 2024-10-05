import { Container, Grid, Segment, Header, Dropdown, Icon, Form, Button } from "semantic-ui-react"
import { Link, useNavigate } from "react-router-dom"

const Audio = () => {

    const navigate = useNavigate()
    return(
        <Container>
        <Segment vertical style={{backgroundColor: '#133467', margin: 40}}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={6} verticalAlign="middle">
                            <Link style={{ fontSize: 20, color: '#fff'}} to="/dashboard">
                                <Icon inverted name="angle left" color="green" size='big' />
                            </Link>
                        </Grid.Column>
                        <Grid.Column width={6} verticalAlign="middle">
                            <Header as="h1" inverted content="MASTA PLANA" color="#fff" />
                        </Grid.Column>
                        <Grid.Column width={2} verticalAlign="middle">
                            <Icon name="calendar alternate outline" inverted color="#fff" size="big" />
                        </Grid.Column>
                        <Grid.Column width={2} style={{textAlign: 'center'}}>
                            <Segment vertical style={{ 
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
                            <Segment vertical style={{padding: 20, borderRadius: 10, backgroundColor: '#fff'}}>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={5} style={{marginTop: 10}}>
                                        <Form>
                                            <Form.Field>
                                                <Form.Input
                                                    type="text"
                                                    placeholder="Enter Receiver Email"
                                                   
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                            <Form.Input
                                                type="file"
                                                placeholder="Select a file"
                                               
                                            />
                                            </Form.Field>
                                            <Button  size="large" color="green">
                                            Send
                                            </Button>
                                          
                                        </Form>
                                        </Grid.Column>
                                        <Grid.Column width={4} style={{marginTop: 10}}>
                                          <Segment vertical inverted color="yellow" style={{ padding: 10, maxHeight: 300, borderRadius: 10, overflowY: 'auto'}}>
                                          
                                                <Header inverted  textAlign="center" as="h4" content="RECEIVED PHOTOS" />

                                                   
                                          </Segment>
                                        </Grid.Column>
                                        <Grid.Column width={7} style={{marginTop: 10}}>
                                          <Segment vertical inverted color="teal" style={{ padding: 10, height: 300, borderRadius: 10}}>
                                           

                                          </Segment>
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
export default Audio