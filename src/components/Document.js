import { useNavigate } from "react-router-dom"
import { Grid, Header, Segment, Icon, Container, Dropdown, TextArea, Button, Modal, Form, Image, SearchResult, Search, List, Input } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { useReducer, useState } from "react"
import { useAddNotesMutation, useGetNotesQuery, useUploadFileMutation } from "../features/api/apiSlice";

const Document = ({mobile}) => {

    const [addNote, setaddNote] = useState(false)

    const navigate = useNavigate()
    
    const [content, setcontent] = useState("")
    const [title, setTitle] = useState("")
    let noteowner = sessionStorage.getItem("email")

    const [contentError, setcontentError] = useState(false)
    const [titleError, setTitleError] = useState(false)

    const [loading, setLoading] = useState(false)

    let notes_list
    let no_notes = 0
    const {data:notes, isSuccess, refetch} = useGetNotesQuery()
    if(isSuccess){
        notes_list = notes.map(n => {
            if(n.noteowner === sessionStorage.getItem("email")){
                ++no_notes
                return(
                    <List.Item>
                         <List.Header>
                                {n.title}
                            </List.Header>
                        <List.Content floated="right">
                            <Icon  name="ellipsis vertical" />
                        </List.Content>
                        {n.content}
                    </List.Item>
                )
            }
        })                                                                 
        
    }

    const openNote = () => {
        setaddNote(!addNote)
    }

    const handlecontentChange = (e) => {
        setcontent(e.target.value)
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const [addText, {isLoading}] = useAddNotesMutation()

    const savecontent = [noteowner, title, content].every(Boolean) && !isLoading

    const addContent = async () => {
        if(title === ""){
            setTitleError({content: 'Enter Title', pointing: 'above'})
        }else if(content === ""){
            setcontentError({content: 'Enter Note', pointing: 'above'})
        }else{
            if(savecontent){
                setLoading(true)
                    try{
                        await addText({noteowner, title, content}).unwrap()
                        setTitle("")
                        setcontent("")
                        setLoading(false)
                        setaddNote(!addNote)
                        refetch()
                    }catch(error){
                        console.log('An error has occurred ' + error)
                    }
            }
        }

    }
    return(
        <Container>
        <Segment vertical style={{backgroundColor: '#133467', margin: mobile ? 20 : 40}}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={mobile ? 4 : 6} verticalAlign="middle">
                            <Link style={{ fontSize: 20, color: '#fff'}} to="/dashboard">
                                <Icon inverted name="angle left" color="green" size='big' />
                            </Link>
                        </Grid.Column>
                        <Grid.Column width={mobile ? 4 : 6} verticalAlign="middle">
                            <Header as={mobile ? "h4" : "h1"} inverted content="MASTA PLANA" color="#fff" />
                        </Grid.Column>
                        <Grid.Column width={mobile ? 4 : 2} verticalAlign="middle">
                            <Icon name="calendar alternate outline" inverted color="#fff" size="big" />
                        </Grid.Column>
                        <Grid.Column width={mobile ? 4 : 2} style={{textAlign: 'center'}}>
                            <Segment floated="right" vertical style={{ 
                                alignSelf: 'right', 
                                alignContent: 'center',
                                width: 50, 
                                height: 50, 
                                borderRadius: 100,
                                backgroundColor: '#fff'
                            }}>
                                <Dropdown 
                                    text={sessionStorage.getItem("fname").charAt(0).toUpperCase()} 
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
                            <Segment vertical style={{padding: 20, borderRadius: 10, backgroundColor: '#fff'}}>
                                <Grid divided>
                                    <Grid.Row>
                                        <Grid.Column width={mobile ? 16 : 5} style={{marginTop: 0}}>
                                            <Grid>
                                                { addNote ?
                                                <>
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        <Grid>
                                                            <Grid.Row>
                                                                <Grid.Column width={8}>
                                                                    <Icon size="large" link={true} onClick={() => setaddNote(!addNote)} name="long arrow alternate left" />
                                                                    Notes
                                                                </Grid.Column>
                                                                
                                                                <Grid.Column textAlign="right" width={8}>
                                                                    {
                                                                        content ? <Icon loading={loading} onClick={addContent} size="large" link={true} name="check mark" /> : ''

                                                                    }

                                                                </Grid.Column>
                                                            </Grid.Row>
                                                        </Grid>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        <Form>
                                                            <Form.Field>
                                                                <Form.Input
                                                                    placeholder="Title"
                                                                    onChange={handleTitleChange}
                                                                    error={titleError}
                                                                    onClick={() => setTitleError(false)}
                                                                />
                                                            </Form.Field>
                                                            <Form.Field>
                                                                    <TextArea 
                                                                    placeholder="Note something down"
                                                                    style={{width: '100%', height: 150}}
                                                                    onChange={handlecontentChange}
                                                                    error={contentError}
                                                                    onClick={() => setcontentError(false)}
                                                                >
        
                                                                </TextArea>
                                                            </Form.Field>
                                                            
                                                        </Form>
                                                       
                                                    </Grid.Column>
                                                </Grid.Row>
                                                </>
                                                :
                                                <>
                                                <Grid.Row>
                                                    <Grid.Column>
                                                    <Dropdown inline text="All Notes">
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>
                                                            <Icon name="file text" />
                                                            All Notes
                                                            <span> &nbsp;&nbsp;({no_notes})</span>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <Icon name="trash" />
                                                            Recently Deleted
                                                            <span> &nbsp; &nbsp; (0)</span>
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                    </Dropdown>
                                                    </Grid.Column>         
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        <Search size="large" placeholder="search" fluid />
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        
                                                        <List style={{maxHeight: 120, overflowY: 'auto'}} selection verticalAlign="middle" size="tiny" divided >
                                                            {notes_list}
                                                        </List>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        <Button 
                                                            onClick={() => openNote()} 
                                                            floated="right" 
                                                            color="green" 
                                                            size="big" 
                                                            circular 
                                                            icon="plus" 
                                                        />
                                                    </Grid.Column>        
                                                </Grid.Row>
                                                </>
                                                }
                                            </Grid>                                
                                        </Grid.Column>
                                        <Grid.Column width={mobile ? 16 : 5} style={{marginTop: 10}}>
                                            <Grid>
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        <Button fluid size="large" color="green">
                                                            FORM
                                                        </Button>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row>
                                                <Grid.Column>
                                                        <Button fluid size="large" color="green">
                                                            FILE
                                                        </Button>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row>
                                                <Grid.Column>
                                                        <Button fluid size="large" color="green">
                                                            TEMPLATE
                                                        </Button>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                            
                                        </Grid.Column>
                                        <Grid.Column width={mobile ? 16 : 6} style={{marginTop: 10}}>
                                          {
                                            mobile ? '' :
                                            <Segment vertical inverted color="teal" style={{ height: 250, borderRadius: 10}}>
                                        

                                            </Segment> 
                                           }
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
export default Document