import { Grid, Segment, Container, Dropdown, Icon, Header, Table, Button } from "semantic-ui-react"
import { Link, useNavigate } from "react-router-dom"

export const NoticeCenter = ({mobile}) => {

    const navigate = useNavigate()
    return(
        <Container>
        <Segment vertical style={{backgroundColor: '#133467', margin: mobile ? 10 : 40}}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={ mobile ? 4 : 6} verticalAlign="middle">
                            <Link style={{ fontSize: 20, color: '#fff'}} to="/dashboard">
                                <Icon inverted name="angle left" color="green" size='big' />
                            </Link>
                        </Grid.Column>
                        <Grid.Column width={ mobile ? 8 : 8} verticalAlign="middle">
                            <Header 
                                as={ mobile ? 'h4' : 'h1'} 
                                inverted 
                                content="NOTICE CENTER" 
                                color="#fff" 
                                style={{
                                    fontFamily: 'Spicy Rice',
                                    fontWeight: 400,
                                    fontStyle: 'normal'
                                }}
                            />
                        </Grid.Column>
                        {/*<Grid.Column width={ mobile ? 4 : 2} verticalAlign="middle">
                            <Icon name="calendar alternate outline" inverted color="#fff" size="big" />
                        </Grid.Column>*/}
                        <Grid.Column width={ mobile ? 4 : 2} style={{textAlign: 'center'}}>
                            <Segment vertical floated="right" style={{ 
                                alignSelf: 'right', 
                                alignContent: 'center',
                                width: 50, 
                                height: 50, 
                                borderRadius: 100,
                                backgroundColor: '#fff'
                            }}>
                                <Dropdown 
                                    text={
                                        sessionStorage.getItem("fname").charAt(0).toUpperCase()
                                        + " " +
                                        sessionStorage.getItem("lname").charAt(0).toUpperCase()
                                    } 
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
                            <Grid textAlign="center">
                                <Grid.Column style={{maxWidth: 600}}>
                                    <Segment vertical style={{padding: 20, borderRadius: 10, backgroundColor: '#fff'}}>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column>
                                                    <div style={{overflow: 'auto'}}>
                                                    <Table basic="very" unstackable>
                                                        <Table.Header>
                                                            <Table.HeaderCell>
                                                                Event No
                                                            </Table.HeaderCell>
                                                            <Table.HeaderCell>
                                                                Event Description
                                                            </Table.HeaderCell>
                                                            <Table.HeaderCell>
                                                                Event sheduled time
                                                            </Table.HeaderCell>
                                                            <Table.HeaderCell>
                                                                Action
                                                            </Table.HeaderCell>
                                                        </Table.Header>
                                                        <Table.Body>
                                                            <Table.Row>
                                                                <Table.Cell>
                                                                    1
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    Going to church
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    12:45:00
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    <Button color="youtube">
                                                                        <Icon name="trash" />
                                                                        cancle
                                                                    </Button>
                                                                </Table.Cell>
                                                            </Table.Row>
                                                        </Table.Body>
                                                    </Table>

                                                    </div>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </Segment>
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>     
                </Grid>
        </Segment>
        </Container>
    )

}