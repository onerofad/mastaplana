import { Modal,Grid, Icon, Table } from "semantic-ui-react"

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
                        <Grid> 
                            <Table>
                                <Table.Header>
                                    <Table.HeaderCell>First Name</Table.HeaderCell>
                                    <Table.HeaderCell>Last Name</Table.HeaderCell>
                                </Table.Header>
                            </Table>
                        </Grid>
                    </Modal.Content>
            </Modal>
        )

    }
    export default TableModal
