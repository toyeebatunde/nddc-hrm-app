
import MetricLayoutTemplate from "../../../../components/MetricLayoutTemplate";
// import ImageHolder from "../../../../components/ImageHolder";
// import UserButton from "../../../../../components/ButtonMaker";
import { useEffect, useState, useRef } from "react";
import useSWR, { mutate } from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import base, { ngrok, testEnv, assessmentEndpoint } from "../../../../components/Endpoints";
import TableContainer from "../../../../components/TableContainer";
// import Textfield from "../../../../../components/TextField";
// import jwt from "jsonwebtoken";
// import { Fragment } from "react";
import UserButton from "../../../../components/ButtonMaker";
import { Box, Modal, CircularProgress } from "@mui/material";
import AlertDialog from "../../../../components/AlertDialogue";
import { BarPlot, BarChart } from '@mui/x-charts/BarChart';





export default function ScoreAnalytics({
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


    const [scoreAnalytics, setScoreAnalytics] = useState([])
    const [userDetails, setUserDetails] = useState({})
    const [employerDetails, setEmployerDetails] = useState({})
    const [agentEdit, setCustomerEdit] = useState({ editView: false, editForm: initialCustomerForm })
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data).catch(error => console.log("fetching positions Error: ", error))
    // const { data: positions, error: positionsError } = useSWR(`${base}api/internship-positions/employer/${userDetails.id}`, fetching)
    const [formDetails, setFormDetails] = useState(initialFormDetails)
    const [lgas, setLgas] = useState(["CHOOSE A STATE TO SELECT LGA"])
    const [dialogue, setDialogue] = useState({ text: "", result: false, path: "" })

    useEffect(() => {
        setActiveTab("Open Positions")
        // setLoading(false)
        setToken()
        setActiveDashboard("Role Stats")
        setActiveState("0")
        setUserDetails(JSON.parse(localStorage.getItem("userDetails")))
        setEmployerDetails(JSON.parse(localStorage.getItem("employer")))
        async function fetchScoreAnalytics() {
            try {
                const response = await axios.get(`${assessmentEndpoint}api/app-users/analytics/passed-by-nddc-states?passingScore=0`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )

                if (response.status == 200) {
                    setScoreAnalytics(response.data)
                }
            } catch (error) {
                console.log("fetching analytics: ", error)
            }
        }

        fetchScoreAnalytics()
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








    // const url = {
    //     update: `${testEnv}v1/agent/${agentEdit.editForm.id}/update`,
    //     add: `${testEnv}v1/agent/add_agent`
    // }

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


    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const xLabels = [
        'Page A',
        'Page B',
        'Page C',
        'Page D',
        'Page E',
        'Page F',
        'Page G',
    ];



    return (
        <div className="w-[95%]">

            <div className="w-full pt-[5px] flex overflow-auto flex-col">
                {/* <CssTextField
          id=""
          label={"Filter by score"}
          // placeholder={"Filter by score"}
          multiline
          className="w-[110px] outline-none self-end"
          size="small"
          onChange={(e) => {changeScoreFilter(e)}}
          value={scoreFilter}
          type="number"
        /> */}

                <BarChart
                    width={800}
                    height={300}
                    series={[
                        { data: uData, id: 'pvId' },
                    ]}
                    xAxis={[{ data: xLabels, scaleType: 'band' }]}
                />
                {/* {scoreData && (
        )} */}
            </div>

            <AlertDialog props={dialogue} />
        </div>
    )
}

ScoreAnalytics.Layout = MetricLayoutTemplate