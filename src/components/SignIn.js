import { Link } from "react-router-dom"
import { Grid, Header, List, Segment, Button, Image, Icon, Container, Dropdown, Form } from "semantic-ui-react"
 
const SignIn = () => {
    return(
        <Container>
        <Segment vertical style={{backgroundColor: '#133467', margin: 80}}>
            <Grid>
<               Grid.Row style={{ margin: '10px 40px'}}>
                    <Grid.Column> 
                        <Header as="h1" inverted content="MASTA PLANA" />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
                <Grid textAlign="center" style={{height: '75vh'}} verticalAlign="middle">
                    
                       
                    <Grid.Row >
                        <Grid.Column style={{ maxWidth: 450}}>
                            <Form size="huge">
                                <Form.Field>
                                    <Form.Input placeholder="Email Address" />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input placeholder="Password" />
                                </Form.Field> 
                                <Form.Field>
                                <Button
                                    color="#3E72C0"
                                    inverted
                                    size="huge"
                                >
                                    LOGIN
                                </Button>
                                <Link style={{ marginLeft: 10, color: '#fff'}}>Sign Up</Link>
                                </Form.Field>      
                            </Form>
                        </Grid.Column>
                     
                    </Grid.Row>                
                </Grid>
        </Segment>
        </Container>

    )

}
export default SignIn