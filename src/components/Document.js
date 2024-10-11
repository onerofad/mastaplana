import { useNavigate } from "react-router-dom"
import { Grid, Header, Segment, Icon, Container, Dropdown, TextArea, Button, Modal, Form, Image, SearchResult, Search, List, Input, Menu } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { useReducer, useState } from "react"
import { useAddNotesMutation, useEditNoteMutation, useGetNotesQuery, useUploadFileMutation } from "../features/api/apiSlice";
import SearchNote from "./SearchNote";

const initialState = {
    open: false,
    size: undefined
}

function editReducer(state, action){
    switch(action.type){
        case 'open':
            return {open: true, size: action.size}

        case 'close':
            return {open: false}

        default:
            new Error('An arror has occurred')
    }
}
const Document = ({mobile}) => {

    const [state, dispatch] = useReducer(editReducer, initialState)
    const {open, size} = state

    const [addNote, setaddNote] = useState(false)
    const [editnote, seteditNote] = useState(false)

    const navigate = useNavigate()

    const [editId, seteditId] = useState("")
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
                            <Dropdown 
                                className="icon"  
                                icon="ellipsis vertical"
                                compact
                                direction="left"
                            >
                                <Dropdown.Menu>
                                    <Dropdown.Item  onClick={() => editNote(n.id)}   text="edit" icon="edit"  />
                                    <Dropdown.Item text="delete" icon="trash" />
                                </Dropdown.Menu>
                            </Dropdown>
                           {/* <Icon 
                                onClick={() => editNote(n.id)}  
                                name="ellipsis vertical" 
                                link={true}
                                
                            />*/}
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

    const editNote = (id) => {
        const note = notes.filter(n => n.id === id)[0]
        seteditId(note.id)
        setTitle(note.title)
        setcontent(note.content)

        dispatch({type: 'open', size: 'mini'})
    }

    const [updateNote] = useEditNoteMutation()
    const saveupdateNote = [noteowner, title, content].every(Boolean)
    const editText = async() => {
       
            if(saveupdateNote){
                setLoading(true)
                try{
                    await updateNote({id: editId, noteowner, title, content}).unwrap()
                    setLoading(false)
                    dispatch({type: 'close'})
                }catch(error){
                    console.log('An error has occurred ' + error)
                }

            }

      
        dispatch({type: 'close'})
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
                                                                        content ? <Icon loading={loading} onClick={addContent} size="large" aria-label="save" link={true} name="save" /> 
                                                                        : ''

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
                                                        <SearchNote  />
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Grid.Column>
                                                       
                                                            <List style={{maxHeight: 120, overflowY: 'auto'}} relaxed verticalAlign="middle" size="tiny"  divided >
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
                                                            Send Form
                                                        </Button>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row>
                                                <Grid.Column>
                                                        <Button fluid size="large" color="green">
                                                            Send Text File
                                                        </Button>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row>
                                                <Grid.Column>
                                                        <Button fluid size="large" color="green">
                                                            Send Tabular Data
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
                <Modal
                    open={open}
                    size={size}
                >
                    <Modal.Header>
                        Edit Note
                        <Icon loading={loading} onClick={editText} link={true} style={{float: "right"}} name="edit" />
                    </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <Form.Input
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <TextArea 
                                    value={content}
                                    onChange={handlecontentChange}
                                
                                >

                                </TextArea>
                            </Form.Field>
                            <Button 
                                onClick={() => dispatch({type: 'close'})} 
                                color="youtube">
                                close
                            </Button>
                        </Form>
                    </Modal.Content>
                </Modal>
        </Segment>
        </Container>

    )

}
export default Document