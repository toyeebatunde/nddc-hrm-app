
import MetricLayoutTemplate from "../../../../../components/MetricLayoutTemplate";
// import ImageHolder from "../../../../components/ImageHolder";
import UserButton from "../../../../../components/ButtonMaker";
import { useEffect, useState, useRef } from "react";
import useSWR, { mutate } from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import { ngrok, testEnv } from "../../../../../components/Endpoints";
import TableContainer from "../../../../../components/TableContainer";
import Textfield from "../../../../../components/TextField";

export default function PendingKYC({
    modals, setToken,
    setActiveDashboard,
    setActiveState,
    entryValue, pageSelector,
    setActiveTab, dateRange,
    search, setSearch,
    setLoading, searchField,
    resetSearchParams,
    setView,
    viewState
}) {
    const initialCustomerForm = {
        agentId: "",
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        gender: "",
        dateCreated: "",
        city: "",
        state: "",
        lga: "",
        agentType: "",
        agentClass: "",
        aggregator: "",
        bank: "",
        accountNumber: "",
        id: ""
    }

    const [agentEdit, setCustomerEdit] = useState({ editView: false, editForm: initialCustomerForm })
    const [agentData, setAgentData] = useState()
    const [filteredData, setFilteredData] = useState()
    const [searchedField, setSearchedField] = useState()
    const [banksData, setBanksData] = useState({ codes: [], names: [] })
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    // const [searchData, setSearchData] = useState("")
    const { data: agents, error: agentsError } = useSWR(`${testEnv}v1/kyc/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const { data: dateFiltered, error: filteredError } = useSWR(`${testEnv}v1/agent/filter_all_by_dates?from=${formatDate(dateRange.dateFrom)}&pageNo=${entryValue.page}&pageSize=${entryValue.size}&to=${formatDate(dateRange.dateTo)}`, fetching)
    const { data: searchBarData, error: searchBarDataError } = useSWR(`${testEnv}v1/kyc/search/pending_approval?pattern=${searchField}&pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const [filter, setFilter] = useState(false)
    const router = useRouter()
    const [currentData, setCurrentData] = useState()
    // const searchField = useRef()


    function formEdit(e) {
        setCustomerEdit({ ...agentEdit, editForm: { ...agentEdit.editForm, [e.target.name]: e.target.value } })
    }

    useEffect(() => {
        setActiveTab("KYC Pending approvals")
        resetSearchParams()
        setToken()
        setActiveDashboard("AgentManagement")
        setActiveState("2")
        if (agents) {
            setAgentData(agents.data.Agents)
            console.log("agents: ", agents)
        }
        if (agentsError) {
            console.log(agentsError)
        }
    }, [agents])

    useEffect(() => {
        // if(dateRange.dateTo < dateRange.dateFrom) {
        //     console.log("valid date range")
        // }
        // mutate(`${testEnv}v1/agent/filter_all_by_dates?from=${formatDate(dateRange.dateFrom)}&pageNo=${entryValue.page}&pageSize=${entryValue.size}&to=${formatDate(dateRange.dateTo)}`)
        if (dateFiltered) {
            setFilteredData(dateFiltered)
        }
        if (filteredError) {
            console.log(filteredError)
        }
    }, [dateFiltered])

    useEffect(() => {
        // if(dateRange.dateTo < dateRange.dateFrom) {
        //     console.log("valid date range")
        // }
        // mutate(`${testEnv}v1/agent/filter_all_by_dates?from=${formatDate(dateRange.dateFrom)}&pageNo=${entryValue.page}&pageSize=${entryValue.size}&to=${formatDate(dateRange.dateTo)}`)
        if (searchBarData) {
            setSearchedField(searchBarData)
        }
        if (searchBarDataError) {
            console.log(searchBarDataError)
        }
    }, [searchBarData])










    function formatDate(date) {
        var d = (date.getUTCDate() + 1).toString(),
            m = (date.getUTCMonth() + 1).toString(),
            y = date.getUTCFullYear().toString(),
            formatted = '';
        if (d.length === 1) {
            d = '0' + d;
        }
        if (m.length === 1) {
        }
        formatted = d + '-' + m + '-' + y;
        return formatted;
    }

    const dateFormatter = (stamp) => {
        const date = new Date(stamp)
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes()
    }



    return (
        <div className="w-full">
            <section className={`py-2 w-full mt-[20px] ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <section className={`min-h-[674px] w-full ${agentEdit.editView ? "hidden" : ""}  pt-4 pl-[5px]`}>
                    <TableContainer color="bg-white" pageSelector={pageSelector} entryValue={entryValue}>

                        <table className=" w-full">
                            <thead>
                                <tr className="">
                                    <th className="font-400 borde  w-[90px] text-start  text-[12px] leading-[15.62px] font-pushpennyBook">AGENT ID</th>
                                    <th className="font-400 bordr  ml-[10px]  w-[60px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">AGENT NAME</th>
                                    <th className="font-400  boder w-[60px]  text-[12px] text-start leading-[15.62px] font-pushpennyBook">AGENT CLASSIFICATION</th>
                                    <th className="font-400 borer  w-[173px] text-[12px] leading-[15.62px] text-start font-pushpennyBook">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6 ">
                                {/* {searchField == "" ?
                                    (search ? filteredData : agents)?.data.map((agent, index) => {
                                        return (
                                            <tr key={index} className=" justify-between border-b h-[63px]">
                                                <td className="font-pushpennyBook font-400 text-[14px] leading-[18px] text-start text-[#6E7883]">{agent.agentIdentifier}</td>
                                                <td className="font-pushpennyBook font-400 text-[14px] leading-[14px] text-[#6E7883]">{agent.agentName}</td>
                                                <td className="font-pushpennyBook font-400 text-[14px] leading-[14px] text-[#6E7883]">{agent.agentClass}</td>
                                                <td className="font-pushpennyBook gap-[5px] w-[175px] flex h-[63px] items-center items-start">                                                   
                                                    <div className="w-[88px] h-[36px]">
                                                        <UserButton type="view" text="View" onClick={() => {
                                                            localStorage.setItem('id', agent.id)
                                                            setLoading(true)
                                                            router.push(`/dashboard/agency/agent-management/agents/agent`)
                                                        }}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }) :
                                    searchBarData?.data.map((agent, index) => {
                                        return (
                                            <tr key={index} className=" justify-between border-b h-[63px]">
                                                <td className="font-pushpennyBook font-400 text-[14px] leading-[18px] text-start text-[#6E7883]">{agent.agentIdentifier}</td>
                                                <td className="font-pushpennyBook font-400 text-[14px] leading-[14px] text-[#6E7883]">{agent.agentName}</td>
                                                <td className="font-pushpennyBook font-400 text-[14px] leading-[14px] text-[#6E7883]">{agent.agentClass}</td>
                                                <td className="font-pushpennyBook gap-[5px] w-[175px] flex h-[63px] items-center items-start">                                                   
                                                    <div className="w-[88px] h-[36px]">
                                                        <UserButton type="view" text="View" onClick={() => {
                                                            localStorage.setItem('id', agent.id)
                                                            setLoading(true)
                                                            router.push(`/dashboard/agency/agent-management/agents/agent`)
                                                        }}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                } */}
                                {
                                    agentData?.map((agent, index) => {
                                        return (
                                            <tr key={index} className=" justify-between border-b h-[63px]">
                                                <td className="font-pushpennyBook font-400 text-[14px] leading-[18px] text-start text-[#6E7883]">{agent.agentId}</td>
                                                <td className="font-pushpennyBook font-400 text-[14px] leading-[14px] text-[#6E7883]">{agent.agentName}</td>
                                                <td className="font-pushpennyBook font-400 text-[14px] leading-[14px] text-[#6E7883]">{agent.agentClassification}</td>
                                                <td className="font-pushpennyBook gap-[5px] w-[175px] flex h-[63px] items-center items-start">
                                                    <div className="w-[88px] h-[36px]">
                                                        <UserButton type="view" text="View" onClick={() => {
                                                            localStorage.setItem('id', "45")
                                                            setLoading(true)
                                                            router.push(`/dashboard/agency/agent-management/agents/agent`)
                                                        }}
                                                        />
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
            </section>
        </div>
    )
}

PendingKYC.Layout = MetricLayoutTemplate