
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
import AlertDialog from "../../../../../components/AlertDialogue";




const industries = [
    "Select a department",
    "Technology",
    "Agriculture",
    "Automotive",
    "Craftmanship",
    "Entertainment",
    "Finance",
    "Hospitality",
    "Maritime,Medical",
    "Sports",
    "Teaching",
    "Technical Skills"
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
    const [employerDetails, setEmployerDetails] = useState({})
    const [searchedField, setSearchedField] = useState()
    const [agentEdit, setCustomerEdit] = useState({ editView: false, editForm: initialCustomerForm })
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data).catch(error => console.log("fetching positions Error: ", error))
    // const { data: positions, error: positionsError } = useSWR(`${base}api/internship-positions/employer/${userDetails.id}`, fetching)
    const [positions, setPositions] = useState([])
    const [formDetails, setFormDetails] = useState(initialFormDetails)
    const [mentors, setMentors] = useState({ num: 0, list: [] })
    const [roles, setRoles] = useState([])
    const [geolocation, setGeoLocation] = useState({ longitude: "", latitude: "" })
    const [editModal, setEditModal] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [lgas, setLgas] = useState(["CHOOSE A STATE TO SELECT LGA"])
    const [dialogue, setDialogue] = useState({ text: "", result: false, path: "" })

    useEffect(() => {
        setActiveTab("Open Positions")
        // setLoading(false)
        setToken()
        setActiveDashboard("Recruitment/Onboarding")
        setActiveState("1")
        setUserDetails(JSON.parse(localStorage.getItem("userDetails")))
        setEmployerDetails(JSON.parse(localStorage.getItem("employer")))
        async function fetchPositions() {
            try {
                const response = await axios.get(`${base}api/internship-positions/employer/${JSON.parse(localStorage.getItem("employer")).id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )

                if(response.status == 200) {
                    setPositions(response.data)
                }
            } catch (error) {
                console.log("fetching positions error: ", error)
            }
        }

        fetchPositions()
    }, [])


    // useEffect(()=>{
    //     if(userDetails.hasOwnProperty("id")) {
    //         mutate(`${base}api/internship-positions/employer/${userDetails.id}`)
    //     }
    // },[userDetails])



    useEffect(() => {
        async function fetchLgas() {
            const state = toSentenceCase(formDetails.state)
            const lgasResponse = await axios.get(`https://nga-states-lga.onrender.com/?state=${state}`)
            const newLgas = [...lgasResponse.data].map((lga) => {
                lga = lga.toUpperCase()
                return lga
            })
            newLgas.unshift("SELECT LGA")
            // const states = newStates
            setLgas(newLgas)
        }

        if (formDetails.state == "") {
            // setLgas()
            return
        }

        fetchLgas()
    }, [formDetails.state])

    function toSentenceCase(str) {
        // debugger
        if (!str) return str;
        if (str == "Akwa Ibom") {
            str = str.split(" ").join("")
        }
        if (str == "Cross River") {
            str = "Cross%20River"
        }
        return str
    }



    function openEditModal(role) {
        // debugger
        const thisRole = positions[role]
        setFormDetails({
            ...formDetails,
            slots: thisRole.numberOfSlot,
            roles: thisRole.department,
            tasks: thisRole.tasksAndOutcomes,
            qualifications: thisRole.requiredQualifications,
            skills: thisRole.requiredSkills.join(","),
            workLocation: thisRole.workLocation.address,
            state: thisRole.workLocation.state,
            lga: thisRole.workLocation.lga,
            country: thisRole.workLocation.country,
            stipend: thisRole.additionalStipend ? "YES" : "NO",
            amount: thisRole.stipendAmount,
            extension: thisRole.possibilityOfExtendingDuration ? "YES" : "NO",
            employment: thisRole.possibilityForRetaining ? "YES" : "NO",
            duration: thisRole.willCompleteDuration ? "YES" : "NO",
            opportunities: thisRole.opportunityForPD,
            workType: thisRole.workHours



        })
        setEditModal(true)
    }
    function closeEditModal() {
        setEditModal(false)

    }

    // useEffect(() => {
    //     if (positions) {
    //         console.log("positions: ", positions)
    //     }
    // }, [positions])

    function submitForm(e) {
        e.preventDefault()
        closeEditModal()
        setDialogue({ ...dialogue, result: true, text: "Role Successfully edited", path: "#" })
        // Add form submission logic here
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
                <section className={`min-h-[674px] w-full pt-4 pl-[5px]`}>
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
                                                <td className="font-pushpennyBook  w-[120px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{"N" + position.stipendAmount || "n/a"}</td>

                                                <td className="font-pushpennyBook  w-[75px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{position.possibilityOfExtendingDuration || "n/a"}</td>
                                                <td className="font-pushpennyBook  w-[75px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{position.possibilityOfRetaining || "n/a"}</td>
                                                <td className="font-pushpennyBook gap-[5px] borde w-[175px] flex  items-start">
                                                    <div className="borde mt-[5px] w-[80px] h-[36px]">
                                                        <UserButton onClick={() => {
                                                            openEditModal(index)

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
                                    searchBarData?.data.map((position, index) => {
                                        return (
                                            <tr key={index} className="relative border-b border-[#2dcd7c] h-[50px]">
                                                <td className="font-pushpennyBook  w-[95px]  font-400 text-[14px] leading-[18px] text-start text-[#6E7883]">{position.id}</td>
                                                <td className="font-pushpennyBook  w-[120px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{position.department}</td>
                                                <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{position.numberOfSlot}</td>
                                                <td className="font-pushpennyBook  w-[120px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{"N" + position.stipendAmount || "n/a"}</td>

                                                <td className="font-pushpennyBook  w-[75px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{position.possibilityOfExtendingDuration || "n/a"}</td>
                                                <td className="font-pushpennyBook  w-[75px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{position.possibilityOfRetaining || "n/a"}</td>
                                                <td className="font-pushpennyBook gap-[5px] borde w-[175px] flex  items-start">
                                                    <div className="borde mt-[5px] w-[80px] h-[36px]">
                                                        <UserButton onClick={() => {
                                                            // setView(true)

                                                        }} type="edit" />
                                                    </div>
                                                    {/* <div className="w-[88px] mt-[5px] h-[36px]">
                                                        <UserButton type="view" text="View" onClick={() => {
                                                            // localStorage.setItem('id', agent.id)
                                                            // setLoading(true)
                                                        }}
                                                        />
                                                    </div> */}
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
            <Modal
                open={editModal}
                onClose={closeEditModal}
            >
                <Box component={"div"} className="w-fit  h-[650px] top-[50px] absolute translate-x-[-50%]  left-[50%]">
                    <form
                        className="flex borde form-modal flex-col h-full overflow-y-auto items-center pb-[50px]"
                        onSubmit={submitForm}
                    >
                        {/* Internship Positions Section */}
                        <div className="flex flex-col bg-[white] rounded-[10px] border-[#2dcd7c] w-full md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
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
                        <div className="flex flex-col bg-[white] rounded-[10px] border-[#2dcd7c] w-full md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
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

                        <div className="flex flex-col bg-[white] rounded-[10px] border-[#2dcd7c] w-full md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
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

                        <div className="flex flex-col bg-[white] rounded-[10px] border-[#2dcd7c] w-full md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
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
            <AlertDialog props={dialogue} />
        </div>
    )
}

OpenRoles.Layout = MetricLayoutTemplate