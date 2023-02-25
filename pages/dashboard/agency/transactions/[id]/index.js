

import UserButton from "../../../../../components/ButtonMaker"
import ImageHolder from "../../../../../components/ImageHolder"
import RadioToggle from "../../../../../components/radioToggle"
import { useState, useEffect } from "react"
import Toggler from "../../../../../components/Toggle"
import axios from "axios"
import useSWR from 'swr'
import { useRouter } from "next/router"
import { testEnv } from "../../../../../components/Endpoints"

export default function Agent({ modals, setModalState, setToken, setActiveDashboard, setActiveState, setLoading }) {
    const router = useRouter()
    console.log(router.query.id)
    const [lienStatus, setLienStatus] = useState()
    const [tranDetails, setTranDetails] = useState(false)

    const [transactionData, setTransactionData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/transaction/${router.query.id}`, fetching)

    useEffect(() => {
        // setLoading(true)
        console.log(router.query)
        setToken()
        setActiveDashboard("Transactions")
        setActiveState("2")
        if (data) {
            setLoading(false)
            setTransactionData(data)
        }
        if (error) {
            console.log(error)
        }
    }, [data])

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
                    Agency
                </h4>
            </section>
            <h2 className="mt-[40px] ml-4 font-pushpennyBook">{transactionData?.data.type}</h2>
            <section className="flex px-4 flex-col mt-[35px] gap-[3%] w-full">
                <section className="flex-col gap-[20px] lg:gap-[0px] border flex lg:justify-between lg:flex-row w-full">
                    <div className="w-full lg:w-[32%] xl:w-[32%] xl:h-full">
                        <div className="w-full h-fit gap-[7px] flex flex-col">
                            <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                                <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">Transaction Details</h2>
                            </div>
                            <div className=" flex grow flex-col bg-[#FBF4EB] px-4 py-4 rounded-[10px]">
                                <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Reference</h2>
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{transactionData?.data.tranRef}</h2>
                                </div>
                                <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Type</h2>
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{transactionData?.data.type}</h2>
                                </div>
                                <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Amount</h2>
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{transactionData?.data.amount}</h2>
                                </div>
                                <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Agent</h2>
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{transactionData?.data.agent.userName}</h2>
                                </div>
                                <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Narration</h2>
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{transactionData?.data.narration || "n/a"}</h2>
                                </div>
                                <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Geo Location</h2>
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">working on it</h2>
                                </div>
                                <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Status</h2>
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{transactionData?.data.status}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-[33%] xl:w-[33%] h-fit">
                        <div className="w-full h-fit gap-[7px] flex flex-col">
                            <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                                <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">Service Information</h2>
                            </div>
                            <div className=" flex grow flex-col bg-[#FBF4EB] px-4 py-4 rounded-[10px]">
                                <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Service Name</h2>
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{transactionData?.data.serviceName || "n/a"}</h2>
                                </div>
                                <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Service Reference</h2>
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{transactionData?.data.externalServiceReference || "n/a"}</h2>
                                </div>
                                <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Masked Plan</h2>
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{transactionData?.data.maskedPlan || "n/a"}</h2>
                                </div>
                                <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Card Scheme</h2>
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{transactionData?.data.cardScheme || "n/a"}</h2>
                                </div>
                                <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Currency</h2>
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{transactionData?.data.currency || "n/a"}</h2>
                                </div>
                                <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Merchant ID</h2>
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{transactionData?.data.merchantId || "n/a"}</h2>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-[33%] xl:w-[33%] h-fit">
                        <div className="w-full h-fit gap-[7px] flex flex-col">
                            <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                                <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">Device Information</h2>
                            </div>
                            <div className=" flex grow flex-col bg-[#FBF4EB] px-4 py-4 rounded-[10px]">
                                <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Device ID</h2>
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{transactionData?.data.deviceId}</h2>
                                </div>
                                <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Device Name</h2>
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{transactionData?.data.deviceName || "n/a"}</h2>
                                </div>
                                <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Device Type</h2>
                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{transactionData?.data.deviceName || "n/a"}</h2>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </section>
                <section className="flex-col gap-[3%] flex lg:flex-row w-full px-4 mt-[15px]">
                    <section className="w-full lg:w-[70%] gap-[15px] flex-col flex">
                        <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                            <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">Settlement Information</h2>
                        </div>
                        <div className=" flex w-full flex-col border border-[#dddddd] overflow-x-auto px-4 py-4 rounded-[10px]">
                            <div className="w-[664px]">
                                <table className="table-fixed w-full">
                                    <thead>
                                        <tr className="">
                                            <th className="font-400   w-[100px]  text-[12px] leading-[15.62px] font-pushpennyBook">AMOUNT</th>
                                            <th className="font-400   w-[100px] text-[12px] leading-[15.62px] font-pushpennyBook">PURSE</th>
                                            <th className="font-400   w-[100px] text-[12px] leading-[15.62px] font-pushpennyBook">STATUS</th>
                                            <th className="font-400   w-[100px] text-[12px] leading-[15.62px] font-pushpennyBook">PURPOSE</th>
                                            <th className="font-400   w-[100px] break-words text-[12px] leading-[15.62px] font-pushpennyBook">CHANNEL</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </section>
                    <section className="w-full lg:w-[30%]"></section>
                </section>
            </section>
        </div>
    )
}