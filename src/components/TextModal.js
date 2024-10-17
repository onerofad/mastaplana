import { Modal, Icon, Form, Button, List, Header } from "semantic-ui-react"
import { useState } from "react"
import { useGetTextFileQuery, useUploadTextFileMutation } from "../features/api/apiSlice"


    const TextModal = ({openModal, sizeModal, closeModal}) => {

        const [fileowner, setfileowner] = useState("")
        const [fileownerError, setfileownerError] = useState(false)
   
        const [msg, setmsg] = useState("")

        let uploaded_text
        const filesender = sessionStorage.getItem("email")

        const [loading, setloading] = useState(false)

        const [file, setFile] = useState(null)
        const [fileError, setfileError] = useState(false)

        const handlefileowner = (e) => {
            setfileowner(e.target.value)
        }

        const handlefile = (e) => {
            const f = e.target.files[0]
            setFile(f)

            const reader = new FileReader();
            reader.readAsDataURL(f)


        }

        const [uploadFile, {isLoading}] = useUploadTextFileMutation()
        const saveFile = [fileowner, filesender].every(Boolean) && !isLoading
        
        const onSend = async () => {
            if(fileowner === ''){
                setfileownerError({content: 'Empty Field'})
            }else if(file === null){
                setfileError({content: 'Empty Field'})
            }else{
                try{
                    if(saveFile){
                        setloading(true)
                        let fileURL
                        const data = new FormData()
                        data.append('file', file)
                        data.append("upload_preset", "slakw5ml");
                        data.append("cloud_name", "du3ck2joa");
                        data.append("resource_type", "text")
                        data.append("folder", "mastaplana_text");

                        
                        const response = await fetch(
                            `https://api.cloudinary.com/v1_1/du3ck2joa/upload/`,
                            {
                            method: "POST",
                            body: data,
                            }
                        );
                        const res = await response.json();
                        fileURL = res.url.toString()
                        uploaded_text = fileURL
                            await uploadFile({fileowner, uploaded_text, filesender}).unwrap()
                            setfileowner("")
                            setmsg("File upload Success")
                            setFile(null)
                            setloading(false)
                    }
                }catch(error){
                    console.log('An error has occurred')
                }
            }
        }

        return(
            <Modal
                open={openModal}
                size={sizeModal}
                style={{maxHeight: 400, overflowY: 'auto'}}
            >
                <Modal.Header>
                    File Templates
                    <Icon link={true} style={{float: 'right'}} name="close" onClick={() => closeModal()} />

                </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <Form.Input
                                    placeholder="Send To"
                                    onChange={handlefileowner}
                                    error={fileownerError}
                                    value={fileowner}
                                    onClick={() => setfileownerError(false)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    type="file"
                                    placeholder="Select File"
                                    onChange={handlefile}
                                    error={fileError}
                                    onClick={() => setfileError(false)}
                                />
                                <span style={{color: 'red'}}>
                                    file type (xlsx, txt, docx, zip)
                                </span>
                            </Form.Field>
                            <Button 
                                color="green"
                                loading={loading}
                                onClick={onSend}
                            >
                                Send File
                            </Button>
                            {msg}
                        </Form>
                       
                    </Modal.Content>
            </Modal>
        )

    }
    export default TextModal
