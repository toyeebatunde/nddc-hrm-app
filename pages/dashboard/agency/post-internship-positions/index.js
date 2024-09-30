
import MetricLayoutTemplate from "../../../../components/MetricLayoutTemplate";
// import ImageHolder from "../../../../components/ImageHolder";
// import UserButton from "../../../../../components/ButtonMaker";
import { useEffect, useState, useRef } from "react";
import useSWR, { mutate } from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import { ngrok, testEnv } from "../../../../components/Endpoints";
// import TableContainer from "../../../../../components/TableContainer";
// import Textfield from "../../../../../components/TextField";
// import jwt from "jsonwebtoken";
import { Fragment } from "react";





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

export default function CompanyDetails({
    setToken,
    setActiveDashboard,
    setActiveState,
    entryValue,
    setActiveTab,
    resetSearchParams,
    initialCustomerForm, resetDay
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
        state:"",
        lga:"",
        resources: "",
        opportunities: "",
        duration: "",
        stipend: "",
        amount: "",
        employment: "",
        extension: "",
        guidelines: "",
        policies: "",
        inclusion: ""
    }


    const [agentEdit, setCustomerEdit] = useState({ editView: false, editForm: initialCustomerForm })
    // const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data).catch(error => console.log(error))
    // const { data: agents, error: agentsError } = useSWR(`${testEnv}v1/external/agent/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const [formDetails, setFormDetails] = useState(initialFormDetails)
    const [mentors, setMentors] = useState({ num: 0, list: [] })
    const [roles, setRoles] = useState([])
    const [geolocation, setGeoLocation] = useState({ longitude: "", latitude: "" })


    async function submitForm(e) {
        e.preventDefault()
        const id = JSON.parse(localStorage.getItem("userDetails")).parent
        const token = localStorage.getItem("token")
        // debugger

        const roleSkills = formDetails.skills.split(",")
        const formData = {
            department: formDetails.roles,
            numberOfSlot: formDetails.slots,
            requiredQualifications: formDetails.qualifications,
            requiredSkills: roleSkills,
            tasksAndOutcomes: formDetails.tasks,
            workHours: formDetails.workType,
            workLocation: {
                address: formDetails.workLocation,
                state: formDetails.state,
                country: formDetails.country,
                lga: formDetails.lga,
                longitude: 0,
                latitude: 0
            },
            additionalStipend: formDetails.stipend == "YES" ? true : false,
            stipendAmount: formDetails.amount,
            opportunityForPD: formDetails.opportunities,
            possibilityForRetaining: formDetails.employment == "YES" ? true : false,
            possibilityOfExtendingDuration: formDetails.extension == "YES" ? true : false,
            willCompleteDuration: formDetails.duration == "YES" ? true : false

        }

        debugger

        try {
            const isLogged = await axios.post(`http://35.158.104.113:55/api/internship-positions/employer/${id}`, 
                formData,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            if (isLogged.status === 200) {
                console.log("done")
                window.alert("Your form has been submitted successfully")
                // localStorage.setItem("companyDetails", isLogged.data)
                // router.push("/dashboard/agency/post-internship-positions")
            }
        } catch (error) {
            window.alert("Something went wrong, try again")
            console.error("Form error:", error)
            // setSubmitting(false)
        } finally {
            // setSubmitting(false)
        }
    }



    function onMentorInputChange(e, position) {
        e.preventDefault()
        setMentors((currentMentors) => {
            const newMentors = { ...currentMentors }
            newMentors.list[position] = { ...newMentors.list[position], [e.target.name]: e.target.value }
            return newMentors
        })
    }

    function onRoleInputChange(e, position) {
        e.preventDefault()
        setRoles((currentRoles) => {
            const newRoles = [...currentRoles]
            newRoles[position] = { ...newRoles[position], [e.target.name]: e.target.value }
            return newRoles
        })
    }

    function addRole(e) {
        e.preventDefault()
        setRoles((currentRoles) => [
            ...currentRoles,
            {
                role: "",
                qualifications: "",
                tasks: "",
            }
        ])
    }

    function addMentor(e) {
        e.preventDefault()
        setMentors((currentMentors) => ({
            ...currentMentors,
            list: [
                ...currentMentors.list,
                {
                    name: "",
                    contact: "",
                    support: "",
                    evaluation: ""
                }
            ]
        }))
    }

    function removeMentor(e, position) {
        e.preventDefault()
        setMentors((currentMentors) => ({
            ...currentMentors,
            list: currentMentors.list.filter((_, index) => index !== position)
        }))
    }

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



    const url = {
        update: `${testEnv}v1/agent/${agentEdit.editForm.id}/update`,
        add: `${testEnv}v1/agent/add_agent`
    }

    useEffect(() => {
        resetSearchParams()
        resetDay()
    }, [])

    useEffect(() => {
        setActiveTab("Post Internship Positions")
        // setLoading(false)
        setToken()
        // setActiveDashboard("EmployeeManagement")
        setActiveState("2")
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
            <form className="flex borde flex-col items-center pb-[50px]" onSubmit={submitForm}>
                {/* Internship Positions Section */}
                <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-full md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
                    <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">INTERNSHIP POSITIONS</h2>
                    <div className="flex flex-col gap-[5px]">
                        <input onChange={handleFormChange} value={formDetails.slots} name="slots" className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]" type="number" placeholder="How many slots are available?" />
                        <input onChange={handleFormChange} value={formDetails.roles} name="roles" className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]" type="text" placeholder="Enter the name of the role" />
                        <input onChange={handleFormChange} value={formDetails.tasks} name="tasks" className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]" type="text" placeholder="Enter expected tasks for this role" />
                        <input onChange={handleFormChange} value={formDetails.qualifications} name="qualifications" className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]" type="text" placeholder="Enter qualifications for this role" />
                        <input onChange={handleFormChange} value={formDetails.skills} name="skills" className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]" type="text" placeholder="Enter required skills separated by commas" />
                        {/* <div className="flex flex-col gap-[5px]">
                            <button onClick={addRole}>Add Role +</button>
                            {roles.map((item, index) => (
                                <Fragment key={index}>
                                    <div className="flex flex-col gap-[10px] mt-[20px]">
                                        <input onChange={(e) => onRoleInputChange(e, index)} className="pl-[5px] outline-none" name="role" value={item.role} type="text" placeholder="Enter Role Name" />
                                        <input onChange={(e) => onRoleInputChange(e, index)} className="pl-[5px] outline-none" name="tasks" value={item.tasks} type="text" placeholder="Enter Tasks separatd by commas" />
                                        <input onChange={(e) => onRoleInputChange(e, index)} className="pl-[5px] outline-none" name="qualifications" value={item.qualifications} type="text" placeholder="Enter Qualifications separatd by commas" />

                                        <div className="flex gap-[5px]">
                                            <button className="border p-[5px]" onClick={() => setRoles(roles.filter((_, i) => i !== index))}>Remove Role</button>
                                        </div>
                                    </div>
                                </Fragment>
                            ))}
                        </div> */}
                    </div>
                </div>

                {/* Work Environment Section */}
                <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-full md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
                    <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">WORK ENVIRONMENT</h2>
                    <div className="flex flex-col gap-[5px]">
                        <select onChange={handleFormChange} name="workType" value={formDetails.workType} className="pl-[5px] outline-none border border-[lightgreen] py-[5px] rounded-[10px]">
                            {workType.map((item, index) => (
                                <option key={item} value={index === 0 ? "" : item} disabled={index === 0}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <input onChange={handleFormChange} value={formDetails.workLocation} name="workLocation" className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]" type="text" placeholder="Enter the work location address" />
                        <input onChange={handleFormChange} value={formDetails.country} name="country" className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]" type="text" placeholder="Enter the country name" />
                        <input onChange={handleFormChange} value={formDetails.state} name="state" className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]" type="text" placeholder="Enter the state name" />
                        <input onChange={handleFormChange} value={formDetails.lga} name="lga" className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]" type="text" placeholder="Enter the lga" />
                        <label htmlFor="resources">What are the available resources to support the intern's work</label>
                        <input onChange={handleFormChange} value={formDetails.resources} name="resources" className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]" type="text" placeholder="Enter resources separated by commas" />
                        <label htmlFor="opportunities">What are the available opportunities for intern's professional development</label>
                        <input onChange={handleFormChange} value={formDetails.opportunities} name="opportunities" className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]" type="text" placeholder="Enter opportunities separated by commas" />
                    </div>
                </div>

                {/* Add more sections here (Duration and Stipend, Mentorship and Supervision, etc.) */}

                <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-full md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
                    <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">DURATION AND STIPEND</h2>
                    <div className="flex flex-col gap-[5px]">
                        <select onChange={(e) => handleFormChange(e)} name="duration" value={formDetails.duration} className="pl-[5px] outline-none text-[10px] font-[600] md:text-[13px] border border-[lightgreen] py-[5px] rounded-[10px]">
                            {["DO YOU CONFIRM THIS A 12 MONTH INTERNSHIP?", "NO", "YES"].map((item, index) => {

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
                        <select onChange={(e) => handleFormChange(e)} name="extension" value={formDetails.extension} className="pl-[5px] outline-none border text-[10px] font-[600] md:text-[13px] border-[lightgreen] py-[5px] rounded-[10px]">
                            {["IS AN EXTENSION AVAILABLE AFTER DURATION?", "NO", "YES"].map((item, index) => {

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
                        <select onChange={(e) => handleFormChange(e)} name="stipend" value={formDetails.stipend} className="pl-[5px] outline-none text-[10px] font-[600] md:text-[13px] border border-[lightgreen] py-[5px] rounded-[10px]">
                            {["WILL AN ADDITIONAL STIPEND BE PAID?", "NO", "YES"].map((item, index) => {

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
                        <input onChange={(e) => { handleFormChange(e) }} value={formDetails.amount} name="amount" className={`${formDetails.stipend == "" || formDetails.stipend == "NO" ? "hidden" : ""} pl-[5px] outline-none`} type="text" placeholder="How much will you be paying" />
                    </div>
                </div>

                {/* <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-[500px] mt-[10px] border p-[10px] gap-[5px]">
                    <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">MENTORSHIP AND SUPERVISION</h2>
                    <div className="flex flex-col gap-[5px]">
                        <select onChange={(e) => handleFormChange(e)} name="mentor" value={formDetails.mentor} className="pl-[5px] outline-none border border-[lightgreen] py-[5px] rounded-[10px]">
                            {["Select a mentor", "Charles", "Peter", "Michael"].map((item, index) => {

                                if (index === 0) {
                                    // The first item is the placeholder and should be disabled
                                    return (
                                        <option key={index} value="" disabled selected>
                                            {item}
                                        </option>
                                    );
                                }
                                return (
                                    <option key={item} value={index}>
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div> */}

                <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-full md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
                    <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">EMPLOYMENT OPPORTUNITIES</h2>
                    <div className="flex flex-col gap-[5px]">
                        <select onChange={(e) => handleFormChange(e)} name="employment" value={formDetails.employment} className="pl-[5px] text-[10px] font-[600] md:text-[13px] outline-none border border-[lightgreen] py-[5px] rounded-[10px]">
                            {["IS EMPLOYMENT AVAILABLE AFTER INTERNSHIP?", "NO", "YES"].map((item, index) => {

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


                <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-full md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
                    <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">COMPLIANCE AND LEGAL</h2>
                    <div className="flex flex-col gap-[5px]">
                        <select onChange={(e) => handleFormChange(e)} name="guidelines" value={formDetails.guidelines} className="pl-[5px] text-[10px] font-[600] md:text-[13px] outline-none border border-[lightgreen] py-[5px] rounded-[10px]">
                            {["DO YOU AGREE TO COMPLY WITH THE NDDC INTERNSHIP GUIDELINES?", "NO", "YES"].map((item, index) => {

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
                        <select onChange={(e) => handleFormChange(e)} name="policies" value={formDetails.policies} className="pl-[5px] text-[10px] font-[600] md:text-[13px] outline-none border border-[lightgreen] py-[5px] rounded-[10px]">
                            {["DO YOU AGREE TO NDDC INCLUSIVE WORK POLICIES?", "NO", "YES"].map((item, index) => {

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
                        <select onChange={(e) => handleFormChange(e)} name="inclusion" value={formDetails.inclusion} className="pl-[5px] text-[10px] font-[600] md:text-[13px] outline-none border border-[lightgreen] py-[5px] rounded-[10px]">
                            {["DO YOU REQUIRE AGREEMENTS/CONTRACTS FOR ONBOARDING INTERNS?", "NO", "YES"].map((item, index) => {

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

                <button className="border px-[15px] py-[5px] rounded-[7px] mt-[15px] bg-[#2dcd7c] active:bg-[#cfe1f0] text-white font-[600] text-[20px]">Submit</button>


            </form>
        </div>
    )
}

CompanyDetails.Layout = MetricLayoutTemplate