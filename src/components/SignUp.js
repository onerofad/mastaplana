import { Link } from "react-router-dom"
import { Grid, Header, List, Segment, Button, Image, Icon, Container, Dropdown, Form, Search } from "semantic-ui-react"

const SignUp = ({mobile}) => {
    return(
        <Container>
        <Segment vertical style={{backgroundColor: '#133467', margin: mobile ? 20 : 40}}>
                <Grid>
                    <Grid.Row style={{margin: mobile ? '5px 10px' : '5px 40px'}}>
                        <Grid.Column width={10} verticalAlign="middle">
                            <Link style={{ fontSize: 20, color: '#fff'}} to="/signin">
                                <Icon inverted name="angle left" color="green" size={mobile ? 'large' : 'big'} />
                                Sign in
                            </Link>
                        </Grid.Column>
                        <Grid.Column textAlign="right" width={6} verticalAlign="middle">
                            <Header inverted content={ mobile ? 'Sign up' : 'Member Sign up'} color="#fff" />

                        </Grid.Column>
    
                    </Grid.Row>   
                    <Grid.Row  style={{margin: mobile ? '5px 10px' : '5px 40px'}}>
                        <Grid.Column>
                            <Segment vertical style={{backgroundColor: '#fff', borderRadius: 10, borderWidth: '5px', borderStyle: 'solid', borderColor: '#7c5353'}}>
                                <Header textAlign="center" content="MASTA PLANA" as="h1" />
                            </Segment>
                        </Grid.Column>
                       
                    </Grid.Row>  
                    <Grid.Row style={{margin: mobile ? '5px 10px' : '5px 40px'}}>
                        <Grid.Column>
                            <Segment vertical style={{backgroundColor: '#fff', borderRadius: 10, borderWidth: '5px', borderStyle: 'solid', borderColor: '#fff'}}>
                                <Form size="big" style={{padding: mobile ? '10px 20px' : '20px 40px'}}>
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
                                            <Grid.Column style={{textAlign: 'center'}}>
                                                <Button size="large" color="green" >
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