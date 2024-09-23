import { useEffect } from "react"
import { Grid, Header, List, Segment, Button, Image, Icon, Container, Dropdown } from "semantic-ui-react"
 
const LaunchPage = () => {

    useEffect(() => {
    
    },[])
    return(
        <Container>
        <Segment vertical style={{backgroundColor: '#133467', margin: 80}}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column> 
                            <Segment vertical style={{backgroundColor: '#3A54AF', margin: 80}}>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Segment vertical style={{backgroundColor: '#3E72C0', margin: 80}}>
                                                <Grid>
                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            <Header style={{ margin: 80 }} textAlign="center" as="h1" content="MASTA PLANA" inverted  />
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>

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
export default LaunchPage