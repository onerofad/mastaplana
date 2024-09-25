import { useEffect, useState } from "react"
import { Grid, Header, List, Segment, Button, Image, Icon, Container, Dropdown, Loader } from "semantic-ui-react"
import SignIn from "./SignIn"
 
const LaunchPage = (mobile) => {
    const [loading, setloading] = useState(false)
    useEffect(() => {
      setTimeout(() => {
        setloading(true)
      }, 10000);
    },[])

    if(loading){
        return(
            <SignIn />
        )
    }else{
    return(
        <Container>
        <Segment vertical style={{backgroundColor: '#133467', margin: mobile ? 20 : 40}}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column> 
                            <Segment vertical style={{backgroundColor: '#3A54AF', margin: mobile ? 30: 60}}>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Segment vertical style={{backgroundColor: '#3E72C0', margin: mobile ? 30 : 60}}>
                                                <Grid textAlign="center" verticalAlign="middle">
                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            <Header style={{ margin: 40 }} textAlign="center" as="h1" content="MASTA PLANA" inverted  />
                                                            <Loader inverted active inline size="big">
                                                                Loading,,,
                                                            </Loader>
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

}
export default LaunchPage