import { Grid, Header, List, Segment, Button, Image, Icon, Container } from "semantic-ui-react"


const Dashboard = () => {
    return(
        <Segment vertical>
            <Container>
                <Grid>
                    <Grid.Row style={{margin: 20}}>
                        <Grid.Column width={4}>
                            <Header content="Member Login" />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Header  textAlign="center" as="h1" content="Masta Plana Dashboard" />
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Icon name="calendar outline" color="white" size="big" />
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Icon name="user circle outline" color="white" size="big" />
                            {/*<Header content="Profile"  />*/}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={4}  color="black">
                            <Header style={{margin: 20}} textAlign="center" inverted content="Masta Plana Activities" />
                            <List inverted verticalAlign="middle" divided relaxed selection inverted>
                                <List.Item>
                                    <List.Content>
                                        Activity 1
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        Activity 2
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        Activity 3
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        Activity 4
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        Activity 5
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={12} color="teal">
                            <Grid style={{padding: 80}}>                            
                                <Grid.Row>
                                    <Grid.Column width={4}>
                                        <Icon inverted  name="edit outline" size="huge" color="green" />
                                        <Header content="DOCUMENT" inverted />
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Icon inverted name="computer" size="huge" color="green" />
                                        <Header content="SCAN" inverted />
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Icon inverted  name="images outline" size="huge" color="green" />
                                        <Header content="PHOTOS" inverted />
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Icon inverted  name="edit outline" size="huge" color="green" />
                                        <Header content="DOCUMENT" inverted />
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={4}>
                                        <Icon inverted  name="music" size="huge" color="green" />
                                        <Header content="AUDIO" inverted />
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Icon inverted name="video" size="huge" color="green" />
                                        <Header content="VIDEO" inverted />
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Icon inverted name="home" size="huge" color="green" />
                                        <Header content="OFFICE" inverted />
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Icon inverted  name="inbox" size="huge" color="green" />
                                        <Header content="NOTICE CENTER" inverted />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Container>
        </Segment>
    )

}

export default Dashboard