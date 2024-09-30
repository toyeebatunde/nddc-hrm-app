

import { useEffect, useState, useRef } from "react";
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
  const [dialogue, setDialogue] = useState({text: "", result: false, path: "", closeAlert: closeAlert})


  function closeAlert () {
    setDialogue({text: "", result: false, path: ""})    
  }



  async function sendForm(e) {
    const authId = JSON.parse(localStorage.getItem("employ")).authId
    e.preventDefault()
    console.log("submitting")
    const token = localStorage.getItem("token")
    setSubmitting(true)
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

    let verified = true

    // if (formDetails.cacRegistered == "NO") {
    //   try {
    //     const bvnResponse = await axios.post("http://localhost:9090/kyc/verify-bvn",
    //       {
    //         bvn: formDetails.bvn,
    //         userName: localStorage.getItem("phoneNumber")
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //           // "Content-Type": "application/json"
    //         },
    //         withCredentials: true
    //       }
    //     )

    //     if (bvnResponse.status == 200) {
    //       verified = true
    //     }

    //   } catch (error) {
    //     verified = false
    //     console.log(error)
    //   }
    // }
    // if (formDetails.cacRegistered == "YES") {
    //   try {
    //     const bvnResponse = await axios.post("http://localhost:8080/kyc/verify-bvn", {
    //       bvn: formDetails.bvn,
    //       userName: localStorage.getItem("phoneNumber")
    //     }, {
    //       headers: {
    //         "Authorization": `Bearer ${token}`
    //       }
    //     })

    //     if (bvnResponse.status == 200) {
    //       verified = true
    //     }

    //   } catch (error) {
    //     verified = false
    //     console.log(error)
    //   }
    // }

    if (verified) {
      // console.log("token: ", token)
      // debugger
      try {
        const isLogged = await axios.post("https://nddc-api.payrail.co/api/employers", 
          formInfo,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (isLogged.status === 200) {
          localStorage.setItem("companyDetails", isLogged.data)
          setDialogue({...dialogue, result: true, text: "Form Submission Successful!", path:"/dashboard/agency/post-internship-positions"})
          // router.push("/dashboard/agency/post-internship-positions")
        }
      } catch (error) {
        console.error("Form error:", error)
        setSubmitting(false)
        setDialogue({...dialogue, result: false, text: "Something went wrong!", path:""})
      } finally {
        // setSubmitting(false)
      }
    } else {
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



  return (
    <div className="w-full borde">
      <div style={{ backgroundImage: "url(/icons/nddc-logo.jpeg)" }} className="relative borde mt-[5px] h-[50px] w-[250px] bg-center bg-cover">
      </div>
      <form onSubmit={(e) => { sendForm(e) }} className="flex flex-col  items-center pb-[50px] mt-[20px]">
        <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-[500px] mt-[10px] border p-[10px] gap-[5px]">
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
            <input required onChange={handleFormChange} value={formDetails.state} name="state" className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]" type="text" placeholder="Enter State" />
            <input required onChange={handleFormChange} value={formDetails.lga} name="lga" className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]" type="text" placeholder="Enter Lga" />
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
        <button className="border px-[15px] py-[5px] rounded-[7px] mt-[15px] bg-[#2dcd7c] active:bg-[#cfe1f0] text-white font-[600] text-[20px]">Submit</button>



      </form>
    </div>

    //disabled={submitting} onClick={(e)=>{sendForm(e)}}
  )
}
