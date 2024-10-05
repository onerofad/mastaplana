import { useNavigate } from "react-router-dom"
import { Grid, Header, Segment, Icon, Container, Dropdown, TextArea, Button, Modal, Form, Image, List } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { useReducer, useState } from "react"

import { useGetUploadFilesQuery, useUploadFileMutation } from "../features/api/apiSlice";

const initialState = {
    size: undefined,
    open: false
}

function uploadReducer(state, action){
    switch(action.type){
        case 'open':
            return {open: true, size: action.size}
        case 'close':
            return {open: false}
        default:
            return new Error('An error has occurred')
    }

}
const Photos = ({mobile}) => {

    const [state, dispatch] = useReducer(uploadReducer, initialState)
    const {open, size} = state

    const navigate = useNavigate()

    const {data:uploads, isSuccess} = useGetUploadFilesQuery()

    let files_uploaded
    let pos = 49
    let substr = "fl_attachment/"
    if(isSuccess){
        files_uploaded = uploads.map(m => {
            if(m.fileowner === sessionStorage.getItem("email")){
                return(
                    <List size="small" icon relaxed>
                        <List.Item onClick={() => setPreview(m.uploaded_file)}>
                            <List.Icon name="file image outline" />
                            <List.Content>
                                <List.Header>{m.filesender} &nbsp;</List.Header>
                                <List.Description style={{wordWrap: 'break-word'}}>
                                    {m.uploaded_file.substring(72)}&nbsp;&nbsp;
                                    {m.file_date}&nbsp;&nbsp;
                                    <Link to={[m.uploaded_file.slice(0, pos), substr, m.uploaded_file.slice(pos)].join('')} style={{color: 'red'}}>  
                                        download photo
                                    </Link>
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                )
            }
    })
    }

    const fileUpload = () => {
        dispatch({type: 'open', size: 'mini'})
    }

    const [image, setImage] = useState(null);
   {/* const [upload_file, setUrl] = useState("");*/}
    let uploaded_file
    let filesender = sessionStorage.getItem("email")

    const [preview, setPreview] = useState(null);

    const [loading, setloading] = useState(false)
    const [fileowner, setfileowner] = useState('')

    const [fileownerError, setfileownerError] = useState(false)
    const [upload_fileError, setupload_fileError] = useState(false)

    const handleFileowner = (e) => setfileowner(e.target.value)

    const handleFile = (e) => {
        const file = e.target.files[0]
        setImage(file)

        const reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onload = () => {
            setPreview(reader.result)
        }
    }


    const [uploadFile, {isLoading}] = useUploadFileMutation()
    const saveFile = [fileowner, filesender].every(Boolean) && !isLoading

    const sendFile = async () => {
        if(fileowner === ''){
            setfileownerError({content: 'Enter email address', pointing: 'above'})
        }else if(image === null){
            setupload_fileError({content: 'Select a file', pointing: 'above'})
        }else{
            try{
                if(saveFile){
                    setloading(true);
                    let imageURL
                    const data = new FormData();
                    data.append("file", image);
                    data.append("upload_preset", "slakw5ml");
                    data.append("cloud_name", "du3ck2joa");
                    data.append("transformations", "fl_attachment")
                    data.append("folder", "mastaplana");

                    const response = await fetch(
                        `https://api.cloudinary.com/v1_1/du3ck2joa/image/upload/`,
                        {
                          method: "POST",
                          body: data,
                        }
                      );
                      const res = await response.json();
                      imageURL = res.url.toString()
                      //alert(imageURL)
                      uploaded_file = imageURL
                      //setUrl(res.url.toString());

                      await uploadFile({fileowner, uploaded_file, filesender}).unwrap()
                      setfileowner('')
                      setPreview(null)
                      setImage(null)
                      //setUrl('')
                      setloading(false)
                      dispatch({type: 'open', size: 'mini'})
                }

            }catch(error){
                console.log('An error has occurred ' + error)
            }
        }
    }

    return(
        <Container>
        <Segment vertical style={{backgroundColor: '#133467', margin: 40}}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={ mobile ? 4 : 6} verticalAlign="middle">
                            <Link style={{ fontSize: 20, color: '#fff'}} to="/dashboard">
                                <Icon inverted name="angle left" color="green" size='big' />
                            </Link>
                        </Grid.Column>
                        <Grid.Column width={ mobile ? 4 : 6} verticalAlign="middle">
                            <Header as={ mobile ? 'h4' : 'h1'} inverted content="MASTA PLANA" color="#fff" />
                        </Grid.Column>
                        <Grid.Column width={ mobile ? 4 : 2} verticalAlign="middle">
                            <Icon name="calendar alternate outline" inverted color="#fff" size="big" />
                        </Grid.Column>
                        <Grid.Column width={ mobile ? 4 : 2} style={{textAlign: 'center'}}>
                            <Segment vertical style={{ 
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
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={ mobile ? 16 : 5} style={{marginTop: 10}}>
                                        <Form>
                                            <Form.Field>
                                                <Form.Input
                                                    type="text"
                                                    placeholder="Enter Receiver Email"
                                                    value={fileowner}
                                                    error={fileownerError}
                                                    onChange={handleFileowner}
                                                    onClick={() => setfileownerError(false)}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                            <Form.Input
                                                type="file"
                                                placeholder="Select a file"
                                                accept="image/*"
                                                error={upload_fileError}
                                                onChange={handleFile}
                                                onClick={() => setupload_fileError(false)}
                                            />
                                            </Form.Field>
                                            <Button loading={loading} onClick={sendFile} size="large" color="green">
                                            Send
                                            </Button>
                                          
                                        </Form>
                                        </Grid.Column>
                                        <Grid.Column width={ mobile ? 16 : 7} style={{marginTop: 10}}>
                                          <Segment vertical inverted color="teal" style={{ padding: 10, height: 300, borderRadius: 10}}>
                                            {preview && 
                                                <Image 
                                                    src={preview} 
                                                    alt="preview" 
                                                    style={{width: '100%', height: '100%'}} 
                                                     centered
                                                     inline
                                                />
                                            }

                                          </Segment>
                                        </Grid.Column>
                                        <Grid.Column width={ mobile ? 16 : 4} style={{marginTop: 10}}>
                                          <Segment vertical style={{ padding: 10, maxHeight: 300, borderRadius: 10, overflowY: 'auto'}}>
                                          
                                                <Header as="h4" content="RECEIVED PHOTOS" />
                                                {files_uploaded}
                                                   
                                          </Segment>
                                        </Grid.Column>
                                     
                                    </Grid.Row>
                                </Grid>

                            </Segment>
                        </Grid.Column>
                    </Grid.Row> 
                    <Grid.Row>
                        <Grid.Column>
                            <Segment vertical style={{borderRadius: 10, borderWidth: '5px', borderStyle: 'solid', borderColor: '#fff'}}>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                            <Icon inverted size="huge" color="green" name="microphone" />
                                        </Grid.Column>
                                        <Grid.Column width={8} textAlign="right">
                                            <Icon  inverted size="huge" color="green" name="chat" />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>           
                </Grid>
                <Modal
                    size={size}
                    open={open}
                >
                    <Modal.Header >
                        File upload complete
                       <Icon 
                            onClick={() => dispatch({type: 'close'})}
                            link name="close" 
                            size="tiny"
                            style={{float: 'right'}} 
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <Header textAlign="center"  icon>
                            <Icon inverted circular size={20} name="checkmark" color="green" />
                            File upload successfull
                        </Header>
                    </Modal.Content>
                </Modal>
        </Segment>
        </Container>

    )

}
export default Photos