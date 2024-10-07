import { Container, Grid, Segment, Image, Header, Dropdown, Icon, Form, Button, Modal, List } from "semantic-ui-react"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useReducer, useState } from "react"
import videojs from 'video.js';
import { useGetUploadVideosQuery, useUploadVideoMutation } from "../features/api/apiSlice"
import VideoJS from "./VideoJs";
import React from "react";

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

const Video = ({mobile}) => {

    const navigate = useNavigate()

    const [source, setSource] = useState(null)

    const [state, dispatch] = useReducer(uploadReducer, initialState)
    const {open, size} = state

    const [loading, setloading] = useState(false)

    const [video, setVideo] = useState(null);
    let uploaded_video
    let filesender = sessionStorage.getItem("email")
    const [fileowner, setfileowner] = useState('')

    const [fileownerError, setfileownerError] = useState(false)
    const [upload_videoError, setupload_videoError] = useState(false)

    const handleFileowner = (e) => setfileowner(e.target.value)

    const handleVideo = (e) => {
        const file = e.target.files[0]
        setVideo(file)

        const reader = new FileReader();
        reader.readAsDataURL(file)
    }

    const {data:uploads, isSuccess} = useGetUploadVideosQuery()

    let files_uploaded
    let pos = 49
    let substr = "fl_attachment/"
    if(isSuccess){
        files_uploaded = uploads.map(m => {
            if(m.fileowner === sessionStorage.getItem("email")){
                return(
                    <List size="medium" icon relaxed celled>
                        <List.Item>
                            <List.Icon name="file video outline" />
                            <List.Content>
                                <List.Header>{m.filesender}</List.Header>
                                <List.Description style={{wordWrap: 'break-word'}}>
                                    {m.uploaded_video.substring(78)}
                                    <Header as="h4" content={m.file_date} />
                                    <Link onClick={() => setSource(m.uploaded_video)}>
                                        <Icon name="video" /> watch &nbsp;
                                    </Link>
                                    <Link to={[m.uploaded_video.slice(0, pos), substr, m.uploaded_video.slice(pos)].join('')}>  
                                        <Icon name="download" />download
                                    </Link>
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                )
            }
    })

    }

    const [uploadVideo, {isLoading}] = useUploadVideoMutation()
    const saveVideo = [fileowner, filesender].every(Boolean) && !isLoading

    const sendVideo = async () => {
        if(fileowner === ''){
            setfileownerError({content: 'Enter email address', pointing: 'above'})
        }else if(video === null){
            setupload_videoError({content: 'Select a file', pointing: 'above'})
        }else{
            try{
                if(saveVideo){
                    setloading(true)
                    let videoURL
                    const data = new FormData();
                    data.append("file", video);
                    data.append("upload_preset", "slakw5ml");
                    data.append("cloud_name", "du3ck2joa");
                    data.append("resource_type", "video")
                    data.append("folder", "mastaplana_video");

                    const response = await fetch(
                        `https://api.cloudinary.com/v1_1/du3ck2joa/upload/`,
                        {
                          method: "POST",
                          body: data,
                        }
                      );
                      const res = await response.json();
                      videoURL = res.url.toString()
                      uploaded_video = videoURL

                      await uploadVideo({fileowner, uploaded_video, filesender}).unwrap()
                      setloading(false)
                }
                dispatch({type: 'open', size: 'mini'})
            }catch(error){

            }
        }
    }

    const playerRef = React.useRef(null);

    const videoJsOptions = {
      controls: true,
      responsive: true,
      fluid: true,
      autoplay: true,
      sources: [{
        src: source,
        type: 'video/mp4'
      }]
    };
  
    const handlePlayerReady = (player) => {
      playerRef.current = player;
  
      // You can handle player events here, for example:
      player.on('waiting', () => {
        videojs.log('player is waiting');
      });
  
      player.on('dispose', () => {
        videojs.log('player will dispose');
      });
    };

    return(
        <Container>
        <Segment vertical style={{backgroundColor: '#133467', margin: mobile ? 20 : 40}}>
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
                            <Segment vertical floated="right" style={{ 
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
                                        <Grid.Column width={mobile ? 16 : 5} style={{marginTop: 10}}>
                                        <Form>
                                            <Form.Field>
                                                <Form.Input
                                                    type="text"
                                                    placeholder="Enter Receiver Email"
                                                    onChange={handleFileowner}
                                                    value={fileowner}
                                                    error={fileownerError}
                                                    
                                                    onClick={() => setfileownerError(false)}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <Form.Input
                                                    type="file"
                                                    placeholder="Select a file"
                                                    accept="video/*"
                                                    error={upload_videoError}
                                                    onChange={handleVideo}
                                                    onClick={() => setupload_videoError(false)}
                                            
                                                
                                                />
                                            </Form.Field>
                                            <Button 
                                                onClick={sendVideo}  
                                                size="large" color="green"
                                                loading={loading}
                                            >
                                            Send Video
                                            </Button>
                                          
                                        </Form>
                                        </Grid.Column>
                                       
                                        <Grid.Column width={ mobile ? 16 : 6} style={{marginTop: 0}}>
                                          <Segment vertical style={{ padding: 10, borderRadius: 10}}>                 
                                              {
                                                source ?
                                                    <VideoJS 
                                                        options={videoJsOptions}
                                                        onReady={handlePlayerReady}
                                                        style={{height: '280px'}}
                                                    />
                                                :
                                                        <Image
                                                            src="../video.jpg"
                                                            fluid
                                                        />
                                              }
                                          </Segment>
                                        </Grid.Column>
                                        <Grid.Column width={ mobile ? 16 : 5} style={{marginTop: 0}}>
                                        <Header as="h4" content="RECEIVED VIDEOS" />

                                          <Segment vertical style={{ padding: 10, maxHeight: 300, borderRadius: 10, overflowY: 'auto'}}>
                                          
                                                {files_uploaded}
                                                   
                                          </Segment>
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
                        Video upload complete
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
                            Video upload successfull
                        </Header>
                    </Modal.Content>
                </Modal>
        </Segment>
        </Container>

    )
}
export default Video