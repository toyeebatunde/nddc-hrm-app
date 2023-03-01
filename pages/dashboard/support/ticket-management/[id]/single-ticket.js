

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
            <section className="flex flex-col px-4 flex-col mt-[35px] lg:flex-row gap-[3%] w-full">
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

                    <div className="w-full h-[471px] border rounded-[10px] flex flex-col items-center gap-[50px] py-[10px]">
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
                    </div>
                </section>
                <section className="flex lg:w-[35%] border w-full"></section>
            </section>
        </div>
    )
}