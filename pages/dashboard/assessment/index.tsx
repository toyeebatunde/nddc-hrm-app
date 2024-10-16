"use client"
import { useEffect, useState, useRef } from "react"
import axios from "axios";
import { useRouter } from "next/router";
import { Fragment } from "react";
import AlertDialog from '../../../components/AlertDialogue'
import { assessmentEndpoint } from "../../../components/Endpoints";
import debounce from 'lodash.debounce';
import useSWR from 'swr'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Box, Checkbox, CircularProgress, FormControlLabel, Modal, Radio, RadioGroup } from "@mui/material";

export default function CreateAssessment({
}) {

  // type AssessmentQuestion = {
  //   questionText: string;
  //   questionType: string;
  //   correctTrueFalse: boolean | null;
  //   options: {optionText: string, isCorrect: boolean}[] | string; //MCQ and MULTI_CORRECT
  //   correctAnswer: string;
  // }

  type AssessmentQuestion = {
    questionText: string;
    questionType: string;
    correctTrueFalse: boolean | null;
    options: string; //MCQ and MULTI_CORRECT
    correctAnswer: string;
    awardedScore: number;
    assessmentId: number | string;
  }
  const initialFormDetails: AssessmentQuestion = {
    questionText: "",
    questionType: "",
    options: "",
    correctAnswer: "",
    correctTrueFalse: null,
    awardedScore: 0,
    assessmentId: ""
  }

  type NewAssessmentType = {
    title: string,
    description: string,
    startDate: any,
    endDate: any,
    passingScore: number,
    id?: number | string
  }

  const initialNewAssessment: NewAssessmentType = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    passingScore: 0,
  }

  const [formDetails, setFormDetails] = useState(initialFormDetails)
  const fetching = (url: string) => axios.get(url).then(res => res.data).catch(error => console.log(error))
  const { data: assessmentsList, error: assessmentsListError } = useSWR(`${assessmentEndpoint}admin/api/assessments/list`, fetching)
  const [dialogue, setDialogue] = useState<{ text: string, result: boolean, path: string, handler?: any }>({ text: "", result: false, path: "" })
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [updatedOptions, setUpdatedOptions] = useState<{ optionText: string, isCorrect: boolean }[]>([])
  const [newAssessment, setNewAssessment] = useState<NewAssessmentType>(initialNewAssessment)
  const [createModal, setCreateModal] = useState<boolean>(false)
  const [assessmentId, setAssessmentId] = useState<string | number | undefined | null>()
  const [allAssessments, setAllAssessments] = useState<NewAssessmentType[]>([
    {
      id: "",
      title: "SELECT AN ASSESSMENT",
      description: "",
      startDate: "",
      endDate: "",
      passingScore: 0
    },
    {
      id: "1",
      title: "ASSESSMENT 1",
      description: "Sample 1",
      startDate: "",
      endDate: "",
      passingScore: 100
    },
  ])



  function closeAlert() {
    setDialogue({ text: "", result: false, path: "" })
  }

  function openCreateModal() {
    setCreateModal(true)
  }
  function closeCreateModal() {
    setCreateModal(false)
  }

  const updateList = debounce((text: string) => {
    let options = text.split(",")
    const newOptions = options.map((option: string) => {
      return { optionText: option.replace(/\s+/g, ''), isCorrect: false }
    })
    setUpdatedOptions(newOptions)
  }, 500)

  useEffect(() => {
    if (assessmentsList) {
      let newList = assessmentsList
      newList.unshift({
        id: "",
        title: "SELECT AN ASSESSMENT",
        description: "",
        startDate: "",
        endDate: "",
        passingScore: 0
      })
      setAllAssessments(newList)
    }
  }, [assessmentsList])



  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    // debugger
    const { name, value } = e.target

    if (createModal) {
      setNewAssessment({
        ...newAssessment,
        [name]: value
      })
      return
    }
    if (e.target.name == "questionType") {
      setFormDetails({ ...formDetails, options: "" })
      setUpdatedOptions([])
    }

    if (e.target.name == "options") {
      updateList(value)
    }

    setFormDetails((currentDetails) => ({
      ...currentDetails,
      [name]: value,
    }))
  }

  function handleSolution(e: any, id: number, type: string) {
    let updated: any[] = []
    if (type == "SINGLE ANSWER") {
      updated = updatedOptions.map((option, i) => {
        return {
          ...option,
          isCorrect: i === id,
        }
      })
    }
    if (type == "MULTIPLE ANSWERS") {
      updated = updatedOptions.map((option, i) => {
        if (i == id) {
          return { ...option, isCorrect: e.target.checked }
        }
        return option
      })
    }

    setUpdatedOptions(updated)
  }


  const assessment = {
    assessmentId: 1,  // ID of the assessment being graded
    userAnswers: [
      {
        questionId: 1,  // ID of the MCQ question
        selectedOptions: [
          {
            optionText: "Paris",  // Selected option for MCQ
            isCorrect: true        // Indicate if this option is the correct answer
          }
        ],
        shortAnswer: null      // Not applicable for MCQ
      },
      {
        questionId: 2,  // ID of the TRUE_FALSE question
        selectedOptions: [
          {
            optionText: "False",  // Selected option for TRUE_FALSE
            isCorrect: false
          }
        ],
        shortAnswer: null  // Not applicable for TRUE_FALSE
      },
      {
        questionId: 3,  // ID of the SHORT_ANSWER question
        selectedOptions: [],  // Not applicable for SHORT_ANSWER
        shortAnswer: "Berlin" // The user’s short answer
      },
      {
        questionId: 4,  // ID of the MULTI_CORRECT question
        selectedOptions: [
          {
            optionText: "Option A",
            isCorrect: true
          },
          {
            optionText: "Option B",
            isCorrect: false
          }
        ],
        shortAnswer: null  // Not applicable for MULTI_CORRECT
      }
    ]
  }







  function toSentenceCase(str: string): string {
    if (!str) return str; // Return if the string is empty
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  function fixQuestionObject() {
    let sorted
    if (formDetails.questionType == "MULTIPLE ANSWERS") {
      sorted = { questionType: "MULTI_CORRECT", questionText: formDetails.questionText, options: updatedOptions, correctAnswer: "", correctTrueFalse:"", awardedScore: Number(formDetails.awardedScore) }
    }

    if (formDetails.questionType == "SINGLE ANSWER") {
      sorted = { questionType: "MCQ", awardedScore: Number(formDetails.awardedScore), questionText: formDetails.questionText, options: updatedOptions, correctAnswer: "", correctTrueFalse:"" }
    }
    if (formDetails.questionType == "TRUE OR FALSE") {
      let correctTrueFalse = formDetails.correctAnswer == "TRUE"
      sorted = { questionType: "TRUE_FALSE", awardedScore: Number(formDetails.awardedScore), questionText: formDetails.questionText, correctTrueFalse: correctTrueFalse, correctAnswer:correctTrueFalse, options:[] }
    }
    if (formDetails.questionType == "SHORT ANSWER") {
      sorted = { questionType: "SHORT_ANSWER", awardedScore: Number(formDetails.awardedScore), questionText: formDetails.questionText, correctAnswer: formDetails.correctAnswer, options: [], correctTrueFalse:"" }
    }
    return sorted
  }

  function convertDateString(dateString: string) {
    // Create a new Date object using the date string
    const date = new Date(dateString);
    
    // Format the date to ISO string and get the required parts
    const isoString = date.toISOString();
  
    // Return the ISO string
    return isoString;
  }



  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true)
    // const id = JSON.parse(localStorage.getItem("employer")).id
    // const token = localStorage.getItem("token") || ""
    const bodyObject = fixQuestionObject()
    // debugger
    // console.log("body: ", bodyObject)

    try {
      debugger
      const submitted = await axios.post(
        `${assessmentEndpoint}api/question/create/${formDetails.assessmentId}`,
        bodyObject,
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        //   withCredentials: true
        // }
      )

      if (submitted.status === 200) {
        setSubmitting(false)
        setFormDetails(initialFormDetails)
        setDialogue({ ...dialogue, result: true, text: "Question created successfully", path: "" })
      }
    } catch (error) {
      // console.error("Signin error:", error)
      setDialogue({ ...dialogue, result: false, text: "Error creating question", path: "" })
      setSubmitting(false)
    } 
    // finally {
    //   setDialogue({ ...dialogue, result: false, text: "Error creating. try again", path: "" })
    //   setSubmitting(false)
    // }
  }

  async function createNewAssessment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // debugger
    setSubmitting(true)
    let convertedNewAssessment = {...newAssessment, startDate: convertDateString(newAssessment.startDate), endDate: convertDateString(newAssessment.endDate)}
    try {
      const isCreated = await axios.post(`${assessmentEndpoint}admin/api/assessments/create`, convertedNewAssessment)
      if (isCreated.status === 200) {
        setSubmitting(false)
        closeCreateModal()
        setNewAssessment(initialNewAssessment)
        setDialogue({ ...dialogue, result: true, text: "Assessment created successfully", path: "" })
      }
    } catch (error) {
      // debugger
      setSubmitting(false)
      // closeCreateModal()
      setDialogue({ ...dialogue, result: false, text: "Error creating Assessment", path: "" })

    } 
    // finally {
    //   // debugger
    //   setSubmitting(false)
    //   setDialogue({ ...dialogue, result: false, text: "Error creating Assessment", path: "" })

    // }
  }

  // .replace(/\s+/g, '')




  function ensureQuestionMark(str: string) {
    if (str.slice(-1) === '?') {
      return str;
    } else {
      return str + '?';
    }
  }

  function stringToArrayByComma(str: string) {
    if (!str.includes(",")) {
      throw new Error("Please put a comma after each item");
    }
    return str.split(",").map((item) => item.trim());
  }



  return (
    <div className="w-full flex flex-col">
      <div className="flex self-center">
        <button onClick={() => { openCreateModal() }} className="border w-[350px] py-[5px] rounded-[7px] mt-[15px] bg-[#2dcd7c] active:bg-[#cfe1f0] text-white font-[600] text-[20px]">
          Click here to create new assessment
        </button>
      </div>
      <h2 className="rounded-t-[10px] w-[90%] md:w-[500px] self-center text-center mt-[50px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px]">
        Fill this form to add a question to an existing assessment
      </h2>
      <form
        className="flex borde flex-col mt-[10px] items-center pb-[50px]"
        onSubmit={submitForm}
      >

        <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-[90%] md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
          <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">
            QUESTION TITLE
          </h2>
          <div className="flex flex-col gap-[5px]">
            <input
              required
              onChange={handleFormChange}
              value={formDetails.questionText}
              name="questionText"
              className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]"
              type="text"
              placeholder="Enter the assessment question here"
            />
          </div>
        </div>
        <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-[90%] md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
          <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">
            WHAT IS THE MAXIMUM SCORE FOR THIS QUESTION
          </h2>
          <div className="flex flex-col gap-[5px]">
            <input
              required
              onChange={handleFormChange}
              value={formDetails.awardedScore}
              name="awardedScore"
              className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]"
              type="number"
              placeholder="Enter the maximum score here"
            />
          </div>
        </div>


        <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-[90%] md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
          <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">
            SELECT ASSESSMENT TO ADD THIS QUESTION
          </h2>
          <div className="flex flex-col gap-[5px]">
            <select
              required
              onChange={handleFormChange}
              name="assessmentId"
              value={formDetails.assessmentId}
              className="pl-[5px] outline-none border border-[lightgreen] py-[5px] rounded-[10px]"
            >
              {allAssessments.map((item, index) => (
                <option
                  key={index}
                  value={index === 0 ? "" : item.id}
                  disabled={index === 0}
                >
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-[90%] md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
          <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">
            QUESTION TYPE
          </h2>
          <div className="flex flex-col gap-[5px]">
            <select
              required
              onChange={handleFormChange}
              name="questionType"
              value={formDetails.questionType}
              className="pl-[5px] outline-none border border-[lightgreen] py-[5px] rounded-[10px]"
            >
              {["SELECT A QUESTION TYPE", "SINGLE ANSWER", "MULTIPLE ANSWERS", "SHORT ANSWER", "TRUE OR FALSE"].map((item, index) => (
                <option
                  key={item}
                  value={index === 0 ? "" : item}
                  disabled={index === 0}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>



        {(formDetails.questionType == "SINGLE ANSWER" || formDetails.questionType == "MULTIPLE ANSWERS") && (
          <div className={`flex flex-col rounded-[10px] border-[#2dcd7c] w-[90%] md:w-[500px] mt-[10px] border p-[10px] gap-[5px]`}>
            <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">
              OPTIONS
            </h2>
            <div className="flex flex-col gap-[5px]">
              <input
                required
                onChange={handleFormChange}
                value={formDetails.options}
                name="options"
                className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]"
                type="text"
                placeholder="Enter answer options separated by a comma"
              />
            </div>
          </div>
        )}

        {(formDetails.questionType === "SINGLE ANSWER" || formDetails.questionType === "MULTIPLE ANSWERS") && (
          <div className={`flex flex-col rounded-[10px] border-[#2dcd7c] w-[90%] md:w-[500px] mt-[10px] border p-[10px] gap-[5px]`}>
            <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">
              {formDetails.questionType === "SINGLE ANSWER" ? "SELECT THE CORRECT ANSWER" : "SELECT ALL CORRECT ANSWERS"}
            </h2>
            <div
              className="borde px-[10px] bg-[beige] flex flex-col"
            >
              {formDetails.questionType == "SINGLE ANSWER" && (
                <RadioGroup>
                  {updatedOptions.map((answer: any, index: any) => {
                    return (
                      <div key={index}>
                        <Radio
                          name="options"
                          onChange={(e) => { handleSolution(e, index, formDetails.questionType) }}
                          checked={answer.isCorrect}
                        />
                        <label htmlFor={answer.optionText}>{answer.optionText}</label>
                      </div>
                    )
                  })}
                </RadioGroup>
              )}
              {formDetails.questionType == "MULTIPLE ANSWERS" && (
                <Fragment>
                  {updatedOptions.map((answer: any, index: any) => {
                    return (
                      <div key={index}>
                        <Checkbox
                          name="options"
                          onChange={(e) => { handleSolution(e, index, formDetails.questionType) }}
                          checked={answer.isCorrect}
                        />
                        <label htmlFor={answer.optionText}>{answer.optionText}</label>
                      </div>
                    )
                  })}
                </Fragment>
              )}
            </div>
          </div>
        )}

        {(formDetails.questionType == "TRUE OR FALSE") && (
          <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-[90%] md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
            <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">
              CORRECT ANSWER
            </h2>
            <div className="flex flex-col gap-[5px]">
              <select
                required
                onChange={handleFormChange}
                name="correctAnswer"
                value={formDetails.correctAnswer}
                className="pl-[5px] outline-none border border-[lightgreen] py-[5px] rounded-[10px]"
              >
                {["SELECT THE CORRECT ANSWER", "TRUE", "FALSE"].map((item, index) => (
                  <option
                    key={item}
                    value={index === 0 ? "" : item}
                    disabled={index === 0}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {(formDetails.questionType == "SHORT ANSWER") && (
          <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-[90%] md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
            <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">
              CORRECT ANSWER
            </h2>
            <textarea
              name="correctAnswer"
              onChange={(e) => { handleFormChange(e) }}
              className="pl-[5px] outline-none border border-[lightgreen] py-[5px] rounded-[10px]"
            />
          </div>
        )}

        <button className="border px-[15px] py-[5px] rounded-[7px] mt-[15px] bg-[#2dcd7c] active:bg-[#cfe1f0] text-white font-[600] text-[20px]">
          Submit
        </button>
      </form>
      <Modal
        open={createModal}
        onClose={closeCreateModal}
      >
        <Box component={"div"} className="w-fit flex gap-[10px] outline-none top-[50px] absolute translate-x-[-50%] left-[50%]">
          <form
            className="flex outline-none borde flex-col h-full items-center pb-[50px]"
            onSubmit={createNewAssessment}
          >

            <div className="flex flex-col bg-[white] rounded-[10px] w-[350px] md:w-[500px] border-[#2dcd7c] mt-[10px] border p-[10px] gap-[5px]">
              <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">
                CREATE NEW ASSESSMENT
              </h2>
              <div className="flex flex-col gap-[5px]">
                <input
                  required
                  onChange={handleFormChange}
                  value={newAssessment.title}
                  name="title"
                  className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]"
                  type="text"
                  placeholder="What is the name of this assessment?"
                />
                <textarea
                  required
                  onChange={handleFormChange}
                  value={newAssessment.description}
                  name="description"
                  className="pl-[10px] h-[100px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]"
                  placeholder="Enter assessment description"
                />
                <input
                  required
                  onChange={handleFormChange}
                  value={newAssessment.startDate}
                  name="startDate"
                  className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]"
                  type="date"
                  placeholder="When does this assessment become valid?"
                />
                <input
                  required
                  onChange={handleFormChange}
                  value={newAssessment.endDate}
                  name="endDate"
                  className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]"
                  type="date"
                  placeholder="When does this assessment expire?"
                />
                <input
                  required
                  onChange={handleFormChange}
                  value={newAssessment.passingScore || ""}
                  name="passingScore"
                  className="pl-[10px] rounded-[10px] outline-none border border-[lightgreen] py-[5px]"
                  type="number"
                  placeholder="What is the pass mark of this assessment"
                />
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
          <button onClick={()=>{closeCreateModal()}} className="borde h-[30px] w-[30px]">
            <IoIosCloseCircleOutline className="w-full h-full text-[#2dcd7c]" />
          </button>
        </Box>
      </Modal>
      <AlertDialog props={dialogue} />
    </div>
  )
}
