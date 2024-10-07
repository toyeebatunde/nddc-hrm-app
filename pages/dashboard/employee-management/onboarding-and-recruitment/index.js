
import MetricLayoutTemplate from "../../../../components/MetricLayoutTemplate";
// import ImageHolder from "../../../../components/ImageHolder";
// import UserButton from "../../../../../components/ButtonMaker";
import { useEffect, useState, useRef } from "react";
import useSWR, { mutate } from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import base, { ngrok, testEnv } from "../../../../components/Endpoints";
import TableContainer from "../../../../components/TableContainer";
import Textfield from "../../../../components/TextField";
import jwt from "jsonwebtoken";
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
        companyName: "",
        location: "",
        state:"",
        country:"",
        lga:"",
        companyType: "",
        industry: "",
        cacRegistered: "",
        yearsPostIncorporation:"",
        email: "",
        phone: "",
        website:"",
        fax:"",
        bvn: "",
        cac: "",
        slots: "",
        tasks: "",
        workType: "",
        workLocation: "",
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
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data).catch(error => console.log(error))
    const { data: agents, error: agentsError } = useSWR(`${testEnv}v1/external/agent/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const [formDetails, setFormDetails] = useState(initialFormDetails)
    const [mentors, setMentors] = useState({ num: 0, list: [] })
    const [roles, setRoles] = useState([])
    const [geolocation, setGeoLocation] = useState({longitude: "", latitude:""})


    async function submitForm() {
        const formData = {
            companyName: "",
            industry: "",
            cacCertificationAvailable: "",
            companyType: "",
            yearsPostIncorporation: "",
            location: {
                address: "",
                state: "",
                country: "",
                lga: "",
                longitude: "",
                latitude: ""
            },
            contactInformation: {
                email: "",
                phoneNumber: "",
                website: "",
                faxNumber: ""
            },
            bvn: "",
            cac: "",
            numberOfSlots: "",
            department: [
                {
                    roles: "",
                    requiredQualifications: "",
                    tasksAndOutcomes: ""
                }
            ],
            workHours: "",
            workLocation: "",
            additionalStipend: false,
            stipendAmount: "",
            opportunityForPD: "",
            possibilityForRetaining: "",
            possibilityOfExtendingDuration: "",
            willCompleteDuration: "",
            guidelines: "",
            policies: "",
            inclusion: ""
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

    useEffect(() => {
        setActiveTab("Users")
        // setLoading(false)
        setToken()
        setActiveDashboard("Recruitment/Onboarding")
        setActiveState("0")
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
            <form className="flex flex-col items-center pb-[50px]" onSubmit={submitForm}>
                {/* <div className="flex flex-col w-[500px] mt-[30px] border p-[10px] gap-[5px]">
                    <h2 className="rounded-t-[10px] border bg-brand-yellow px-[5px]">COMPANY DETAILS</h2>
                    <div className="flex flex-col gap-[5px]">
                        <input onChange={handleFormChange} value={formDetails.companyName} name="companyName" className="pl-[5px] outline-none" type="text" placeholder="Enter Company Name" />
                        <input onChange={handleFormChange} value={formDetails.email} name="email" className="pl-[5px] outline-none" type="email" placeholder="Enter Company Email" />
                        <input onChange={handleFormChange} value={formDetails.phone} name="phone" className="pl-[5px] outline-none" type="tel" placeholder="Enter Company Phone Number" />
                        <input onChange={handleFormChange} value={formDetails.location} name="location" className="pl-[5px] outline-none" type="text" placeholder="Enter Company Address" />
                        <input onChange={handleFormChange} value={formDetails.website} name="website" className="pl-[5px] outline-none" type="text" placeholder="Enter Company Website" />
                        <input onChange={handleFormChange} value={formDetails.fax} name="fax" className="pl-[5px] outline-none" type="text" placeholder="Enter Company Fax Number" />
                        <select onChange={handleFormChange} name="companyType" value={formDetails.companyType} className="outline-none">
                            {companyTypes.map((item, index) => (
                                <option key={item} value={index === 0 ? "" : item} disabled={index === 0}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <select onChange={handleFormChange} name="industry" value={formDetails.industry} className="outline-none">
                            {industries.map((item, index) => (
                                <option key={item} value={index === 0 ? "" : item} disabled={index === 0}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <select onChange={handleFormChange} name="cacRegistered" value={formDetails.cacRegistered} className="outline-none">
                            {["ARE YOU REGISTERED WITH CAC", "NO", "YES"].map((item, index) => (
                                <option key={item} value={index === 0 ? "" : item} disabled={index === 0}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        {formDetails.cacRegistered === "YES" && (
                            <input onChange={handleFormChange} value={formDetails.cac} name="cac" className="pl-[5px] outline-none" type="text" placeholder="Enter Your CAC Number" />
                        )}
                        {formDetails.cacRegistered === "YES" && (
                            <input onChange={handleFormChange} value={formDetails.yearsPostIncorporation} name="yearsPostIncorporation" className="pl-[5px] outline-none" type="text" placeholder="Enter number of years post incorporation" />
                        )}
                        {formDetails.cacRegistered === "NO" && (
                            <input onChange={handleFormChange} value={formDetails.bvn} name="bvn" className="pl-[5px] outline-none" type="text" placeholder="Enter Your BVN" />
                        )}
                    </div>
                </div> */}

                {/* Internship Positions Section */}
                {/* <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-[500px] mt-[10px] border p-[10px] gap-[5px]">
                    <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">INTERNSHIP POSITIONS</h2>
                    <div className="flex flex-col gap-[5px]">
                        <input onChange={handleFormChange} value={formDetails.slots} name="slots" className="pl-[5px] outline-none" type="number" placeholder="How many slots are available?" />
                        <div className="flex flex-col gap-[5px]">
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
                        </div>
                    </div>
                </div> */}

                {/* Work Environment Section */}
                {/* <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-[500px] mt-[10px] border p-[10px] gap-[5px]">
                    <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">WORK ENVIRONMENT</h2>
                    <div className="flex flex-col gap-[5px]">
                        <select onChange={handleFormChange} name="workType" value={formDetails.workType} className="outline-none">
                            {workType.map((item, index) => (
                                <option key={item} value={index === 0 ? "" : item} disabled={index === 0}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <select onChange={handleFormChange} name="workLocation" value={formDetails.workLocation} className="outline-none">
                            {workLocation.map((item, index) => (
                                <option key={item} value={index === 0 ? "" : item} disabled={index === 0}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="resources">Please enter available resources to support the intern's work</label>
                        <input onChange={handleFormChange} value={formDetails.resources} name="resources" className="pl-[5px] outline-none" type="text" placeholder="Enter resources separated by commas" />
                        <label htmlFor="opportunities">Please enter available opportunities for intern's professional development</label>
                        <input onChange={handleFormChange} value={formDetails.opportunities} name="opportunities" className="pl-[5px] outline-none" type="text" placeholder="Enter opportunities separated by commas" />
                    </div>
                </div> */}

                {/* Add more sections here (Duration and Stipend, Mentorship and Supervision, etc.) */}

                {/* <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-[500px] mt-[10px] border p-[10px] gap-[5px]">
                    <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">DURATION AND STIPEND</h2>
                    <div className="flex flex-col gap-[5px]">
                        <input onChange={(e) => { handleFormChange(e) }} value={formDetails.duration} name="duration" className="pl-[5px] outline-none" type="number" placeholder="Please enter the internship duration in months" />
                        <select onChange={(e) => handleFormChange(e)} name="stipend" value={formDetails.stipend} className="outline-none">
                            {["WILL ADDITIONAL STIPEND BE PAID?", "NO", "YES"].map((item, index) => {

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
                </div> */}

                {/* <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-[500px] mt-[10px] border p-[10px] gap-[5px]">
                    <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">MENTORSHIP AND SUPERVISION</h2>
                    <div className="flex flex-col gap-[5px]">
                        <button onClick={(e) => { addMentor(e) }}>Add Mentor +</button>
                        {mentors.list.map((item, index) => {
                            return (
                                <Fragment key={index}>
                                    <div className="flex flex-col gap-[10px] mt-[20px]">
                                        <input onChange={(e) => { onMentorInputChange(e, index) }} className={`pl-[5px] outline-none`} name="name" value={mentors.list[index].name} type="text" placeholder="Enter Nentor's name" />
                                        <input onChange={(e) => { onMentorInputChange(e, index) }} className={`pl-[5px] outline-none`} name="contact" value={mentors.list[index].contact} type="text" placeholder="Enter Mentor's phone number" />
                                        <input onChange={(e) => { onMentorInputChange(e, index) }} className={`pl-[5px] outline-none`} name="support" value={mentors.list[index].support} type="text" placeholder="Enter Mentor's support role" />
                                        <input onChange={(e) => { onMentorInputChange(e, index) }} className={`pl-[5px] outline-none`} name="evaluation" value={mentors.list[index].evaluation} type="text" placeholder="Enter Mentor's evaluation criteria" />
                                        <button onClick={(e) => { removeMentor(e, index) }}>Remove Mentor</button>
                                    </div>
                                </Fragment>
                            )
                        })}
                    </div>
                </div> */}

                {/* <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-[500px] mt-[10px] border p-[10px] gap-[5px]">
                    <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">EMPLOYMENT OPPORTUNITIES</h2>
                    <div className="flex flex-col gap-[5px]">
                        <select onChange={(e) => handleFormChange(e)} name="employment" value={formDetails.employment} className="outline-none">
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

                        <select onChange={(e) => handleFormChange(e)} name="extension" value={formDetails.extension} className="outline-none">
                            {["IS EXTENSION AVAILABLE AFTER DURATION?", "NO", "YES"].map((item, index) => {

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
                </div> */}


                {/* <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-[500px] mt-[10px] border p-[10px] gap-[5px]">
                    <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">COMPLIANCE AND LEGAL</h2>
                    <div className="flex flex-col gap-[5px]">
                        <select onChange={(e) => handleFormChange(e)} name="guidelines" value={formDetails.guidelines} className="outline-none">
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
                        <select onChange={(e) => handleFormChange(e)} name="policies" value={formDetails.policies} className="outline-none">
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
                        <select onChange={(e) => handleFormChange(e)} name="inclusion" value={formDetails.inclusion} className="outline-none">
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
                </div> */}


            </form>
        </div>
    )
}

CompanyDetails.Layout = MetricLayoutTemplate