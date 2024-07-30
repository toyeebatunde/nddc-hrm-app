
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
import jwt from "jsonwebtoken";

export default function Agents({
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
    changeCreateView,
    initialCustomerForm,
    day, resetDay, rangeParam,
    agentFormAction,
    handleCurrentData
}) {
    const [agentEdit, setCustomerEdit] = useState({ editView: false, editForm: initialCustomerForm })
    const [agentData, setAgentData] = useState()
    const [filteredData, setFilteredData] = useState()
    const [searchedField, setSearchedField] = useState()
    const [banksData, setBanksData] = useState({ codes: [], names: [] })
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data).catch(error => console.log(error))
    const { data: agents, error: agentsError } = useSWR(`${testEnv}v1/agent/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const { data: dateFiltered, error: filteredError } = useSWR(`${testEnv}v1/agent/filter_all_by_dates?from=${formatDate(dateRange.dateFrom)}&pageNo=${entryValue.page}&pageSize=${entryValue.size}&to=${formatDate(dateRange.dateTo)}`, fetching)
    const { data: dayFiltered, error: dayFilteredError } = useSWR(`${testEnv}v1/agent/filter_all_by_days?days=${day}&pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const { data: banks, error: banksError } = useSWR(`${testEnv}v1/institution/all?pageNo=0&pageSize=100`, fetching)
    const { data: searchBarData, error: searchBarDataError } = useSWR(`${testEnv}v1/agent/search/all?pattern=${searchField}&pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const [filter, setFilter] = useState(false)
    const router = useRouter()
    const [currentData, setCurrentData] = useState()
    const [headers, setHeaders] = useState()
    const [totalPages, setTotalPages] = useState(0)

    const url = {
        update: `${testEnv}v1/agent/${agentEdit.editForm.id}/update`,
        add: `${testEnv}v1/agent/add_agent`
    }


    function formEdit(e) {
        setCustomerEdit({ ...agentEdit, editForm: { ...agentEdit.editForm, [e.target.name]: e.target.value } })
    }

    useEffect(() => {
        resetSearchParams()
        resetDay()
    }, [])

    useEffect(() => {
        setActiveTab("Agents")
        setLoading(true)
        setToken()
        setActiveDashboard("AgentManagement")
        setActiveState("2")

        // const timeout = setTimeout(() => {
        //     if (!agents) {
        //         setLoading(false);
        //         window.alert("Something went wrong, loading is taking longer than usual. Please refresh page")
        //     }
        // }, 10000); // 5 seconds


        if (agents) {
            setLoading(false)
            setAgentData(agents)
            const newCurrentData = agents.data.map((agent) => {
                return {
                    id: agent.agentIdentifier,
                    userName: agent.userName,
                    type: agent.agentType,
                    name: agent.firstName + " " + agent.lastName,
                    phone: agent.phoneNumber,
                    status: agent.status,
                    active: agent.needSetup,
                    created: dateFormatter(agent.dateCreated),
                    state: agent.state,
                    lga: agent.lga
                }
            })
            const newHeaders = [
                { label: "Agent ID", key: "id" },
                { label: "Agent Username", key: "userName" },
                { label: "Account Type", key: "type" },
                { label: "Full Name", key: "name" },
                { label: "Phone Number", key: "phone" },
                { label: "Account Status", key: "status" },
                { label: "Activity", key: "active" },
                { label: "Date Created", key: "created" },
                { label: "State of Origin", key: "state" },
                { label: "Local Govt", key: "lga" },
            ]
            // debugger
            setCurrentData(newCurrentData)
            handleCurrentData(newCurrentData, newHeaders)
        }
        if (agentsError) {
            setLoading(false)
            console.log(agentsError)
        }
    }, [agents])

    useEffect(() => {
        let newSearch
        if (rangeParam == "date") {
            axios.get(`${testEnv}v1/agent/filter_all_by_days?days=${day}&pageNo=${entryValue.page}&pageSize=${entryValue.size}`,
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
                .then(res => {
                    // debugger
                    setSearchedField(res.data)
                    newSearch = res.data
                    console.log(newSearch)
                    setFilteredData(res.data)
                }
                )
        }
    }, [day, entryValue])

    useEffect(() => {
        mutate(`${testEnv}v1/agent/filter_all_by_dates?from=${formatDate(dateRange.dateFrom)}&pageNo=${entryValue.page}&pageSize=${entryValue.size}&to=${formatDate(dateRange.dateTo)}`)
        if (dateFiltered && (rangeParam == "")) {
            setFilteredData(dateFiltered)
        }
        if (filteredError) {
            console.log(filteredError)
        }
    }, [dateFiltered, entryValue])



    useEffect(() => {
        if (createView) {
            setCustomerEdit({ editView: true, editForm: initialCustomerForm })
        }
    }, [createView])

    useEffect(() => {
        console.log("searched")
        mutate(`${testEnv}v1/agent/search/all?pattern=${searchField}&pageNo=${entryValue.page}&pageSize=${entryValue.size}`)
        setLoading(false)
        if (searchBarData) {
            // setSearchedField(searchBarData)
            // setLoading(false)
            console.log("updated based on search")
        }
        if (searchBarDataError) {
            setLoading(false)
            console.log(searchBarDataError)
        }
    }, [searchField, entryValue])


    useEffect(() => {
        // if(dateRange.dateTo < dateRange.dateFrom) {
        //     console.log("valid date range")
        // }
        mutate(`${testEnv}v1/institution/all?pageNo=0&pageSize=15`)
        if (banks) {
            let bankCodes = ["Bank Codes"]
            let bankNames = ["Choose a Bank"]
            banks.data.map((bank, index) => {
                bankCodes.push(bank.institutionCode)
                bankNames.push(bank.institutionName)
                return
            })

            setBanksData({ ...banksData, codes: bankCodes, names: bankNames })
        }
        if (banksError) {
            console.log(banksError)
        }
    }, [banks])

    function editAgent() {
        const formattedDob = agentEdit.editForm.dob.split("-").reverse().join('-')
        console.log(formattedDob)
        let bank = banksData.names.findIndex(bank => bank == agentEdit.editForm.bank)
        let createBody = {
            "address": agentEdit.editForm.address,
            "agentType": agentEdit.editForm.agentType,
            "bvn": agentEdit.editForm.bvn,
            "city": agentEdit.editForm.city,
            "country": agentEdit.editForm.bvn,
            "dob": formattedDob,
            "email": agentEdit.editForm.email,
            "firstName": agentEdit.editForm.firstName,
            "fullName": agentEdit.editForm.firstName + " " + agentEdit.editForm.lastName,
            "gender": agentEdit.editForm.gender,
            "classification": agentEdit.editForm.agentClass,
            "lastName": agentEdit.editForm.lastName,
            "lga": agentEdit.editForm.lga,
            "middleName": agentEdit.editForm.middleName,
            "phoneNumber": `+234${agentEdit.editForm.phone.toString().slice(1)}`, // +234${agentEdit.editForm.phone.toString().slice(1)}
            "state": agentEdit.editForm.state,
            "userName": `+234${agentEdit.editForm.phone.toString().slice(1)}`,
        }
        let editBody = {
            "agentIdentifier": agentEdit.editForm.agentId,
            "userName": agentEdit.editForm.userName,
            "firstName": agentEdit.editForm.firstName,
            "lastName": agentEdit.editForm.lastName,
            "fullName": agentEdit.editForm.firstName + " " + agentEdit.editForm.lastName,
            "middleName": agentEdit.editForm.middleName,
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
            "bankAccountNumber": agentEdit.editForm.accountNumber,
            "bvn": agentEdit.editForm.bvn,
            "country": agentEdit.editForm.bvn,
            "dob": formattedDob
        }
        debugger
        setLoading(true)
        (agentFormAction == "update" ? axios.put(`${testEnv}v1/agent/${agentEdit.editForm.id}/update`,
            editBody,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        ) : axios.post(`${testEnv}v1/agent/add_agent`,
            createBody,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        ))
            .then(response => {
                // debugger
                console.log(response.data)
                setLoading(false)
                // setCustomerEdit({ ...agentEdit, editView: false })
                changeCreateView(false)
                setView(false)
                setCustomerEdit({ ...agentEdit, editView: false, editForm: initialCustomerForm })
            })
            .catch(error => {
                // debugger
                console.log("error response: ", error.response.data.data)
                setLoading(false)
                // setCustomerEdit({ ...agentEdit, editView: false })
                changeCreateView(false)
                setView(false)
                setCustomerEdit({ ...agentEdit, editView: false, editForm: initialCustomerForm })
            })
    }

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

    function editInfo(agentIdentifier, userName, fName, lName, email, phone, address, gender, city, state, lga, agentType, agentClass, bank, accountNumber, id) {
        setCustomerEdit({
            ...agentEdit,
            editView: true,
            editForm: {
                agentId: agentIdentifier,
                userName: userName,
                firstName: fName,
                lastName: lName,
                email: email,
                phone: phone,
                address: address,
                gender: gender,
                city: city,
                state: state,
                lga: lga,
                agentType: agentType,
                agentClass: agentClass,
                aggregator: "",
                bank: bank,
                accountNumber: accountNumber,
                id: id
            }

        })
    }


    function dateFormatter(stamp) {
        const date = new Date(stamp)
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes()
    }



    return (
        <div className="w-full">
            <section className={`py-2 w-full mt-[20px] ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <section className={`min-h-[674px] w-full ${agentEdit.editView ? "hidden" : ""}  pt-4 pl-[5px]`}>
                    <TableContainer pageSelector={pageSelector} entryValue={entryValue}>
                        <table className=" w-full">
                            <thead>
                                <tr className="">
                                    <th className="font-400 borde  w-[90px] text-start  text-[12px] leading-[15.62px] font-pushpennyBook">AGENT ID</th>
                                    <th className="font-400 bordr  ml-[10px]   w-[120px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">USERNAME</th>
                                    <th className="font-400  boder w-[100px] text-[12px] text-start leading-[15.62px] font-pushpennyBook">TYPE</th>
                                    <th className="font-400 boder  w-[100px] text-[12px] text-start leading-[15.62px] font-pushpennyBook">NAME F/L</th>
                                    <th className="font-400 brder  w-[120px] text-[12px] text-start leading-[15.62px] font-pushpennyBook">PHONE NUMBER</th>
                                    <th className="font-400 order  w-[80px] break-words text-[12px] text-start leading-[15.62px] font-pushpennyBook">STATUS/ ACTIVITIES</th>
                                    <th className="font-400 borer  w-[75px] text-[12px] leading-[15.62px] text-start font-pushpennyBook">CREATED ON</th>
                                    <th className="font-40 borde  w-[75px] text-[12px] leading-[15.62px] text-start font-pushpennyBook">LAST LOGIN</th>
                                    <th className="font-400 bordr  w-[100px] text-[12px] leading-[15.62px] text-start font-pushpennyBook">STATE/LGA</th>
                                    <th className="font-400 borer  w-[173px] text-[12px] leading-[15.62px] text-start font-pushpennyBook">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6 ">
                                {searchField == "" ?
                                    (search ? filteredData : agentData)?.data.map((agent, index) => {
                                        return (
                                            <tr key={index} className=" justify-between h-[50px]">
                                                <td className="font-pushpennyBook  w-[95px]  font-400 text-[14px] leading-[18px] text-start text-[#6E7883]">{agent.agentIdentifier}</td>
                                                <td className="font-pushpennyBook  w-[120px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{agent.userName}</td>
                                                <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{agent.agentType}</td>
                                                <td className="font-pushpennyBook   w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">

                                                    {agent.firstName} <br></br>
                                                    {agent.lastName}

                                                </td>
                                                <td className="font-pushpennyBook  w-[120px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{agent.phoneNumber}</td>
                                                <td className="font-pushpennyBook  w-[80px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">
                                                    <h2>
                                                        {agent.needSetup ? "DEACTIVATED" : "ACTIVATED"}
                                                    </h2>
                                                    <h2>
                                                        {agent.status}
                                                    </h2>

                                                </td>
                                                <td className="font-pushpennyBook  w-[75px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{dateFormatter(agent.dateCreated)}</td>
                                                <td className="font-pushpennyBook  w-[75px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{agent.lastLoginDate ? dateFormatter(agent.lastLoginDate) : "n/a"}</td>
                                                <td className="font-pushpennyBook  w-[100px] font-400 text-[14px] leading-[14px] text-[#6E7883]">
                                                    <h2>
                                                        {agent.state}
                                                    </h2>
                                                    <h2>
                                                        {agent.lga}
                                                    </h2>
                                                </td>
                                                <td className="font-pushpennyBook gap-[5px] w-[175px] flex  items-start">
                                                    <div className="w-[80px] h-[36px]">
                                                        <UserButton onClick={() => {
                                                            setView(true, "update")
                                                            editInfo(
                                                                agent.agentIdentifier,
                                                                agent.userName,
                                                                agent.firstName,
                                                                agent.lastName,
                                                                agent.email,
                                                                agent.phoneNumber,
                                                                agent.address,
                                                                agent.gender,
                                                                agent.city,
                                                                agent.state,
                                                                agent.lga,
                                                                agent.agentType,
                                                                agent.classification,
                                                                agent.bankInstitutionCode,
                                                                agent.bankAccountNumber,
                                                                agent.id
                                                            )

                                                        }} type="edit" />
                                                    </div>
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
                                            <tr key={index} className=" justify-between h-[50px]">
                                                <td className="font-pushpennyBook  w-[95px]  font-400 text-[14px] leading-[18px] text-start text-[#6E7883]">{agent.agentIdentifier}</td>
                                                <td className="font-pushpennyBook  w-[120px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{agent.userName}</td>
                                                <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{agent.agentType}</td>
                                                <td className="font-pushpennyBook   w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">

                                                    {agent.firstName} <br></br>
                                                    {agent.lastName}

                                                </td>
                                                <td className="font-pushpennyBook  w-[120px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{agent.phoneNumber}</td>
                                                <td className="font-pushpennyBook  w-[80px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">
                                                    <h2>
                                                        {agent.needSetup ? "DEACTIVATED" : "ACTIVATED"}
                                                    </h2>
                                                    <h2>
                                                        {agent.status}
                                                    </h2>

                                                </td>
                                                <td className="font-pushpennyBook  w-[75px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{dateFormatter(agent.dateCreated)}</td>
                                                <td className="font-pushpennyBook  w-[75px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{agent.lastLoginDate ? dateFormatter(agent.lastLoginDate) : "n/a"}</td>
                                                <td className="font-pushpennyBook  w-[100px] font-400 text-[14px] leading-[14px] text-[#6E7883]">
                                                    <h2>
                                                        {agent.state}
                                                    </h2>
                                                    <h2>
                                                        {agent.lga}
                                                    </h2>
                                                </td>
                                                <td className="font-pushpennyBook gap-[5px] w-[175px] flex  items-start">
                                                    <div className="w-[80px] h-[36px]">
                                                        <UserButton onClick={() => {
                                                            setView(true)
                                                            editInfo(
                                                                agent.agentIdentifier,
                                                                agent.userName,
                                                                agent.firstName,
                                                                agent.lastName,
                                                                agent.email,
                                                                agent.phoneNumber,
                                                                agent.address,
                                                                agent.gender,
                                                                agent.city,
                                                                agent.state,
                                                                agent.lga,
                                                                agent.agentType,
                                                                agent.classification,
                                                                agent.bankInstitutionCode,
                                                                agent.bankAccountNumber,
                                                                agent.id
                                                            )
                                                        }} type="edit" />
                                                    </div>
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
                                }

                            </tbody>
                        </table>

                    </TableContainer>
                </section>

                <section className={`${agentEdit.editView ? "flex" : "hidden"} flex-col gap-[10px]`}>
                    <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                        <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">{agentFormAction == "update" ? "Edit Agent Details" : "New Agent Details"} </h2>
                    </div>
                    <form className=" flex flex-col lg:flex-row w-full gap-[20px] lg:gap-[9%] overflow-x-auto bg-[#FBF4EB] py-4 rounded-[10px]">
                        <section className="w-full lg:w-[45%] flex flex-col gap-[20px]">
                            <div className={`${createView ? "hidden" : ""} w-full h-[57px] rounded-[28px]`}>
                                <Textfield type={createView ? "text" : "readonly"} formEdit={formEdit} title="Agent ID" value={agentEdit.editForm.agentId} name="agentId" bg="bg-[white]" />
                            </div>
                            <div className={`${createView ? "hidden" : ""} w-full h-[57px] rounded-[28px]`}>
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
            </section>
        </div>
    )
}

Agents.Layout = MetricLayoutTemplate