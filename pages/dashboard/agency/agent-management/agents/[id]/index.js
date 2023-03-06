

import UserButton from "../../../../../../components/ButtonMaker"
import ImageHolder from "../../../../../../components/ImageHolder"
import RadioToggle from "../../../../../../components/radioToggle"
import { useState, useEffect } from "react"
import Toggler from "../../../../../../components/Toggle"
import axios from "axios"
import useSWR from 'swr'
import { useRouter } from "next/router"
import { testEnv } from "../../../../../../components/Endpoints"
import { editApi, patchApi } from "../../../../../../components/Endpoints"
import { convertFromHTML } from "draft-js"
import { useRef } from "react"


export default function Agent({ modals, setModalState, editFormState, setToken, setActiveDashboard, setActiveState, setLoading }) {
    const router = useRouter()
    const [toggleStateOne, setToggleStateOne] = useState(false)
    const [lienStatus, setLienStatus] = useState({lien:false, status: "off", api:false})
    const [accountStatus, setAccountStatus] = useState({account:true, status: "on", api:false})
    const [activationStatus, setActivationStatus] = useState()
    const [tranDetails, setTranDetails] = useState(false)
    const [viewTransaction, setViewTransaction] = useState(false)
    const lienToggle = useRef()
    const accountStatusToggle = useRef()

    const [agentData, setAgentData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/agent/${router.query.id}`, fetching)

    useEffect(() => {
        // setLoading(true)        
        setToken()
        setActiveDashboard("AgentManagement")
        setActiveState("2")
        if (data) {
            setAgentData(data)
            setLienStatus({ lien: data.agent.onLien, status: data.agent.onLien ? "on" : "off", api: false })
            setActivationStatus({ active: data.agent.onLien, status: data.agent.onLien ? "on" : "off" })
            setLoading(false)
        }
        if (error) {
            console.log(error)
        }
    }, [data])

    useEffect(() => {
        if (lienStatus.api) {
            // const notLienStatus = lienStatus.status == "on" ? "off" : lienStatus.status == "off" ? "on" : "off"
            // setLienStatus({ ...lienStatus, lien: e.target.checked, status: e.target.checked ? "on" : "off" })
            agentHandler(true, "action",
                {
                    caution: `You are about to place ${agentData.agent.firstName} ${agentData.agent.lastName} on lien`,
                    action: "delete",
                    endPoint: `${testEnv}v1/agent/${router.query.id}/lien?param=${lienStatus.status}`,
                    reason: false,
                    onClick: patchApi,
                    text: "Place on lien",
                    cancelClick: reverseLien
                }, data.id)
                return
        }
    }, [lienStatus])

    function reverseLien() {
        lienToggle.current.checked = !lienToggle.current.checked
        setLienStatus({...lienStatus, lien: lienToggle.current.checked, status: lienToggle.current.checked ? "on" : "off", api: false})
    }



    function agentHandler(modalState, modal, fields, id) {
        setModalState(modalState, modal)
        editFormState(fields, id)
    }

    function cancelLien() {
    }

    const approveCaution = "You are about to approve a KYC. Please note after approving it will go through the approval process"
    const declineCaution = "You are about to decline a KYC. Please note after approving it will go through the approval process"
    const deleteCaution = "You are about to delete device information"

    const dateFormatter = (stamp) => {
        const date = new Date(stamp)
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes()
    }

    const toggle = (e, handler) => {
        // console.log(lienToggle.current.checked)
        setLienStatus({ ...lienStatus, lien: e.target.checked, status: e.target.checked ? "on" : "off", api:true })
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
            <h2 className="mt-[40px] ml-4 font-pushpennyBook">Agent Management</h2>
            <section className={`${viewTransaction ? "hidden" : "flex"} px-4 flex-col mt-[35px] gap-[3%] lg:flex-row w-full`}>
                <div className="flex flex-col w-full lg:w-[47%]">
                    <div className="w-full gap-[7px] h-[520px] flex flex-col">
                        <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                            <h2 className="font-pushpennyBook text-[14px] lg:text-[18px] font-[400] leading-[14px]">{agentData?.agent.firstName} {agentData?.agent.lastName}'s wallet details</h2>
                            <div className="w-[134px] h-[35px]">
                                <UserButton type="gradient" text="System split" />
                            </div>
                        </div>
                        <div className=" flex border border-[#E8E8E8] flex-col rounded-[10px]">
                            <div className="px-4 flex py-4 flex-col">
                                <div className="flex justify-between">
                                    <h2 className="font-pushpennyBook font-[400] text-[#161616] text-[11px] lg:text-[12px]">TRADING BALANCE</h2>
                                    <div className="flex relative">
                                        <div className="relative w-[24px] h-[24px]">
                                            <ImageHolder src="/icons/configurations.svg" />
                                        </div>
                                        <h2 className="font-pushpennyMedium text-[11px] lg:text-[13px] font-[500] leading-[24px]">Commission Configurations</h2>
                                    </div>
                                </div>
                                <div className="font-[500] text-[40px] font-pushpennyMedium leading-[52px]"> {agentData ? dataFormat(agentData.wallet.balance) : "₦0.00"}</div>
                                <div className="w-[210px] h-[50px] pl-4 justify-center border border-[#E8E8E8] rounded-[10px] flex flex-col">
                                    <h2 className="font-pushpennyBook text-[8px] text-[#6E7883] font-[400] leading-[10px]">commission balance</h2>
                                    <h2 className="text-[20px] font-pushpennyMedium text-[#6E7883] font-[500] ">{agentData ? dataFormat(agentData.wallet.commission.balance) : "₦0.00"}</h2>
                                </div>
                            </div>
                            <div className="w-full justify-between p-4 h-[258px] bg-[#FBF4EB] flex flex-col rounded-[10px]">
                                <h2 className="font-pushpennyBook text-[12px] font-[400] text-[#6E7883] leading-[15px]">BANK ACCOUNT DETAILS</h2>
                                <div className="flex justify-between">
                                    <h2 className="font-pushpennyBook text-[18px] font-[400] text-[#6E7883] leading-[15px]">ACCOUNT NUMBER</h2>
                                    <h2 className="font-pushpennyBook text-[18px] font-[400] text-[#6E7883] leading-[15px]">{agentData?.agent.bankAccountNumber}</h2>
                                </div>
                                <div className="flex justify-between">
                                    <h2 className="font-pushpennyBook text-[18px] font-[400] text-[#6E7883] leading-[15px]">ACCOUNT NAME</h2>
                                    <h2 className="font-pushpennyBook text-[18px] font-[400] text-[#6E7883] leading-[15px]">{agentData?.customerAccount.externalAccountName}</h2>
                                </div>
                                <div className="flex justify-between">
                                    <h2 className="font-pushpennyBook text-[18px] font-[400] text-[#6E7883] leading-[15px]">BANK NAME</h2>
                                    <h2 className="font-pushpennyBook text-[18px] font-[400] text-[#6E7883] leading-[15px]">{agentData?.customerAccount.externalBankName}</h2>
                                </div>
                                <div className="w-[95%] flex self-center h-[36px]">
                                    <UserButton type="transaction" onClick={() => { router.push(`/dashboard/agency/agent-management/agents/${router.query.id}/transaction-history?agent=${router.query.id}`) }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[513px] gap-[7px] flex flex-col">
                        <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                            <h2 className="font-pushpennyBook text-[14px] lg:text-[18px] font-[400] leading-[14px]">{`${agentData?.agent.firstName} ${agentData?.agent.lastName}'s wallet details`}</h2>
                        </div>
                        <div className=" flex border grow border-[#E8E8E8] flex-col rounded-[10px]">
                            <div className="grow w-full justify-around p-4 flex flex-col">
                                <h2 className="font-pushpennyBook text-[12px] font-[400] leading-[14px] text-[#6E7883]">
                                    Manage user account activities
                                </h2>
                                <ul className="flex justify-between border-b border-[#FBF4EB] w-full xl:w-[90%]">
                                    <li className="font-pushpennyBook  text-[12px] font-[400] leading-[15px]">STATUS</li>
                                    <li className="font-pushpennyBook text-[12px] font-[400] leading-[15px]">CREATED ON</li>
                                    <li className="font-pushpennyBook text-[12px] font-[400] leading-[15px]">LAST LOGIN</li>
                                    <li className="font-pushpennyBook text-[12px] font-[400] leading-[15px]">LIEN STATUS</li>
                                </ul>
                                <div className="flex justify-between w-full">
                                    <div className="w-[40px] text-center   font-pushpennyBook text-[18px] font-[400] leading-[23px] text-[#6E7883] ">{agentData?.agent.status}</div>
                                    <div className="w-[80px] xl:w-[100px]  font-pushpennyBook text-[18px] font-[400] leading-[23px] text-[#6E7883] ">
                                        {agentData?.agent.dateCreated == null ? "n/a" : dateFormatter(agentData?.agent.dateCreated)}
                                    </div>
                                    <div className="w-[80px] xl:w-[100px]  font-pushpennyBook text-[18px] font-[400] leading-[23px] text-[#6E7883] ">
                                        {agentData?.agent.lastLoginDate == null ? "n/a" : dateFormatter(agentData?.agent.lastLoginDate)}
                                    </div>
                                    <div className="w-[60px] xl:w-[100px] lg:w-[40px]  font-pushpennyBook text-[18px] font-[400] leading-[23px] text-[#6E7883] ">{agentData?.agent.onLien ? "YES" : "NO"}</div>
                                </div>
                            </div>
                            <div className="w-full relative justify-between p-4 lg:h-[270px] bg-[#FBF4EB] flex flex-col rounded-[10px]">
                                <div className="w-full flex flex-col items-center gap-[7px]">
                                    <h2 className="font-pushpennyBook text-[12px] font-[400] leading-[15px]">ACTIONS</h2>
                                    <div className="border-t-[1px] border-white flex flex-col lg:flex-row w-full">
                                        <div className="w-full lg:w-[50%] lg:border-r-[0.5px] lg:border-white flex flex-col p-[10px] items-center lg:items-start">
                                            <h2 className="font-pushpennyBook text-[18px] text-[#6E7883] font-[400] leading-[15px]">ACTIVATE</h2>
                                            <div className="w-[153px] lg:w-full flex flex-col items-center lg:flex-row justify-between xl:w-full lg:h-[36px] mt-[17px]">
                                                <h2 className="font-pushpennyBook text-[18px] text-[#6E7883] font-[400] leading-[15px]">Account Status</h2>
                                                <div>
                                                    <Toggler toggleState={toggleStateOne} />
                                                </div>
                                            </div>
                                            <div className="w-[153px] lg:w-full flex flex-col items-center lg:flex-row justify-between lg:h-[36px] mt-[17px]">
                                                <h2 className="font-pushpennyBook text-[18px] text-[#6E7883] font-[400] leading-[15px]">Lien Status</h2>
                                                <div >
                                                    <Toggler toggleRef={lienToggle} onClick={(e) => { toggle(e) }} id={router.query.id} toggled={lienStatus == undefined ? false : lienStatus.lien} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-[50%] lg:border-l-[0.5px] lg:border-white flex flex-col p-[10px] items-center lg:items-start">
                                            <h2 className="font-pushpennyBook text-[18px] text-[#6E7883] font-[400] leading-[15px]">RESET</h2>
                                            <div className="w-[153px] lg:w-[113px] xl:w-[153px] h-[36px] mt-[17px]">
                                                <UserButton text="Password" type="edit" />
                                            </div>
                                            <div className="w-[153px] lg:w-[113px] xl:w-[153px] h-[36px] mt-[12px]">
                                                <UserButton text="PIN" type="edit" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="gap-[7px] flex flex-col mt-[20px] w-full min-h-[210px] overflow-y-auto">
                        <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                            <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">Device Information</h2>
                        </div>

                        <div className=" flex p-4 border min-h-[200px] overflow-y-auto border-[#E8E8E8] flex-col rounded-[10px]">
                            <h2 className="font-pushpennyBook text-[12px] text-[#6E7883]">Monitor user's login information</h2>
                            <div className="flex w-full justify-between">
                                <h2 className="font-pushpennyBook text-[12px] font-[400] leading-[15px]">DEVICE ID</h2>
                                <h2 className="font-pushpennyBook text-[12px] font-[400] leading-[15px]">ACTION</h2>
                            </div>
                            {agentData?.devices.map((device, index) => {
                                if (!device.deviceId) {
                                    return
                                }

                                return (
                                    <div key={index} className="flex justify-between border-b-[1px] border-[#D8D8D8] mt-[30px] h-[57px] items-start w-full">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{device.deviceId}</h2>
                                        <div className="w-[98px] h-[30px]">
                                            <UserButton type="delete" small={true} onClick={() => { agentHandler(true, "action", { caution: `You are about to delete ${agentData.agent.firstName} ${agentData.agent.lastName}'s device information`, action: "delete", endPoint: `${testEnv}v1/kyc/${agentData.kyc.id}/decline_bvn`, reason: false, onClick: patchApi }, data.id) }} />
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full mt-[20px] lg:mt-0 lg:w-[50%]">
                    <div className="flex min-h-[250px] xl:h-[513px] justify-between flex-col xl:flex-row w-full">
                        <div className="w-full xl:w-[49%] xl:h-full">
                            <div className="w-full min-h-[513px] gap-[7px] flex flex-col">
                                <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                                    <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">Agent Information</h2>
                                </div>
                                <div className=" flex grow flex-col bg-[#FBF4EB] px-4 py-4 rounded-[10px]">
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Agent ID</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]"></h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Agent Type</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{agentData?.agent.agentType}</h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Username</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{agentData?.agent.userName}</h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Name</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{agentData?.agent.firstName} {agentData?.agent.lastName}</h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Email</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{agentData?.agent.email}</h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Phone</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{agentData?.agent.phoneNumber}</h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Address</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{agentData?.agent.address}</h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">City</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{agentData?.agent.city}</h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">LGA</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{agentData?.agent.lga}</h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">State</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{agentData?.agent.state}</h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Referrer</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]"></h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">KYC</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{agentData?.agent.kycComplete ? "Completed" : "Pending"}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full xl:w-[49%] mt-[20px] xl:mt-0  xl:h-full">
                            {agentData?.subAgents.length < 1 ? "" : (
                                agentData?.subAgents.map((agent, index) => {
                                    return (
                                        <div className={`w-full min-h-[213px] gap-[7px] flex flex-col`}>
                                            <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                                                <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">Sub-agent Information</h2>
                                            </div>
                                            <div className=" flex grow flex-col bg-[#FBF4EB] px-4 py-4 rounded-[10px]">
                                                <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Agent ID</h2>
                                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{agentData?.subAgents[0] ? agentData?.subAgents[0] : "n/a"}</h2>
                                                </div>
                                                <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Name</h2>
                                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{agentData?.subAgents[1] ? agentData?.subAgents[1] : "n/a"}</h2>
                                                </div>
                                                <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Phone</h2>
                                                    <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{agentData?.subAgents[2] ? agentData?.subAgents[2] : "n/a"}</h2>
                                                </div>

                                                <div className="h-[36px] self-center mt-[20px] w-[236px]">
                                                    <UserButton type="view" text="View agent" />
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>
                    <div className="flex-col w-full mt-[10px] min-h-[763px]">
                        <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col mt-[20px] lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                            <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">KYC Details</h2>
                        </div>
                        <div className="flex w-full grow flex-col mt-[10px] overflow-x-auto bg-[#FBF4EB] pl-[10px] py-2 rounded-[10px]">
                            <div className="w-[741px] lg:w-full h-fit">

                                <table className="table-fixed w-full">
                                    <thead>
                                        <tr className="">
                                            <th className="font-400 text-[12px] text-start w-[83px] leading-[15.62px] font-pushpennyBook">KYC</th>
                                            <th className="font-400 w-[105px]  text-start  text-[12px] leading-[15.62px] font-pushpennyBook">DETAILS</th>
                                            <th className="font-400   w-[85px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">UPLOADED ON</th>
                                            <th className="font-400   text-[12px] text-start w-[60px] leading-[15.62px] font-pushpennyBook">STATUS</th>
                                            <th className="font-400 w-[210px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody className="mt-6 ">
                                        <tr className="h-[50px]">
                                            <td className="font-pushpennyBook  font-400 text-[14px] leading-[18px] text-[#6E7883]">{agentData?.kyc.bvn ? "BVN" : "n/a"}</td>
                                            <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{agentData?.kyc.bvn}</td>
                                            <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{dateFormatter(agentData?.kyc.bvnUploadedDate)}</td>
                                            <td className="font-pushpennyBook  w-[60px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{agentData?.kyc.bvnKycStatus}</td>

                                            <td className="font-pushpennyBook flex items-start">
                                                <div className="w-[49%] h-[36px]">
                                                    <UserButton type="edit" text="Approve" onClick={() => { agentHandler(true, "action", { caution: approveCaution, action: "approve", endPoint: `${testEnv}v1/kyc/${agentData.kyc.id}/verify_bvn`, reason: true, onClick: patchApi }, data.id) }} />
                                                </div>
                                                <div className="w-[49%] h-[36px]">
                                                    <UserButton type="view" text="Decline" onClick={() => { agentHandler(true, "action", { caution: declineCaution, action: "decline", endPoint: `${testEnv}v1/kyc/${agentData.kyc.id}/decline_bvn`, reason: false, onClick: patchApi }, data.id) }} />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}