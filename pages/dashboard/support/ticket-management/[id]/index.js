
import UserButton from "../../../../../components/ButtonMaker"
import ImageHolder from "../../../../../components/ImageHolder"
import RadioToggle from "../../../../../components/radioToggle"
import { useState, useEffect } from "react"
import Toggler from "../../../../../components/Toggle"
import axios from "axios"
import useSWR from 'swr'
import { useRouter } from "next/router"
import { testEnv } from "../../../../../components/Endpoints"
import dynamic from "next/dynamic"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Textfield from "../../../../../components/TextField"

export default function Ticket({ modals, setModalState, setToken, setActiveDashboard, setActiveState, setLoading }) {
    const router = useRouter()
    console.log(router.query.id)
    const [lienStatus, setLienStatus] = useState()
    const [tranDetails, setTranDetails] = useState(false)
    const [transactionData, setTransactionData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/transaction/${router.query.id}`, fetching)
    const [textFormat, setTextFormat] = useState({ bold: false, italic: false, underline: false })

    useEffect(() => {
        // setLoading(true)
        console.log(router.query)
        setToken()
        setActiveDashboard("TicketManagement")
        setActiveState("4")
        if (data) {
            setLoading(false)
            setTransactionData(data)
        }
        if (error) {
            console.log(error)
        }
    }, [data])

    const Editor = dynamic(
        () => import('react-draft-wysiwyg').then(mod => mod.Editor),
        { ssr: false }
    )

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
                            <Editor
                                toolbarClassName="rounded-[10px]"
                                wrapperClassName=" min-h-[460px]"
                                editorClassName=""
                            />
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

                    <div className="w-full min-h-[471px] border border-[#F3F3F3] rounded-[10px] flex flex-col items-center gap-[50px] pt-[10px]">
                        <div className="border-b border-[#6E7883] h-[52px] w-[90%] flex">
                            <div className="w-full lg:w-[322px] min-h-[41px] justify-between flex">
                                <div className="flex gap-[10px]">
                                    <div className="w-[24px] relative h-[24px]">
                                        <ImageHolder src="/icons/user-circle.svg" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="font-pushpennyBook text-[14px] font-[400] leading-[22px]">
                                            John Jeff
                                        </h2>
                                        <h2 className="font-pushpennyBook text-[#6F6F6F] text-[12px] font-[400] leading-[18px]">
                                            Customer Support
                                        </h2>
                                    </div>
                                </div>
                                <h2 className="text-[#8C8C8C] text-[12px] font-[400] leading-[18px] font-pushpennyBook">
                                    31/03/2022 {`(`}10:38{`)`}
                                </h2>
                            </div>
                        </div>
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
                </section>
                <section className="flex lg:w-[35%] flex-col w-full">
                    <div className="flex flex-col w-full h-[440px] gap-[10px]">
                        <div className="flex flex-col justify-between rounded-[12px] w-full border items-center border-[#F3F3F3] h-[356px]">
                            <div className=" border-b border-[#F3F3F3] flex justify-between items-center w-[90%] h-[54px]">
                                <h2 className="font-[400] text-[16px] font-pushpennyBook">Ticket information • #Technical - 9540</h2>
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
                                    <h2 className="text-[15px] font-[400] font-pushpennyBook leading-[24px]">Olamide Olagunju • +2348060110110</h2>
                                </div>
                            </div>
                            <div className=" border-b border-[#F3F3F3] flex items-center gap-[10px] w-[90%] h-[54px]">
                                <div className="flex relative w-[35px] h-[35px]">
                                    <ImageHolder src="/icons/layers.svg" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-[12px] font-[400] font-pushpennyBook leading-[18px]">Requester - Agent</h2>
                                    <h2 className="text-[15px] font-[400] font-pushpennyBook leading-[24px]">Olamide Olagunju • +2348060110110</h2>
                                </div>
                            </div>
                            <div className=" border-b border-[#F3F3F3] flex items-center gap-[10px] w-[90%] h-[54px]">
                                <div className="flex relative w-[35px] h-[35px]">
                                    <ImageHolder src="/icons/tick-double.svg" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-[12px] font-[400] font-pushpennyBook leading-[18px]">Requester - Agent</h2>
                                    <h2 className="text-[15px] font-[400] font-pushpennyBook leading-[24px]">Olamide Olagunju • +2348060110110</h2>
                                </div>
                            </div>
                            <div className=" flex items-center gap-[10px] w-[90%] h-[54px]">
                                <div className="flex relative w-[35px] h-[35px]">
                                    <ImageHolder src="/icons/notification.svg" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-[12px] font-[400] font-pushpennyBook leading-[18px]">Requester - Agent</h2>
                                    <h2 className="text-[15px] font-[400] font-pushpennyBook leading-[24px]">Olamide Olagunju • +2348060110110</h2>
                                </div>
                            </div>
                        </div>

                        <div className="h-[56px] w-full flex justify-between">
                            <div className="h-full rounded-[300px] w-[171px]">
                                <UserButton type="gradient" text="Reply" />
                            </div>
                            <div className="h-full rounded-[300px] w-[171px]">
                                <UserButton bg="bg-[#e8e8e8]" text="Close" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col w-full min-h-[204px] mt-[103px] gap-[10px]">
                        <h2 className="font-[700] text-[17px] text-[#161616] leading-[27px] font-pushpennyBook">Attachments</h2>
                        <div className="rounded-[10px] mt-[26px] border border-[#F3F3F3] w-full flex flex-col items-center justify-center">
                            <div className="w-[90%] gap-[10px] py-[5px] flex">
                                <div className="w-[20px] h-[20px] relative">
                                    <ImageHolder src="/icons/file-download.svg" />
                                </div>
                                <h2 className="font-[400] text-[#6f6f6f] font-pushpennyBook text-[14px] leading-[22px]">IMG109112  02-17-2022 7.20.21AM.png</h2>
                            </div>
                            <div className="w-[90%] gap-[10px] py-[5px] flex">
                                <div className="w-[20px] h-[20px] relative">
                                    <ImageHolder src="/icons/file-download.svg" />
                                </div>
                                <h2 className="font-[400] text-[#6f6f6f] font-pushpennyBook text-[14px] leading-[22px]">IMG109112  02-17-2022 7.20.21AM.png</h2>
                            </div>
                            <div className="w-[90%] gap-[10px] py-[5px] flex">
                                <div className="w-[20px] h-[20px] relative">
                                    <ImageHolder src="/icons/file-download.svg" />
                                </div>
                                <h2 className="font-[400] text-[#6f6f6f] font-pushpennyBook text-[14px] leading-[22px]">IMG109112  02-17-2022 7.20.21AM.png</h2>
                            </div>
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