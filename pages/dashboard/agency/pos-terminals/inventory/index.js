import MetricLayoutTemplate from "../../../../../components/MetricLayoutTemplate";
// import ImageHolder from "../../../../components/ImageHolder";
import UserButton from "../../../../../components/ButtonMaker";
import { useEffect, useState } from "react";
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import { ngrok, testEnv, editApi } from "../../../../../components/Endpoints";
import Textfield from "../../../../../components/TextField";
import ImageHolder from "../../../../../components/ImageHolder";
import TableContainer from "../../../../../components/TableContainer";

export default function Inventory({ modals, setToken, setActiveDashboard, setActiveState, viewState, setView, isLoading, setLoading, setModalState, editFormState, entryValue, pageSelector, search, searchField, resetSearchParams, setSearchParam }) {

    const [posData, setPosData] = useState()
    const [posRequests, setPosRequests] = useState([])
    const [searchedField, setSearchedField] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data: inventoryData, error: inventoryDataError } = useSWR(`${testEnv}v1/device/pos/inventory?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const { data: searchInventoryData, error: searchInventoryDataError } = useSWR(`${testEnv}v1/device/pos/inventory/search?pattern=${searchField}&pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)


    useEffect(() => {
        setView(false)
        setActiveDashboard("POSTerminals")
        setActiveState("2")
        resetSearchParams()
        if (inventoryData) {
            setLoading(false)
            setPosData(inventoryData)
        }
        if (inventoryDataError) {
            console.log(inventoryDataError)
        }
    }, [inventoryData])

    useEffect(() => {
        // if(dateRange.dateTo > dateRange.dateFrom) {
        //     console.log("valid date range")
        // }
        // console.log(dateRange)
        // mutate(`${testEnv}v1/agent/filter_all_by_dates?from=${formatDate(dateRange.dateFrom)}&pageNo=${entryValue.page}&pageSize=${entryValue.size}&to=${formatDate(dateRange.dateTo)}`)
        if (searchInventoryData) {
            setSearchedField(searchInventoryData)
        }
        if (searchInventoryDataError) {
            console.log(searchInventoryDataError)
        }
    }, [searchInventoryData])

    useEffect(()=>{
        const fetchRequestIds = async function() {
            const requests = await axios.get(`${testEnv}v1/pos_request/all?pageNo=0&pageSize=100`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
            // console.log("requests: ", requests.data.data)
            const allIds = requests.data.data.map(req => req.id)
            setPosRequests(allIds)

        }

        fetchRequestIds()
    },[])

    function posEdit(modalState, modal, fields, id) {
        // debugger
        setModalState(modalState, modal)
        editFormState(fields, id)
    }


    const dateFormatter = (stamp) => {
        const date = new Date(stamp)
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes()
    }





    return (
        <div className="w-full">
            <section className={`px-4 justify-center w-full ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <section className={`pt-2 px-2 pb-2 w-full flex flex-col lg:flex-row items-center mt-8 h-fit lg:h-[61px] rounded-[10px] lg:rounded-[48px] bg-[#F3F3F3]`}>
                    <section className={`md:w-[250px] w-[95%] flex h-[40px] bg-white rounded-[20px] px-2 relative  items-center justify-between`}>
                        <input onChange={(e) => { setSearchParam(e) }} className="search-tab rounded-[20px] w-[80%]" placeholder="Search Inventory" />
                        <div className="w-[28px] h-[28px] relative">
                            <ImageHolder src='/icons/search-icon.svg' />
                        </div>
                    </section>
                    <div className={`flex flex-col lg:mt-0 mt-[10px] gap-[10px] w-[90%] lg:grow lg:flex-row lg:justify-end lg:h-[35px]`}>
                        <div className={`h-[35px] w-full lg:w-[200px] `}>
                            <UserButton type="file" />
                        </div>
                        <div className="h-[35px]  w-full lg:w-[200px]">
                            <UserButton type="pdf" />
                        </div>
                        <div className={`h-[35px]  w-full lg:w-[200px]`}>
                            <UserButton onClick={() => { posEdit(true, "posModalAdd", { terminalId: "", serialNumber: "", posTerminalType: "", action: "Add" }, "") }} type="gradient" text="+Add POS Terminal" />
                        </div>
                    </div>
                </section>
            </section>

            <section className="min-h-[674px] mt-[20px] w-full  pt-4 pl-2 pr-4">
                <TableContainer pageSelector={pageSelector} entryValue={entryValue}>
                    <table className="table-fixed px-[15px] w-full">
                        <thead>
                            <tr className="">
                                <th className="font-400 w-[160px] text-start  text-[12px] leading-[15.62px] font-pushpennyBook">TERMINAL ID</th>
                                <th className="font-400 w-[132px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">SERIAL NO.</th>
                                <th className="font-400 w-[106px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">TYPE</th>
                                <th className="font-400 w-[90px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">ASSIGNEE</th>
                                <th className="font-400 w-[70px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">STATUS</th>
                                <th className="font-400 w-[460px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="mt-6">
                            {searchField == "" ?
                                posData?.data.map((data, index) => {
                                    return (
                                        <tr key={index} className="h-[70px] border-b px-[10px] border-[#979797]">
                                            <td className="font-pushpennyBook  w-[160px] break-words font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.terminalId}</td>
                                            <td className="font-pushpennyBook  w-[132px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.serialNumber}</td>
                                            <td className="font-pushpennyBook  w-[106px] truncate pr-[10px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.type}</td>
                                            <td className="font-pushpennyBook  w-[90px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.agentDetails}</td>
                                            <td className="font-pushpennyBook  w-[70px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.status}</td>
                                            <td className="font-pushpennyBook  group:ml-[10px] w-[460px]">
                                                <div className="w-[88px] inline-flex h-[36px]">
                                                    <UserButton type="edit" text="Edit" onClick={() => { posEdit(true, "posModalAdd", { terminalId: data.terminalId, serialNumber: data.serialNumber, posTerminalType: data.serviceName, action: "Edit" }, data.id) }} />
                                                </div>
                                                <div className="w-[108px] group ml-[10px] inline-flex h-[36px]">
                                                    <UserButton type="accept" text="Assign" onClick={() => { posEdit(true, "posModalAssign", { agentId: "", agentName: "", posTerminalType: data.terminalId, action: "Assign", idList:posRequests }, data.id) }} />
                                                </div>
                                                <div className="w-[108px] ml-[10px] inline-flex h-[36px]">
                                                    <UserButton type="decline" text="Retrieve" onClick={() => { posEdit(true, "posModalAdd", { terminalId: data.terminalId, serialNumber: data.serialNumber, posTerminalType: data.serviceName, action: "Retrieve" }, data.id) }} />
                                                </div>
                                                <div className="w-[108px] ml-[10px] inline-flex h-[36px]">
                                                    <UserButton type="view" text="View" />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }) :
                                
                                searchInventoryData?.data.map((data, index) => {
                                    return (
                                        <tr key={index} className="h-[70px] border-b px-[10px] border-[#979797]">
                                            <td className="font-pushpennyBook  w-[160px] break-words font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.terminalId}</td>
                                            <td className="font-pushpennyBook  w-[132px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.serialNumber}</td>
                                            <td className="font-pushpennyBook  w-[106px] truncate pr-[10px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.type}</td>
                                            <td className="font-pushpennyBook  w-[90px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.agentDetails}</td>
                                            <td className="font-pushpennyBook  w-[70px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.status}</td>
                                            <td className="font-pushpennyBook  group:ml-[10px] w-[460px]">
                                                <div className="w-[88px] inline-flex h-[36px]">
                                                    <UserButton type="edit" text="Edit" onClick={() => { posEdit(true, "posModalAdd", { terminalId: data.deviceId, serialNumber: data.retrievalReferenceNumber, posTerminalType: data.serviceName, action: "Edit" }, data.id) }} />
                                                </div>
                                                <div className="w-[108px] group ml-[10px] inline-flex h-[36px]">
                                                    <UserButton type="accept" text="Assign" onClick={() => { posEdit(true, "posModalAssign", { agentId: "", agentName: "", posTerminalType: "", action: "Assign" }, data.id) }} />
                                                </div>
                                                <div className="w-[108px] ml-[10px] inline-flex h-[36px]">
                                                    <UserButton type="decline" text="Retrieve" onClick={() => { posEdit(true, "posModalRetrieve", { terminalId: data.deviceId, serialNumber: data.retrievalReferenceNumber, posTerminalType: data.serviceName, action: "Retrieve" }, data.id) }} />
                                                </div>
                                                <div className="w-[108px] ml-[10px] inline-flex h-[36px]">
                                                    <UserButton type="view" text="View" />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </TableContainer>
            </section>

        </div>
    )
}



Inventory.Layout = MetricLayoutTemplate