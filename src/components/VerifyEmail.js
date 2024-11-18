import { Container, Grid, Header, Segment } from "semantic-ui-react"
import { useParams } from "react-router-dom"

const VerifyEmail = ({mobile}) => {

    const param = useParams()

    return(
        <Container>
            <Segment vertical>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Header>{param.email}</Header>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Segment>
        </Container>
    )

}
export default VerifyEmail