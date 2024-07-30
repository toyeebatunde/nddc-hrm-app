
import UserButton from "../../../../components/ButtonMaker"
import ImageHolder from "../../../../components/ImageHolder"
// import RadioToggle from "../../../../../components/RadioToggle"
import { useState, useEffect, useMemo } from "react"
import Toggler from "../../../../components/Toggle"
import axios from "axios"
import useSWR from 'swr'
import { useRouter } from "next/router"
import { testEnv } from "../../../../components/Endpoints"
import dynamic from "next/dynamic"
import { EditorState, convertToRaw } from "draft-js"
import EditorComponent from '../../../../components/EditorComponent'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html"
import Textfield from "../../../../components/TextField"
import { useEditor } from "../../../../components/EditorComponent"
// import { Editor } from 'react-draft-wysiwyg';
// import {draftToMarkdown} from 'draftjs-to-markdown'


export default function Ticket({ modals, setModalState, editFormState, setToken, setActiveDashboard, setActiveState, setLoading }) {
    const router = useRouter()
    const [ticketId, setTicketId] = useState()
    const [ticketData, setTicketData] = useState()
    const [messagesData, setMessagesData] = useState()
    const [attachments, setAttachments] = useState([])
    // const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const { memoizedEditor, message } = useEditor()

    useEffect(() => {
        const newId = localStorage.getItem('ticketId')
        setTicketId(newId)
        // debugger
    }, [])


    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data: ticket, error: ticketError } = useSWR(`${testEnv}v1/ticket/${ticketId}`, fetching)
    const { data: ticketMessages, error: ticketMessagesError } = useSWR(`${testEnv}v1/ticket/${ticketId}/messages`, fetching)

    useEffect(() => {
        // setLoading(true)
        setToken()
        setActiveDashboard("TicketManagement")
        setActiveState("4")
        if (ticket) {
            let messageAttachments = []
            setLoading(false)
            setTicketData(ticket)
            // ticket.data.messages.map((message) => {
            //     // const messageToPush = []
            //     if (Array.isArray(JSON.parse(message.attachment1))) {
            //         messageAttachments = [...messageAttachments, message.attachment1]
            //         return
            //     }
            //     messageAttachments.push(message.attachment1 || "", message.attachment2 || "", message.attachment3 || "")
            // })
            const finalAttachments = messageAttachments.filter((attachment) => {
                if (attachment) {
                    return attachment
                }
                return
            })
            setAttachments(finalAttachments)
        }
        if (ticketError) {
            console.log(ticketError)
        }
    }, [ticket])

    useEffect(() => {
        // setLoading(true)
        // setToken()
        // setActiveDashboard("TicketManagement")
        // setActiveState("4")
        if (ticketMessages) {
            setLoading(false)
            setMessagesData(ticketMessages)
        }
        if (ticketMessagesError) {
            console.log(ticketMessagesError)
        }
    }, [ticketMessages])



    function onEditorStateChange(editorState) {
        setEditorState(editorState)
    }



    // const Editor = dynamic(
    //     () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    //     { ssr: false }
    // )

    const dateFormatter = (stamp) => {
        const date = new Date(stamp)
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes()
    }

    const toggle = (e, agentId) => {
        setLienStatus({ ...lienStatus, lien: e.target.checked, status: e.target.checked ? "on" : "off" })
        debugger

        axios.put(`${testEnv}v1/agent/${agentId}/lien?param=${lienStatus.status}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
            .then(response => { console.log(response) })
            .catch(error => { console.log(error) })

    };


    const dataFormat = (data) => {
        const value = data.toString()
        if (value.includes(".00")) {
            return `₦${value}`
        }
        return `₦${value}.00`
    }



    function setTab(tab) {
        setActiveTab(tab)
    }

    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    // console.log(convertToRaw(editorState.getCurrentContent()))

    if (!ticketData) {
        return (
            <div>Loading...</div>
        )
    }

    async function viewAttachment(modalState, modal, id, fileKey = "") {
        // debugger
        // api/file-view/presign-url- returns image url /v1/api/presign-url/view-file?fileKey
        const data = await axios.post("https://admapis-staging.payrail.co/v1/api/presign-url/view-file",
            { fileKey: fileKey },
            { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }
        )
            .then(res => res.data)
            .catch(err => console.log(err))
        // console.log("otherData: ", otherData)
        setModalState(modalState, modal)
        editFormState({ image: data }, id)
        // return
    }


    return (
        <div className={`flex relative flex-col items-start pt-[60px] overflow-hidden w-full`}>
            <section className={`w-full flex px-4 justify-between ${modals.isOpen ? "blur-sm" : "blur-none"} `}>
                <h4 className="font-pushpennyMedium text-[36px] leading-[47px]">
                    Support
                </h4>
            </section>
            <h2 className="mt-[40px] ml-4 font-pushpennyBook">View Ticket</h2>
            <section className="flex flex-col px-4 flex-col mt-[35px] lg:flex-row gap-[20px] w-full">
                <section className="flex flex-col w-full lg:w-[60%] gap-[10px]">
                    <div className="flex flex-col gap-[10px]">
                        <div className="w-full min-h-[460px] rounded-[10px] border-[#F3F3F3] flex-col border">
                            {memoizedEditor}
                        </div>
                        <div className="flex justify-between items-center flex-col lg:flex-row lg:flex-wrap items-center gap-[10px] w-full min-h-[57px]">
                            <input type="file" id="images" accept="image/*" required />
                            <div className="w-[223px] h-[56px]">
                                <UserButton type="gradient" text="Add More" />
                            </div>
                            <div className="w-[223px] h-[56px]">
                                <UserButton type="gradient" text="Reply" />
                            </div>
                        </div>
                    </div>

                    {messagesData?.data.map((message, index) => {
                        return (
                            <div key={index} className="w-full min-h-[471px] border border-[#F3F3F3] rounded-[10px] flex flex-col items-center gap-[50px] pt-[10px]">
                                <div className="border-b border-[#6E7883] h-[52px] w-[90%] flex">
                                    <div className="w-full lg:w-[322px] min-h-[41px] justify-between flex">
                                        <div className="flex gap-[10px]">
                                            <div className="w-[24px] relative h-[24px]">
                                                <ImageHolder src="/icons/user-circle.svg" />
                                            </div>
                                            <div className="flex flex-col">
                                                <h2 className="font-pushpennyBook w-[120px] truncate text-[14px] font-[400] leading-[22px]">
                                                    {message.messageby}
                                                </h2>
                                                <h2 className="font-pushpennyBook text-[#6F6F6F] text-[12px] font-[400] leading-[18px]">
                                                    {message.messageRole}
                                                </h2>
                                            </div>
                                        </div>
                                        <h2 className="text-[#8C8C8C] text-[12px] font-[400] leading-[18px] font-pushpennyBook">
                                            31/03/2022 {`(`}10:38{`)`}
                                        </h2>
                                    </div>
                                </div>
                                {message.text}
                                <div className="bg-[#F3F3F3] rounded-b-[10px] mt-auto px-[20px] items-center w-full flex justify-end gap-[5px] h-[24px]">
                                    <div className="relative w-[13px] h-[13px]">
                                        <ImageHolder src="/icons/ticket-star.svg" />
                                    </div>
                                    <div className="relative w-[13px] h-[13px]">
                                        <ImageHolder src="/icons/ticket-star.svg" />
                                    </div>
                                    <div className="relative w-[13px] h-[13px]">
                                        <ImageHolder src="/icons/ticket-star.svg" />
                                    </div>
                                    <div className="relative w-[13px] h-[13px]">
                                        <ImageHolder src="/icons/ticket-star.svg" />
                                    </div>
                                    <div className="relative w-[13px] h-[13px]">
                                        <ImageHolder src="/icons/ticket-star.svg" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </section>
                <section className="flex lg:w-[35%] flex-col w-full">
                    <div className="flex flex-col w-full h-[440px] gap-[10px]">
                        <div className="flex flex-col justify-between rounded-[12px] w-full border items-center border-[#F3F3F3] h-[356px]">
                            <div className=" border-b border-[#F3F3F3] flex justify-between items-center w-[90%] h-[54px]">
                                <h2 className="font-[400] text-[16px] font-pushpennyBook">Ticket information • {ticketData?.data.uniqueId}</h2>
                                <div className="w-[18px] h-[18px] relative">
                                    <ImageHolder src="/icons/caret-up.svg" />
                                </div>
                            </div>
                            <div className=" border-b border-[#F3F3F3] flex items-center gap-[10px] w-[90%] h-[54px]">
                                <div className="flex relative w-[35px] h-[35px]">
                                    <ImageHolder src="/icons/user-rectangle.svg" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-[12px] font-[400] font-pushpennyBook leading-[18px]">Requester - Agent</h2>
                                    <h2 className="text-[15px] font-[400] font-pushpennyBook leading-[24px]">{ticketData?.data.agentName} • {ticketData?.data.agentPhoneNumber}</h2>
                                </div>
                            </div>
                            <div className=" border-b border-[#F3F3F3] flex items-center gap-[10px] w-[90%] h-[54px]">
                                <div className="flex relative w-[35px] h-[35px]">
                                    <ImageHolder src="/icons/layers.svg" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-[12px] font-[400] font-pushpennyBook leading-[18px]">Department</h2>
                                    <h2 className="text-[15px] font-[400] font-pushpennyBook leading-[24px]">{ticketData?.data.department}</h2>
                                </div>
                            </div>
                            <div className=" border-b border-[#F3F3F3] flex items-center gap-[10px] w-[90%] h-[54px]">
                                <div className="flex relative w-[35px] h-[35px]">
                                    <ImageHolder src="/icons/tick-double.svg" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-[12px] font-[400] font-pushpennyBook leading-[18px]">Submitted</h2>
                                    <h2 className="text-[15px] font-[400] font-pushpennyBook leading-[24px]">{dateFormatter(ticketData?.data.dateCreated)}</h2>
                                </div>
                            </div>
                            <div className=" flex items-center gap-[10px] w-[90%] h-[54px]">
                                <div className="flex relative w-[35px] h-[35px]">
                                    <ImageHolder src="/icons/notification.svg" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-[12px] font-[400] font-pushpennyBook leading-[18px]">Status</h2>
                                    <h2 className="text-[15px] font-[400] font-pushpennyBook leading-[24px]">{ticketData?.data.ticketStatus}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="h-[56px] w-full flex justify-between">
                            <div className="h-full rounded-[300px] w-[171px]">
                                <UserButton type="gradient" text="Reply" />
                            </div>
                            <div className="h-full rounded-[300px] w-[171px]">
                                <UserButton onClick={() => router.back()} bg="bg-[#e8e8e8]" text="Close" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col w-full min-h-[204px] mt-[103px] gap-[10px]">
                        <h2 className="font-[700] text-[17px] text-[#161616] leading-[27px] font-pushpennyBook">Attachments</h2>
                        <div className="rounded-[10px] mt-[26px] border border-[#F3F3F3] w-full flex flex-col items-center justify-center">
                            {attachments.map((attachment, idx) => {
                                return (
                                    <button onClick={() => { viewAttachment(true, "imageView", ticketId, attachment) }} className="w-[90%] gap-[10px] py-[5px] flex">
                                        <div className="w-[20px] h-[20px] relative">
                                            <ImageHolder src="/icons/file-download.svg" />
                                        </div>
                                        <h2 className="font-[400] text-[#6f6f6f] font-pushpennyBook text-[14px] leading-[22px]">Attachment {idx + 1}</h2>
                                    </button>
                                )
                            })}
                            
                        </div>
                    </div>
                    <div className="flex flex-col w-full min-h-[204px] mt-[31px] gap-[10px]">
                        <h2 className="font-[700] text-[17px] text-[#161616] leading-[27px] font-pushpennyBook">CC Recipients</h2>
                        <div className="mt-[18px] flex justify-between w-full h-[57px]">
                            <div className="w-[270px] border border-[#F3F3F3] rounded-[28px] h-full">
                                <Textfield />
                            </div>
                            <div className="w-[92px] h-full rounded-[300px]">
                                <UserButton text="Add" type="gradient" />
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}