
import MetricLayoutTemplate from "../../../../../components/MetricLayoutTemplate";
// import ImageHolder from "../../../../components/ImageHolder";
// import UserButton from "../../../../../components/ButtonMaker";
import { useEffect, useState, useRef } from "react";
import useSWR, { mutate } from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import base, { ngrok, testEnv } from "../../../../../components/Endpoints";
import TableContainer from "../../../../../components/TableContainer";
import Textfield from "../../../../../components/TextField";
import jwt from "jsonwebtoken";
import { Fragment } from "react";
import UserButton from "../../../../../components/ButtonMaker";
import { Box, Modal, CircularProgress } from "@mui/material";




const industries = [
    "Select an Industry",
    "Technology",
    "Agriculture",
    "Finance",
]

const workLocation = [
    "Select a location of work",
    "REMOTE",
    "HYBRID",
    "ON-SITE"
]

const workType = [
    "Select work type",
    "FULL TIME",
    "PART TIME"
]

const companyTypes = [
    "Select a Company Type",
    "SME",
    "MULTINATIONAL",
    "NGO",
    "GOVERNMENT AGENCY"
]

export default function OpenRoles({
    setToken,
    setActiveDashboard,
    setActiveState,
    entryValue,
    setActiveTab,
    resetSearchParams,
    initialCustomerForm, resetDay, pageSelector, searchField,
    search
}) {

    const initialFormDetails = {
        slots: "",
        roles: "",
        tasks: "",
        qualifications: "",
        skills: "",
        mentor: "",
        workType: "",
        workLocation: "",
        country: "",
        state: "",
        lga: "",
        resources: "",
        opportunities: "",
        duration: "",
        stipend: "",
        amount: "",
        employment: "",
        extension: "",
        guidelines: "",
        policies: "",
        inclusion: "",
    };


    const [userDetails, setUserDetails] = useState({})
    const [searchedField, setSearchedField] = useState()
    const [agentEdit, setCustomerEdit] = useState({ editView: false, editForm: initialCustomerForm })
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data).catch(error => console.log(error))
    const { data: positions, error: positionsError } = useSWR(`${base}api/internship-positions/employer/${userDetails.id}`, fetching)
    const [formDetails, setFormDetails] = useState(initialFormDetails)
    const [mentors, setMentors] = useState({ num: 0, list: [] })
    const [roles, setRoles] = useState([])
    const [geolocation, setGeoLocation] = useState({ longitude: "", latitude: "" })
    const [editModal, setEditModal] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [lgas, setLgas] = useState(["CHOOSE A STATE TO SELECT LGA"])

    useEffect(() => {
        setActiveTab("Open Positions")
        // setLoading(false)
        setToken()
        setActiveDashboard("Recruitment/Onboarding")
        setActiveState("0")
        setUserDetails(JSON.parse(localStorage.getItem("userDetails")))
    }, [])

    // useEffect(() => {
    //     async function fetchLgas() {
    //         const state = toSentenceCase(formDetails.state)
    //         const lgasResponse = await axios.get(`https://nga-states-lga.onrender.com/?state=${state}`)
    //         const newLgas = [...lgasResponse.data].map((lga) => {
    //             lga = lga.toUpperCase()
    //             return lga
    //         })
    //         newLgas.unshift("SELECT LGA")
    //         // const states = newStates
    //         setLgas(newLgas)
    //     }

    //     if (formDetails.state == "") {
    //         // setLgas()
    //         return
    //     }

    //     fetchLgas()
    // }, [formDetails.state])

    useEffect(() => {
        if (positions) {
            console.log("positions: ", positions)
        }
    }, [positions])


    function handleFormChange(e) {
        const { name, value } = e.target
        setFormDetails(currentDetails => ({
            ...currentDetails,
            [name]: value
        }))
    }

    function stringToArrayByComma(str) {
        if (!str.includes(',')) {
            throw new Error("Please put a comma after each item")
        }
        return str.split(',').map(item => item.trim())
    }

    function submitForm(e) {
        e.preventDefault()
        // Add form submission logic here
    }








    const url = {
        update: `${testEnv}v1/agent/${agentEdit.editForm.id}/update`,
        add: `${testEnv}v1/agent/add_agent`
    }

    useEffect(() => {
        resetSearchParams()
        resetDay()
    }, [])







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



    function dateFormatter(stamp) {
        const date = new Date(stamp)
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes()
    }



    return (
        <div className="w-full">
            <section className={`py-2 w-full mt-[20px]`}>
                <section className={`min-h-[674px] w-full ${agentEdit.editView ? "hidden" : ""}  pt-4 pl-[5px]`}>
                    <TableContainer pageSelector={pageSelector} entryValue={entryValue}>

                        <table className=" w-full">
                            <thead>
                                <tr className="">
                                    <th className="font-400 borde  w-[90px] text-start  text-[12px] leading-[15.62px] font-pushpennyBook">ROLE ID</th>
                                    <th className="font-400 bordr  ml-[10px]   w-[120px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">ROLE NAME</th>
                                    <th className="font-400  boder w-[100px] text-[12px] text-start leading-[15.62px] font-pushpennyBook">OPEN SLOTS</th>
                                    <th className="font-400 boder  w-[100px] text-[12px] text-start leading-[15.62px] font-pushpennyBook">STIPEND</th>
                                    <th className="font-400 brder  w-[120px] text-[12px] text-start leading-[15.62px] font-pushpennyBook">EXTENSION</th>
                                    <th className="font-400 order  w-[80px] break-words text-[12px] text-start leading-[15.62px] font-pushpennyBook">RETENTION</th>
                                    <th className="font-400 borer  w-[173px] text-[12px] leading-[15.62px] text-start font-pushpennyBook">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6 ">
                                {searchField == "" ?
                                    (search ? filteredData : positions)?.map((position, index) => {
                                        return (
                                            <tr key={index} className="relative border-b border-[#2dcd7c] h-[50px]">
                                                <td className="font-pushpennyBook  w-[95px]  font-400 text-[14px] leading-[18px] text-start text-[#6E7883]">{position.id}</td>
                                                <td className="font-pushpennyBook  w-[120px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{position.department}</td>
                                                <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{position.numberOfSlot}</td>
                                                <td className="font-pushpennyBook  w-[120px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{position.additionalStipend || "n/a"}</td>

                                                <td className="font-pushpennyBook  w-[75px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{position.possibilityOfExtendingDuration || "n/a"}</td>
                                                <td className="font-pushpennyBook  w-[75px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{position.possibilityOfRetaining || "n/a"}</td>
                                                <td className="font-pushpennyBook gap-[5px] borde w-[175px] flex  items-start">
                                                    <div className="borde mt-[5px] w-[80px] h-[36px]">
                                                        <UserButton onClick={() => {
                                                            // setView(true)

                                                        }} type="edit" />
                                                    </div>
                                                    <div className="w-[88px] mt-[5px] h-[36px]">
                                                        <UserButton type="view" text="View" onClick={() => {
                                                            // localStorage.setItem('id', agent.id)
                                                            // setLoading(true)
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

                {/* <section className={`${agentEdit.editView ? "flex" : "hidden"} flex-col gap-[10px]`}>
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
                </section> */}
            </section>
            <Modal
                open={editModal}
                onClose={close}
            >
                <Box component={"div"} className="w-fit absolute translate-x-[-50%] top-[100px] left-[50%]">
                    <form
                        className="flex borde flex-col items-center pb-[50px]"
                        onSubmit={submitForm}
                    >
                        {/* Internship Positions Section */}
                        <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-full md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
                            <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">
                                INTERNSHIP POSITIONS
                            </h2>
                            <div className="flex flex-col gap-[5px]">
                                <input
                                    required
                                    onChange={handleFormChange}
                                    value={formDetails.slots}
                                    name="slots"
                                    className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]"
                                    type="number"
                                    placeholder="How many slots are available?"
                                />
                                <input
                                    required
                                    onChange={handleFormChange}
                                    value={formDetails.roles}
                                    name="roles"
                                    className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]"
                                    type="text"
                                    placeholder="Enter role title"
                                />
                                <textarea
                                    required
                                    onChange={handleFormChange}
                                    value={formDetails.tasks}
                                    name="tasks"
                                    className="pl-[10px] h-[100px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]"
                                    type="text"
                                    placeholder="Enter role description"
                                />

                                <select
                                    required
                                    onChange={(e) => handleFormChange(e)}
                                    value={formDetails.qualifications}
                                    name="qualifications"
                                    className="pl-[5px] outline-none text-[10px] font-[600] md:text-[13px] border border-[lightgreen] py-[5px] rounded-[10px]"
                                >
                                    {["SELECT MINIMUM EDUCATIONAL QUALIFICATION FOR THIS ROLE", "Primary School", "Secondary School", "Technical College/Diploma", `Bachelor's Degree`].map(
                                        (item, index) => {
                                            if (index === 0) {
                                                // The first item is the placeholder and should be disabled
                                                return (
                                                    <option key={item} value="" disabled selected>
                                                        {item}
                                                    </option>
                                                );
                                            }
                                            return (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                                <input
                                    required
                                    onChange={handleFormChange}
                                    value={formDetails.skills}
                                    name="skills"
                                    className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]"
                                    type="text"
                                    placeholder="Enter required skills separated by commas"
                                />
                            </div>
                        </div>

                        {/* Work Environment Section */}
                        <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-full md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
                            <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">
                                WORK ENVIRONMENT
                            </h2>
                            <div className="flex flex-col gap-[5px]">
                                <select
                                    required
                                    onChange={handleFormChange}
                                    name="workType"
                                    value={formDetails.workType}
                                    className="pl-[5px] outline-none border border-[lightgreen] py-[5px] rounded-[10px]"
                                >
                                    {workType.map((item, index) => (
                                        <option
                                            key={item}
                                            value={index === 0 ? "" : item}
                                            disabled={index === 0}
                                        >
                                            {item}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    required
                                    onChange={handleFormChange}
                                    value={formDetails.workLocation}
                                    name="workLocation"
                                    className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]"
                                    type="text"
                                    placeholder="Enter the work location address"
                                />
                                
                                <select
                                    required
                                    onChange={(e) => handleFormChange(e)}
                                    value={formDetails.state}
                                    name="state"
                                    className="pl-[5px] outline-none text-[10px] font-[600] md:text-[13px] border border-[lightgreen] py-[5px] rounded-[10px]"
                                >
                                    {["SELECT STATE", "Abia", "Akwa Ibom", "Bayelsa", "Cross River", "Delta", "Edo", "Imo", "Ondo", "Rivers"].map(
                                        (item, index) => {
                                            if (index === 0) {
                                                return (
                                                    <option key={item} value="" disabled selected>
                                                        {item}
                                                    </option>
                                                );
                                            }
                                            return (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                                <select
                                    required
                                    onChange={(e) => handleFormChange(e)}
                                    value={formDetails.lga}
                                    name="lga"
                                    className="pl-[5px] outline-none text-[10px] font-[600] md:text-[13px] border border-[lightgreen] py-[5px] rounded-[10px]"
                                >
                                    {lgas.map(
                                        (item, index) => {
                                            if (index === 0) {
                                                return (
                                                    <option key={item} value="" disabled selected>
                                                        {item}
                                                    </option>
                                                );
                                            }
                                            return (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                                <label htmlFor="resources">
                                    What are the available resources to support the intern's work
                                </label>
                                <input
                                    required
                                    onChange={handleFormChange}
                                    value={formDetails.resources}
                                    name="resources"
                                    className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]"
                                    type="text"
                                    placeholder="Enter resources separated by commas"
                                />
                                <label htmlFor="opportunities">
                                    What are the available opportunities for intern's professional
                                    development
                                </label>
                                <input
                                    required
                                    onChange={handleFormChange}
                                    value={formDetails.opportunities}
                                    name="opportunities"
                                    className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]"
                                    type="text"
                                    placeholder="Enter opportunities separated by commas"
                                />
                            </div>
                        </div>

                        {/* Add more sections here (Duration and Stipend, Mentorship and Supervision, etc.) */}

                        <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-full md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
                            <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">
                                DURATION AND STIPEND
                            </h2>
                            <div className="flex flex-col gap-[5px]">
                                <select
                                    required
                                    onChange={(e) => handleFormChange(e)}
                                    name="duration"
                                    value={formDetails.duration}
                                    className="pl-[5px] outline-none text-[10px] font-[600] md:text-[13px] border border-[lightgreen] py-[5px] rounded-[10px]"
                                >
                                    {["DO YOU CONFIRM THIS A 12 MONTH INTERNSHIP?", "NO", "YES"].map(
                                        (item, index) => {
                                            if (index === 0) {
                                                // The first item is the placeholder and should be disabled
                                                return (
                                                    <option key={item} value="" disabled selected>
                                                        {item}
                                                    </option>
                                                );
                                            }
                                            return (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                                <select
                                    required
                                    onChange={(e) => handleFormChange(e)}
                                    name="extension"
                                    value={formDetails.extension}
                                    className="pl-[5px] outline-none border text-[10px] font-[600] md:text-[13px] border-[lightgreen] py-[5px] rounded-[10px]"
                                >
                                    {["IS AN EXTENSION AVAILABLE AFTER DURATION?", "NO", "YES"].map(
                                        (item, index) => {
                                            if (index === 0) {
                                                // The first item is the placeholder and should be disabled
                                                return (
                                                    <option key={item} value="" disabled selected>
                                                        {item}
                                                    </option>
                                                );
                                            }
                                            return (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                                <select
                                    required
                                    onChange={(e) => handleFormChange(e)}
                                    name="stipend"
                                    value={formDetails.stipend}
                                    className="pl-[5px] outline-none text-[10px] font-[600] md:text-[13px] border border-[lightgreen] py-[5px] rounded-[10px]"
                                >
                                    {["WILL AN ADDITIONAL STIPEND BE PAID?", "NO", "YES"].map(
                                        (item, index) => {
                                            if (index === 0) {
                                                // The first item is the placeholder and should be disabled
                                                return (
                                                    <option key={item} value="" disabled selected>
                                                        {item}
                                                    </option>
                                                );
                                            }
                                            return (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                                {formDetails.stipend === "YES" && (
                                    <input
                                        required
                                        onChange={(e) => {
                                            handleFormChange(e);
                                        }}
                                        value={formDetails.amount}
                                        name="amount"
                                        className={`pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]`}
                                        type="number"
                                        placeholder="How much will you be paying"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-full md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
                            <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">
                                EMPLOYMENT OPPORTUNITIES
                            </h2>
                            <div className="flex flex-col gap-[5px]">
                                <select
                                    required
                                    onChange={(e) => handleFormChange(e)}
                                    name="employment"
                                    value={formDetails.employment}
                                    className="pl-[5px] text-[10px] font-[600] md:text-[13px] outline-none border border-[lightgreen] py-[5px] rounded-[10px]"
                                >
                                    {["IS EMPLOYMENT AVAILABLE AFTER INTERNSHIP?", "NO", "YES"].map(
                                        (item, index) => {
                                            if (index === 0) {
                                                // The first item is the placeholder and should be disabled
                                                return (
                                                    <option key={item} value="" disabled selected>
                                                        {item}
                                                    </option>
                                                );
                                            }
                                            return (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-full md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
                            <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">
                                COMPLIANCE AND LEGAL
                            </h2>
                            <div className="flex flex-col gap-[5px]">
                                <select
                                    required
                                    onChange={(e) => handleFormChange(e)}
                                    name="guidelines"
                                    value={formDetails.guidelines}
                                    className="pl-[5px] text-[10px] font-[600] md:text-[13px] outline-none border border-[lightgreen] py-[5px] rounded-[10px]"
                                >
                                    {[
                                        "DO YOU AGREE TO COMPLY WITH THE NDDC INTERNSHIP GUIDELINES?",
                                        "NO",
                                        "YES",
                                    ].map((item, index) => {
                                        if (index === 0) {
                                            // The first item is the placeholder and should be disabled
                                            return (
                                                <option key={item} value="" disabled selected>
                                                    {item}
                                                </option>
                                            );
                                        }
                                        return (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        );
                                    })}
                                </select>
                                <select
                                    required
                                    onChange={(e) => handleFormChange(e)}
                                    name="policies"
                                    value={formDetails.policies}
                                    className="pl-[5px] text-[10px] font-[600] md:text-[13px] outline-none border border-[lightgreen] py-[5px] rounded-[10px]"
                                >
                                    {[
                                        "DO YOU AGREE TO NDDC INCLUSIVE WORK POLICIES?",
                                        "NO",
                                        "YES",
                                    ].map((item, index) => {
                                        if (index === 0) {
                                            // The first item is the placeholder and should be disabled
                                            return (
                                                <option key={item} value="" disabled selected>
                                                    {item}
                                                </option>
                                            );
                                        }
                                        return (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        );
                                    })}
                                </select>
                                <select
                                    required
                                    onChange={(e) => handleFormChange(e)}
                                    name="inclusion"
                                    value={formDetails.inclusion}
                                    className="pl-[5px] text-[10px] font-[600] md:text-[13px] outline-none border border-[lightgreen] py-[5px] rounded-[10px]"
                                >
                                    {[
                                        "DO YOU REQUIRE AGREEMENTS/CONTRACTS FOR ONBOARDING INTERNS?",
                                        "NO",
                                        "YES",
                                    ].map((item, index) => {
                                        if (index === 0) {
                                            // The first item is the placeholder and should be disabled
                                            return (
                                                <option key={item} value="" disabled selected>
                                                    {item}
                                                </option>
                                            );
                                        }
                                        return (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>

                        <button disabled={submitting} className="border w-[120px] py-[5px] rounded-[7px] mt-[15px] bg-[#2dcd7c] active:bg-[#cfe1f0] text-white font-[600] text-[20px]">

                            {!submitting && (
                                <h2>Submit</h2>
                            )}
                            {submitting && (
                                <Box component={"h2"} sx={{ color: "white" }}>
                                    <CircularProgress size="20px" color="inherit" />
                                </Box>
                            )}
                        </button>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

OpenRoles.Layout = MetricLayoutTemplate