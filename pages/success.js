

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import useSWR, { mutate } from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import { ngrok, testEnv } from "../components/Endpoints";
import TableContainer from "../components/TableContainer";
import Textfield from "../components/TextField";
import jwt from "jsonwebtoken";
import { Fragment } from "react";
import Image from "next/image";
import AlertDialog from '../components/AlertDialogue'
import { CircularProgress, Box } from "@mui/material";
import base from "../components/Endpoints";





const industries = [
  "Select an Industry",
  "Agriculture",
  "Automotive",
  "Banking & Financial Services",
  "Construction",
  "Consumer Goods",
  "Education",
  "Energy & Utilities",
  "Entertainment & Media",
  "Healthcare & Pharmaceuticals",
  "Hospitality",
  "Information Technology",
  "Insurance",
  "Manufacturing",
  "Non-Profit",
  "Professional Services",
  "Real Estate",
  "Retail & E-commerce",
  "Telecommunications",
  "Transportation & Logistics",
  "Travel & Tourism"
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
    state: "",
    country: "",
    lga: "",
    companyType: "",
    industry: "",
    cacRegistered: "",
    yearsPostIncorporation: "",
    email: "",
    phone: "",
    website: "",
    fax: "",
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

  const [formDetails, setFormDetails] = useState(initialFormDetails)
  const [mentors, setMentors] = useState({ num: 0, list: [] })
  const [roles, setRoles] = useState([])
  const [geolocation, setGeoLocation] = useState({ longitude: "", latitude: "" })
  const [submitting, setSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [dialogue, setDialogue] = useState({ text: "", result: false, path: "", closeAlert: closeAlert })
  const [lgas, setLgas] = useState(["CHOOSE A STATE TO SELECT LGA"])
  const router = useRouter()

  useLayoutEffect(() => {
    const exp = jwt.decode(localStorage.getItem("token"))?.exp
    if (exp < (new Date().getTime() + 1) / 1000 || !exp) {
      const expValue = exp < (new Date().getTime() + 1) / 1000
      localStorage.clear()
      router.push("/")
      return
    }
    setIsLoading(false)
  }, [])


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








  function closeAlert() {
    setDialogue({ text: "", result: false, path: "" })
  }

  function holdPlay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



  async function sendForm(e) {
    const authId = JSON.parse(localStorage.getItem("userDetails")).id
    const userName = JSON.parse(localStorage.getItem("userDetails")).phoneNumber
    // const token = localStorage.getItem("token")
    e.preventDefault()
    setSubmitting(true)
    // await holdPlay(5000)
    // debugger
    const token = localStorage.getItem("token")
    const formInfo = {
      companyName: formDetails.companyName,
      industry: formDetails.industry,
      cacCertificationAvailable: formDetails.cacRegistered == "YES" ? true : false,
      companyType: formDetails.companyType,
      yearsPostIncorporation: formDetails.yearsPostIncorporation,
      location: {
        address: formDetails.location,
        state: formDetails.state,
        country: formDetails.country,
        lga: formDetails.lga,
        longitude: 0,
        latitude: 0
      },
      contactInformation: {
        email: formDetails.email,
        phoneNumber: formDetails.phone,
        website: formDetails.website,
        faxNumber: formDetails.fax
      },
      authId: authId
    }

    // debugger

    let verified = false

    if (formDetails.cacRegistered == "NO") {
      try {
        const bvnResponse = await axios.post(`${base}kyc/verify-bvn`,
          {
            bvn: formDetails.bvn,
            userName: userName
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true
          }
        )

        if (bvnResponse.status == 200) {
          verified = true
        }

      } catch (error) {
        verified = false
        setSubmitting(false)
        setDialogue({ ...dialogue, result: false, text: "BVN VERIFICATION FAILED", path: "" })
      }
    }
    if (formDetails.cacRegistered == "YES") {
      // verified = true
      try {
        const cacResponse = await axios.post(`${base}kyc/verify-cac`, {
          companyName: formDetails.companyName,
          userName: userName,
          rcNumber: formDetails.cac
        }, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })

        if (cacResponse.status == 200) {
          verified = true
        }

      } catch (error) {
        verified = false
        setSubmitting(false)
        setDialogue({ ...dialogue, result: false, text: "CAC VERIFICATION FAILED. PLEASE CHECK THAT YOUR COMPANY NAME AND RC NUMBER ARE ENTERED CORRECTLY", path: "" })
      }
    }

    if (verified) {
      // console.log("token: ", token)
      // debugger
      try {
        const isLogged = await axios.post(`${base}api/employers`,
          formInfo,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (isLogged.status === 200) {
          localStorage.setItem("employer", JSON.stringify(isLogged.data))
          setDialogue({ ...dialogue, result: true, text: "Form Submission Successful!", path: "/dashboard/employee-management/post-internship-positions" })
          // router.push("/dashboard/agency/post-internship-positions")
        }
      } catch (error) {
        console.error("Form error:", error)
        setSubmitting(false)
        setDialogue({ ...dialogue, result: false, text: "Something went wrong!", path: "" })
      } finally {
        setSubmitting(false)
      }
    } else {
      setSubmitting(false)
      console.log("unverified")
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










  // useEffect(() => {
  //     resetSearchParams()
  //     resetDay()
  // }, [])

  // useEffect(() => {
  //     setActiveTab("Agents")
  //     // setLoading(false)
  //     setToken()
  //     setActiveDashboard("AgentManagement")
  //     setActiveState("2")
  // }, [])






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

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Box component={"h2"} sx={{ color: "black" }}>
          <CircularProgress size="20px" color="inherit" />
        </Box>
      </div>
    )
  }



  return (
    <div className="w-full flex flex-col">
      <div style={{ backgroundImage: "url(/icons/nddc-logo.jpeg)" }} className="relative borde mt-[5px] h-[50px] w-[250px] bg-center bg-cover">
      </div>
      <form onSubmit={(e) => { sendForm(e) }} className="flex flex-col  items-center pb-[50px] mt-[20px]">
        <div className="flex flex-col rounded-[10px] border-[#2dcd7c] md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
          <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">COMPLETE VERIFICATION TO PROCEED</h2>
          <div className="flex flex-col gap-[20px]">
            <input required onChange={handleFormChange} value={formDetails.companyName} name="companyName" className="pl-[10px] rounded-[10px]  outline-none border border-[lightgreen] py-[5px] " type="text" placeholder="Enter Company Name" />
            <input onChange={handleFormChange} value={formDetails.email} name="email" className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]" type="email" placeholder="Enter Company Email" />
            <input required onChange={handleFormChange} value={formDetails.phone} name="phone" className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]" type="tel" placeholder="Enter Company Phone Number" />
            <input required onChange={handleFormChange} value={formDetails.location} name="location" className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]" type="text" placeholder="Enter Company Address" />
            <select required onChange={handleFormChange} name="country" value={formDetails.country} className="pl-[5px] outline-none border border-[lightgreen] py-[5px] rounded-[10px]">
              {["Choose a Country", "Nigeria"].map((item, index) => (
                <option key={item} value={index === 0 ? "" : item} disabled={index === 0}>
                  {item}
                </option>
              ))}
            </select>
            <select
              required
              onChange={handleFormChange}
              value={formDetails.state}
              name="state"
              className="pl-[5px] outline-none text py-[5px] -[10px]  border border-[lightgreen] py-[5px] rounded-[10px]"
            >
              {["SELECT STATE", "Abia", "Akwa Ibom", "Bayelsa", "Cross River", "Delta", "Edo", "Imo", "Ondo", "Rivers"].map(
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
              onChange={handleFormChange}
              value={formDetails.lga}
              name="lga"
              className="pl-[5px] outline-none text py-[5px] -[10px]  border border-[lightgreen] py-[5px] rounded-[10px]"
            >
              {lgas.map(
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
            <input onChange={handleFormChange} value={formDetails.website} name="website" className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]" type="text" placeholder="Enter Company Website" />
            <input onChange={handleFormChange} value={formDetails.fax} name="fax" className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]" type="text" placeholder="Enter Company Fax Number" />
            <select required onChange={handleFormChange} name="companyType" value={formDetails.companyType} className="pl-[5px] outline-none border border-[lightgreen] py-[5px] rounded-[10px]">
              {companyTypes.map((item, index) => (
                <option key={item} value={index === 0 ? "" : item} disabled={index === 0}>
                  {item}
                </option>
              ))}
            </select>
            <select required onChange={handleFormChange} name="industry" value={formDetails.industry} className="pl-[5px] outline-none border border-[lightgreen] py-[5px] rounded-[10px]">
              {industries.map((item, index) => (
                <option key={item} value={index === 0 ? "" : item} disabled={index === 0}>
                  {item}
                </option>
              ))}
            </select>
            <select required onChange={handleFormChange} name="cacRegistered" value={formDetails.cacRegistered} className="pl-[5px] outline-none border border-[lightgreen] py-[5px] rounded-[10px]">
              {["ARE YOU REGISTERED WITH CAC", "NO", "YES"].map((item, index) => (
                <option key={item} value={index === 0 ? "" : item} disabled={index === 0}>
                  {item}
                </option>
              ))}
            </select>
            {formDetails.cacRegistered === "YES" && (
              <input required onChange={handleFormChange} value={formDetails.cac} name="cac" className="pl-[5px] outline-none border border-[lightgreen] py-[5px] rounded-[10px]" type="text" placeholder="Enter Your CAC Number" />
            )}
            {formDetails.cacRegistered === "YES" && (
              <input required onChange={handleFormChange} value={formDetails.yearsPostIncorporation} name="yearsPostIncorporation" className="pl-[5px] outline-none border border-[lightgreen] py-[5px] rounded-[10px]" type="text" placeholder="Enter number of years post incorporation" />
            )}
            {formDetails.cacRegistered === "NO" && (
              <input required onChange={handleFormChange} value={formDetails.bvn} name="bvn" className="pl-[5px] outline-none" type="text" placeholder="Enter Your BVN" />
            )}
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

      <AlertDialog props={dialogue} />
    </div>

    //disabled={submitting} onClick={(e)=>{sendForm(e)}}
  )
}
