
import { useCallback, useEffect, useState } from "react";
import SupportLayoutTemplate from "../../../../components/SupportLayout";
import Textfield from "../../../../components/TextField";
import { useEditor } from '../../../../components/EditorComponent'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import UserButton from "../../../../components/ButtonMaker";
import draftToHtml from "draftjs-to-html"
import { EditorState, convertToRaw } from 'draft-js';
import axios from "axios";
import { testEnv } from "../../../../components/Endpoints";


export default function NewTicket({ modals, setToken, setActiveDashboard, setActiveState, viewState, setView, isLoading, setLoading, pageSelector, entryValue }) {
    const [initialMessage, setInitialMessage] = useState(EditorState.createEmpty())
    const { memoizedEditor, message } = useEditor(initialMessage)
    const [ticketInfo, setTicketInfo] = useState({ subject: "", agentId: "", departmentId: 2, files: [] })
    const [inputChanges, setInputChanges] = useState([])
    const [extraFiles, setExtraFiles] = useState([])
    const [newFileInput, setNewFileInput] = useState(null)
    const [newFileNames, setNewFileNames] = useState([])

    useEffect(() => {
        setActiveDashboard("TicketManagement")
        setActiveState("4")
    }, [])

    useEffect(() => {
        if (inputChanges.length == 0) {
            return
        }
        if (!newFileInput) {
            return
        }
        setExtraFiles([...extraFiles, []])
    }, [newFileInput, inputChanges])

    function newInput() {
        setInputChanges([...inputChanges, []])
        setNewFileInput(true)
    }

    function handleFileChange(e, position) {
        const newFiles = Array.from(e.target.files).map(file => file)
        // console.log("position: ", position)
        // console.log("files: ", newFiles)       
        if (extraFiles.length == 0) {
            setExtraFiles([...extraFiles, newFiles])
            return
        }
        if (newFiles.length == 0 && extraFiles.length == 1) {
            setExtraFiles([[]])
            return
        }
        // if (newFiles.length == 0 && extraFiles.length == 1) {
        //     debugger
        //     console.log("length: ", extraFiles.length)
        //     // const newExtraFiles = extraFiles.map((files, index) => {
        //     //     if (position == index) {
        //     //         files = newFiles
        //     //         return files
        //     //     }
        //     //     return files
        //     // })
        //     // setExtraFiles(newExtraFiles)
        //     return
        // }

        // debugger
        const newExtraFiles = extraFiles.map((files, index) => {
            if (position == index) {
                files = newFiles
                return files
            }
            return files
        })
        // debugger
        setExtraFiles(newExtraFiles)

    }

    // useEffect(() => {
    //     if (inputChanges == 0) {
    //         return
    //     }
    //     addFileInput(handleFileChange)
    // }, [inputChanges])



    useEffect(() => {
        // console.log("content: ", (convertToRaw(content.getCurrentContent())).blocks[0].text)
        // console.log("content2: ", (draftToHtml(convertToRaw(content.getCurrentContent()))))
        console.log("message: ", message)
    }, [message])

    // useEffect(() => {
    //     if (inputs == 0) {
    //         return
    //     }
    //     if (inputs > 0) {
    //         addFileInput()
    //     }
    // }, [inputs])

    async function getPutUrls(array) {
        const apiCalls = array.map(async (item) => {
            const fileNames = newFileNames
            fileNames.push(`${item.name}-${item.lastModified.toString()}`)
            setNewFileNames(fileNames)
            try {
                const response = await axios.post("https://admapis-staging.payrail.co/v1/api/presign-url/upload-file",
                    {
                        "fileKey": `TicketAttachment/${item.name}-${item.lastModified.toString()}`
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )

                return response.data;
            } catch (error) {
                return "";
            }
        });

        return Promise.all(apiCalls);
    }
    async function makePutRequests(putUrls) {
        const apiCalls = putUrls.map(async (item, index) => {
            const formData = new FormData();
            formData.append('file', extraFiles[index]);
            try {
                const response = await axios.put(item,
                    formData
                )

                return response;
            } catch (error) {
                return "";
            }
        });
        return Promise.all(apiCalls);
    }

    async function createTicket() {
        const urls = extraFiles.flatMap(item => item)
        setExtraFiles(urls)
        const putApis = await getPutUrls(urls)
        const filesUploaded = await makePutRequests(putApis)
        debugger
        // console.log("stringifiled: ", JSON.stringify(newFileNames))
        const newTicketCreated = await axios.post(`${testEnv}v1/ticket/create`,
            {
                "agentId": Number(ticketInfo.agentId),
                "attachment1": JSON.stringify(newFileNames), //newFileNames
                // "attachment2": "string",
                // "attachment3": "string",
                "departmentId": 2, //Number(ticketInfo.departmentId) ||
                "message": message,
                "subject": ticketInfo.subject,
                "tranRef": "string"
            },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
            .then(response => {
                debugger
                console.log("Ticket created: ", response)
                setTicketInfo({ subject: "", agentId: "", departmentId: "", files: [] })
                setInitialMessage(EditorState.createEmpty())
                return response.data
            })
            .catch(response => {
                console.log("Error: ", response)
                // setTicketInfo({ subject: "", agentId: "", departmentId: "", files: [] })
                // setInitialMessage(EditorState.createEmpty())
                return response.data
            })
        return newTicketCreated
    }

    function handleInput(e) {
        e.preventDefault()
        setTicketInfo({ ...ticketInfo, [e.target.name]: e.target.value })
    }

    // const onStateUpdate = useCallback((state: PlayingState) => {
    //     setPlaybackState(state);
    //   }, [])



    return (
        <div className="w-full">
            <section className={`py-2 w-full mt-[20px] ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <h2 className="font-pushpennyBook font-[400] text-[24px] leading-[31px]">{`Ticket Management > Create Ticket`} </h2>
            </section>
            <section className="borde mt-[20px] flex flex-col w-full lg:wrap">
                <div className="w-full lg:flex-wrap gap-[20px] flex flex-col lg:flex-row">
                    {/* <div className="flex items-center justify-center w-full lg:w-[47%] h-[62px] relative rounded-[28.5px]">
                        <Textfield formEdit={handleInput} type="text" title="Name" name="name" value=""  />
                    </div> */}
                    <div className="flex items-center justify-center w-full lg:w-[47%] h-[62px] relative rounded-[28.5px]">
                        <Textfield formEdit={handleInput} type="text" title="Agent ID" name="agentId" value={ticketInfo.agentId} />
                    </div>
                    <div className="flex items-center justify-center w-full lg:w-[47%] h-[62px] relative rounded-[28.5px]">
                        <Textfield formEdit={handleInput} type="text" title="Subject" name="subject" value={ticketInfo.subject} />
                    </div>
                    <div className="flex items-center justify-center w-full lg:w-[47%] h-[62px] relative rounded-[28.5px]">
                        <Textfield formEdit={handleInput} type="text" title="Category" name="departmentId" value={ticketInfo.departmentId} />
                    </div>
                </div>
                <div className="w-full mt-[40px] min-h-[460px] rounded-[10px] border-[#F3F3F3] flex-col border">
                    {memoizedEditor}
                </div>
                <div className="flex borde justify-between flex-col items-cente mt-[20px] gap-[20px] w-full min-h-[57px]">
                    <div className="flex borde border-[red] flex-col gap-[30px]">
                        <input onChange={(e) => { handleFileChange(e, 0) }} type="file" id="images" multiple accept="image/*" />
                        {/* {extraFileInputs.map((fileInput, index) => {
                            return (
                                <div key={index} className="flex gap-[20px]">
                                    {fileInput}
                                    <button onClick={() => {
                                        console.log("input index: ", index)
                                        const newExtras = extraFileInputs.filter((item, idx) => {
                                            return idx !== index
                                        })
                                        setExtraFileInputs(newExtras)
                                    }}>
                                        Remove
                                    </button>
                                </div>
                            )
                        })} */}
                        {inputChanges.map((fileInput, index) => {
                            return (
                                <div key={index + 1} className="flex gap-[20px]">
                                    <input onChange={(e) => { handleFileChange(e, index + 1) }} type="file" id="images" multiple accept="image/*" />
                                    <button onClick={() => {
                                        const newInputs = inputChanges
                                        newInputs.pop()
                                        console.log("input index: ", index)
                                        const newExtras = extraFiles.filter((item, idx) => {
                                            return idx !== index + 1
                                        })
                                        setExtraFiles(newExtras)
                                        setNewFileInput(false)
                                        setInputChanges(newInputs)
                                    }}>
                                        Remove
                                    </button>
                                </div>

                            )
                        })}
                    </div>
                    <div className="flex flex-col lg:flex-row gap-[20px] borde">
                        <div className="w-[223px] h-[56px]">
                            <UserButton disabled={extraFiles.length == 0} onClick={() => { newInput() }} type="gradient" text="Add More" />
                        </div>
                        <div className="w-[223px] h-[56px]">
                            <UserButton disabled={ticketInfo.agentId == "" || ticketInfo.subject == "" || ticketInfo.departmentId == "" || message == ""} type="gradient" text="Create" onClick={createTicket} />
                            {/* disabled={ticketInfo.agentId == "" || ticketInfo.subject == "" || ticketInfo.departmentId == "" || message == ""} type="gradient" text="Create" */}
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}



NewTicket.Layout = SupportLayoutTemplate