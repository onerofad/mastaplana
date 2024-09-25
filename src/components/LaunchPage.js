import { useEffect, useState } from "react"
import { Grid, Header, Segment, Container, Loader } from "semantic-ui-react"
import SignIn from "./SignIn"
 
const LaunchPage = ({mobile}) => {
    const [loading, setloading] = useState(false)
    useEffect(() => {
      setTimeout(() => {
        setloading(true)
      }, 10000);
    },[])


    return(
        <Container>
        <Segment vertical style={{backgroundColor: '#133467', margin: mobile ? 10 : 40}}>
                
                            <Segment vertical style={{backgroundColor: '#3A54AF', margin: mobile ? 30: 60}}>
                               
                                            <Segment vertical style={{backgroundColor: '#3E72C0', margin: mobile ? 30 : 60}}>
                                                <Grid textAlign="center" verticalAlign="middle">
                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            <Header style={{ margin: 10 }} textAlign="center" as="h1" content="MASTA PLANA" inverted  />
                                                            <Loader inverted active inline size="big">
                                                                Loading,,,
                                                            </Loader>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>

                                            </Segment>
                            </Segment>
                        
        </Segment>
        </Container>

    )
    

}
export default LaunchPage