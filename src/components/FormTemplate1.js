import { useNavigate } from "react-router-dom"
import { Grid, Header, Segment, Icon, Container, Label, Dropdown, TextArea, Button } from "semantic-ui-react"
import { Link } from "react-router-dom"
const FormTemplate1 = () => {
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
                                width: 60, 
                                height: 60, 
                                borderRadius: 100,
                                backgroundColor: '#fff'
                            }}>
                                <Dropdown text="JD" inline>
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
                                        <Grid.Column width={6} style={{marginTop: 10}}>
                                            <TextArea  placeholder="type..." style={{ minWidth: '100%', minHeight: 300}} />
                                        </Grid.Column>
                                        <Grid.Column width={4} style={{marginTop: 10}}>
                                            <Grid>
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        <Button fluid size="large" color="green">
                                                            FORM
                                                        </Button>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row>
                                                <Grid.Column>
                                                        <Button fluid size="large" color="green">
                                                            FILE
                                                        </Button>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row>
                                                <Grid.Column>
                                                        <Button fluid size="large" color="green">
                                                            TEMPLATE
                                                        </Button>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                            
                                        </Grid.Column>
                                        <Grid.Column width={6} style={{marginTop: 10}}>
                                          <Segment vertical inverted color="teal" style={{ height: 250, borderRadius: 10}}>
                                          </Segment>
                                        </Grid.Column>
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
export default FormTemplate1