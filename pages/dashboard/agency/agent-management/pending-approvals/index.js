
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
    viewState,
    createView,
    changeCreateView
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
    const { data: dateFiltered, error: filteredError } = useSWR(`${testEnv}v1/external/agent/filter_all_by_dates?from=${formatDate(dateRange.dateFrom)}&pageNo=${entryValue.page}&pageSize=${entryValue.size}&to=${formatDate(dateRange.dateTo)}`, fetching)
    const { data: searchBarData, error: searchBarDataError } = useSWR(`${testEnv}v1/kyc/search/pending_approval?pattern=${searchField}&pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const [filter, setFilter] = useState(false)
    const router = useRouter()
    const [currentData, setCurrentData] = useState()
    // const searchField = useRef()


    function formEdit(e) {
        setCustomerEdit({ ...agentEdit, editForm: { ...agentEdit.editForm, [e.target.name]: e.target.value } })
    }

    function editAgent() {
        let bank = banksData.names.findIndex(bank => bank == agentEdit.editForm.bank)
        debugger
        // setLoading(true)
        axios.put(`${testEnv}v1/agent/${agentEdit.editForm.id}/update`,
            {
                "agentIdentifier": agentEdit.editForm.agentId,
                "userName": agentEdit.editForm.userName,
                "firstName": agentEdit.editForm.firstName,
                "lastName": agentEdit.editForm.lastName,
                "email": agentEdit.editForm.email,
                "phoneNumber": agentEdit.editForm.phone,
                "address": agentEdit.editForm.address,
                "gender": agentEdit.editForm.gender,
                "city": agentEdit.editForm.city,
                "state": agentEdit.editForm.state,
                "lga": agentEdit.editForm.lga,
                "agentType": agentEdit.editForm.agentType,
                "classification": agentEdit.editForm.agentClass,
                // "aggregator": "",
                "bankInstitutionCode": banksData.codes[Number(bank)],
                "bankAccountNumber": agentEdit.editForm.accountNumber
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
            .then(response => {
                debugger
                console.log(response.data)
                setLoading(false)
                setCustomerEdit({ ...agentEdit, editView: false })
            })
            .catch(error => {
                debugger
                console.log(error)
                setLoading(false)
                setCustomerEdit({ ...agentEdit, editView: false })
            })
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
        if (createView) {
            setCustomerEdit({ editView: true, editForm: initialCustomerForm })
        }
    }, [createView])

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
                                                            localStorage.setItem('id', `${agent.agentId}`) //45
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

            <section className={`${agentEdit.editView ? "flex" : "hidden"} flex-col gap-[10px]`}>
                <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                    <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">Edit Agent Details</h2>
                </div>
                <form className=" flex flex-col lg:flex-row w-full gap-[20px] lg:gap-[9%] overflow-x-auto bg-[#FBF4EB] py-4 rounded-[10px]">
                    <section className="w-full lg:w-[45%] flex flex-col gap-[20px]">
                        <div className="w-full h-[57px] rounded-[28px]">
                            <Textfield type={createView ? "text" : "readonly"} formEdit={formEdit} title="Agent ID" value={agentEdit.editForm.agentId} name="agentId" bg="bg-[white]" />
                        </div>
                        <div className="w-full h-[57px] rounded-[28px]">
                            <Textfield formEdit={formEdit} title="Username" value={agentEdit.editForm.userName} name="userName" bg="bg-[white]" />
                        </div>
                        <div className="w-full h-[57px] rounded-[28px]">
                            <Textfield important={true} formEdit={formEdit} title="First Name" value={agentEdit.editForm.firstName} name="firstName" bg="bg-[white]" />
                        </div>
                        <div className="w-full h-[57px] rounded-[28px]">
                            <Textfield formEdit={formEdit} title="Last Name" value={agentEdit.editForm.lastName} name="lastName" bg="bg-[white]" />
                        </div>
                        <div className="w-full h-[57px] rounded-[28px]">
                            <Textfield formEdit={formEdit} title="Middle Name" value={agentEdit.editForm.middleName} name="middleName" bg="bg-[white]" />
                        </div>
                        <div className="w-full h-[57px] rounded-[28px]">
                            <Textfield formEdit={formEdit} charType="date" title="Date of birth" value={agentEdit.editForm.dob} name="dob" bg="bg-[white]" />
                        </div>
                        <div className="w-full h-[57px] rounded-[28px]">
                            <Textfield formEdit={formEdit} title="Email address" value={agentEdit.editForm.email} name="email" bg="bg-[white]" />
                        </div>
                        <div className="w-full h-[57px] rounded-[28px]">
                            <Textfield formEdit={formEdit} title="Phone Number" value={agentEdit.editForm.phone} name="phone" bg="bg-[white]" />
                        </div>
                        <div className="w-full h-[57px] rounded-[28px]">
                            <Textfield formEdit={formEdit} title="Address" value={agentEdit.editForm.address} name="address" bg="bg-[white]" />
                        </div>
                        <div className="w-full h-[57px] rounded-[28px]">
                            <Textfield formEdit={formEdit} title="City" value={agentEdit.editForm.city} name="city" bg="bg-[white]" />
                        </div>




                    </section>
                    <section className="w-full lg:w-[45%] flex flex-col gap-[20px] lg:justify-between">
                        <section className="flex gap-[15px] flex-col">
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield formEdit={formEdit} title="State" value={agentEdit.editForm.state} name="state" bg="bg-[white]" />
                            </div>
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield formEdit={formEdit} title="LGA" value={agentEdit.editForm.lga} name="lga" bg="bg-[white]" />
                            </div>
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield type="select" selectOptions={["Choose a country", "Nigeria"]} formEdit={formEdit} title="Country" value={agentEdit.editForm.country} name="country" bg="bg-[white]" />
                            </div>
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield type="select" selectOptions={["Choose a type", "SUPER_AGENT", "AGENT", "FARMER"]} formEdit={formEdit} title="Agent Type" value={agentEdit.editForm.agentType} name="agentType" bg="bg-[white]" />
                            </div>
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield type="select" selectOptions={["Choose a gender", "Male", "Female"]} formEdit={formEdit} title="Gender" value={agentEdit.editForm.gender} name="gender" bg="bg-[white]" />
                            </div>
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield type="select" selectOptions={["Choose a class", "INDIVIDUAL", "BUSINESS"]} formEdit={formEdit} title="Agent Classification" value={agentEdit.editForm.agentClass} name="agentClass" bg="bg-[white]" />
                            </div>
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield type="select" selectOptions={banksData.names} formEdit={formEdit} title="Bank" value={agentEdit.editForm.bank} name="bank" bg="bg-[white]" />
                            </div>
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield formEdit={formEdit} title="Account Number" value={agentEdit.editForm.accountNumber} name="accountNumber" bg="bg-[white]" />
                            </div>
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield formEdit={formEdit} title="BVN" value={agentEdit.editForm.bvn} name="bvn" bg="bg-[white]" />
                            </div>


                        </section>
                        <div className="w-full flex flex-col gap-[20px] lg:gap-0 md:flex-row md:justify-around h-fit rounded-[28px]">
                            <div className="w-full md:w-[164px] h-[46px] rounded-inherit">
                                <UserButton type="" text="Cancel" bg="bg-[#DDDDDD]" onClick={(e) => {
                                    e.preventDefault()
                                    changeCreateView(false)
                                    setView(false)
                                    setCustomerEdit({ ...agentEdit, editView: false, editForm: initialCustomerForm })
                                }} />
                            </div>
                            <div className="w-full md:w-[164px] h-[46px] rounded-inherit">
                                <UserButton submit={"submit"} onClick={editAgent} type="gradient" text="Save" />
                            </div>
                        </div>
                    </section>
                </form>
            </section>
        </div>
    )
}

PendingKYC.Layout = MetricLayoutTemplate