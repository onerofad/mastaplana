import { useState } from "react"
import { Modal, Grid, Input, Icon, Table, Header, Button, Divider, Segment } from "semantic-ui-react"


    const TableModal = ({openModalTable, sizeModalTable, closeModal}) => {
    
        const [head1, sethead1] = useState("Head-1")
        const [head2, sethead2] = useState("Head-2")
        const [head3, sethead3] = useState("Head-3")
        const [head4, sethead4] = useState("Head-4")

        const handlehead1 = (e) => sethead1(e.target.value)
        const handlehead2 = (e) => sethead2(e.target.value)
        const handlehead3 = (e) => sethead3(e.target.value)
        const handlehead4 = (e) => sethead4(e.target.value)

        const [tabularData, setTabularData] = useState([])
        const [tabularDataFake, setTabularDataFake] = useState([])
        const data = []
        let count = 1
        const addRow = () => {
           tabularDataFake.push({
            'id': count,
            'row': <Table.Row>
                        <Table.Cell>count</Table.Cell>
                        <Table.Cell>col-1</Table.Cell>
                        <Table.Cell>col-2</Table.Cell>
                        <Table.Cell>col-3</Table.Cell>
                        <Table.Cell>col-4</Table.Cell>
                   </Table.Row>
           })
           setTabularData(tabularDataFake)
           alert(tabularDataFake.length)
           alert(tabularData.length)

           ++count
        }

        let tabularDataDetails
        tabularDataDetails = tabularData.map(m => (
            <>{m.row}</>
        ))

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
                                    <Table fixed celled>
                                        <Table.Header>
                                            <Table.HeaderCell>
                                                <Input 
                                                    value={head1}
                                                    onChange={handlehead1}                                     
                                                />
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                <Input 
                                                    value={head2}
                                                    onChange={handlehead2}                   
                                                />
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                <Input 
                                                    value={head3}
                                                    onChange={handlehead3}                                
                                                />
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                <Input 
                                                    value={head4}
                                                    onChange={handlehead4}     
                                                />
                                            </Table.HeaderCell>
                                        </Table.Header>
                                        <Table.Body>
                                            {
                                                tabularDataDetails
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
                                                    <Header as="h5" content="Edit Row" />
                                                    <Grid stackable>
                                                        <Grid.Row>
                                                            <Grid.Column width={4}>
                                                                <Button 
                                                                    basic
                                                                    size="mini" 
                                                                    color="green"
                                                                    onClick={() => addRow()}
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
