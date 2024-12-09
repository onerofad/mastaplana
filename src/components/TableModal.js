import { Modal,Grid, Icon, Table, Header, Button, Divider, Segment } from "semantic-ui-react"

    const tabularData = [
        {
            row: <>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    </>
        },
    ]
    const TableModal = ({openModalTable, sizeModalTable, closeModal}) => {
    
        return(
            <Modal
                open={openModalTable}
                size={sizeModalTable}
                style={{maxHeight: 400, overflowY: 'auto'}}
            >
                <Modal.Header>
                    Table Data
                    <Icon link={true} style={{float: 'right'}} name="close" onClick={() => closeModal()} />

                </Modal.Header>
                    <Modal.Content>
                        <Grid stackable divided> 
                            <Grid.Row>
                                <Grid.Column width={10}>
                                    <Header content="Edit Table" />
                                    <Table celled>
                                        <Table.Header>
                                            <Table.HeaderCell>Head-1</Table.HeaderCell>
                                            <Table.HeaderCell>Head-2</Table.HeaderCell>
                                            <Table.HeaderCell>Head-3</Table.HeaderCell>
                                            <Table.HeaderCell>Head-4</Table.HeaderCell>
                                        </Table.Header>
                                        <Table.Body>
                                            {
                                                tabularData.map(m => {
                                                    <Table.Row>
                                                        {m.row}
                                                    </Table.Row>
                                                })
                                            }
                                        </Table.Body>
                                    </Table>
                                    <Button color="green" size="large">
                                        Save Data
                                    </Button>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <Header textAlign="center" content="Table Tools" />
                                    <Divider />
                                    <Segment vertical basic >
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column>
                                                    <Header as="h5" content="Edit Headings" />
                                                    <Grid stackable>
                                                        <Grid.Row>
                                                            <Grid.Column width={4}>
                                                                <Button 
                                                                    basic
                                                                    size="mini" 
                                                                    color="green"
                                                                >
                                                                    add
                                                                </Button>
                                                            </Grid.Column>
                                                            <Grid.Column width={4}>
                                                                <Button 
                                                                    basic
                                                                    size="mini" 
                                                                    color="red"
                                                                >
                                                                    del
                                                                </Button>
                                                            </Grid.Column>
                                                        </Grid.Row>

                                                        
                                                    </Grid>
                                                </Grid.Column>
                                            </Grid.Row>

                                            <Grid.Row>
                                                <Grid.Column>
                                                    <Header as="h5" content="Edit Row" />
                                                    <Grid stackable>
                                                        <Grid.Row>
                                                            <Grid.Column width={4}>
                                                                <Button 
                                                                    basic
                                                                    size="mini" 
                                                                    color="green"
                                                                >
                                                                    add
                                                                </Button>
                                                            </Grid.Column>
                                                            <Grid.Column width={4}>
                                                                <Button 
                                                                    basic
                                                                    size="mini" 
                                                                    color="red"
                                                                >
                                                                    del
                                                                </Button>
                                                            </Grid.Column>
                                                        </Grid.Row>

                                                        
                                                    </Grid>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>

                                    </Segment>

                                </Grid.Column>
                            </Grid.Row>
                          
                        </Grid>
                    </Modal.Content>
            </Modal>
        )

    }
    export default TableModal
