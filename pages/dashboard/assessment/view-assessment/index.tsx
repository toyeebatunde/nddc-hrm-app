"use client"
import { useState, useEffect, Fragment } from "react"
import AssessmentBuilder from "../../../../components/AssessmentBuilder"
import useSWR, { mutate } from 'swr'
import { assessmentEndpoint } from "../../../../components/Endpoints"
import axios from "axios"
import AlertDialog from "../../../../components/AlertDialogue"
import { Box, CircularProgress } from "@mui/material"



const testAssessments = [
    {
        question: "What is 6+2?",
        id: 1,
        options: ["2", "4", "6", "8"],
        type: "singleChoice"
    },
    {
        question: "What is 4+2?",
        id: 2,
        options: ["2", "4", "6", "8"],
        type: "multiChoice"
    },
    {
        question: "What is 2+0?",
        id: 3,
        options: ["2", "4", "6", "8"],
        type: "singleChoice"
    },
    {
        question: "What is 2+6?",
        id: 4,
        options: ["2", "4", "6", "8"],
        type: "multiChoice"
    },
    {
        question: "What is 2+4?",
        id: 5,
        options: ["2", "4", "6", "8"],
        type: "singleChoice"
    },
]

export default function ViewAssessments() {
    const fetching = (url: string) => axios.get(url).then(res => res.data).catch(error => console.log(error))
    const { data: assessmentsList, error: assessmentsListError } = useSWR(`${assessmentEndpoint}admin/api/assessments/list`, fetching) //api/question/list/1
    const [solutions, setSolutions] = useState<any[]>([])
    const [allAssessments, setAllAssessments] = useState<any[]>([{ title: "SELECT AN ASSESSMENT TO VIEW", id: "" }])
    const [assessmentToView, setAssessmentToView] = useState<any>({ title: "", id: "" })
    const { data: assessmentQuestions, error: assessmentQustionsError } = useSWR(`${assessmentEndpoint}api/question/list/${assessmentToView.id}`, fetching) //api/question/list/1
    const [currentAssessmentQuestions, setCurrentAssessmentQuestions] = useState<any[]>([])
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [dialogue, setDialogue] = useState<{ text: string, result: boolean, path: string, handler?: any }>({ text: "", result: false, path: "" })






    useEffect(() => {
        if (assessmentsList) {
            let newAssessmentsList = [...assessmentsList]
            newAssessmentsList.unshift({ title: "SELECT ASSESSMENT", id: "" })
            setAllAssessments(newAssessmentsList)
        }
    }, [assessmentsList])

    useEffect(() => {
        mutate(`${assessmentEndpoint}api/question/list/${assessmentToView.id}`)
        setSolutions([])
    }, [assessmentToView])

    useEffect(() => {
        if (assessmentQuestions) {
            setCurrentAssessmentQuestions(assessmentQuestions)
        }
    }, [assessmentQuestions])

    function removeCheckboxAnswer(text: string | number, arr: (string | number)[]) {
        const newArr = arr.filter((item) => item !== text)
        return newArr
    }

    function addCheckboxAnswer(text: string | number, arr: (string | number)[]) {
        const newArr = [...arr, text]
        return newArr
    }

    function handleMultiChoice(e: any, id: any, option: { isCorrect: any, optionText: any }) {
        const isAnswered: any = solutions.find((question: any) => question.questionId == id)
        // debugger
        if (!e.target.checked) {
            // debugger
            isAnswered.selectedOptions = isAnswered.selectedOptions.filter((option: any) => {
                return option.optionText != e.target.name
            })
            const newSolutions: any = solutions.map((solution: any) => {
                if (solution.questionId == id) {
                    solution = isAnswered
                    return solution
                }
                return solution
            })
            setSolutions(newSolutions)
        }
        if (isAnswered && e.target.checked) {
            isAnswered.selectedOptions = [...isAnswered.selectedOptions, { optionText: e.target.name, isCorrect: e.target.value == "true" ? true : false }]
            // debugger
            const newSolutions: any = solutions.map((solution: any) => {
                if (solution.questionId == id) {
                    solution = isAnswered
                    return solution
                }
                return solution
            })
            setSolutions(newSolutions)
            return
        }
        if (e.target.checked) {
            // debugger
            setSolutions([...solutions, {
                questionId: id, selectedOptions: [
                    {
                        optionText: e.target.name,
                        isCorrect: e.target.value == "true" ? true : false
                    }
                ]
            }])
        }
    }

    function handleSingleChoice(e: any, id: any, options: []) {
        // debugger
        let isAnswered: any = solutions.find((question: any) => question.questionId == id)
        let thisOption = options.find((option: any) => option.optionText == e.target.value)
        if (isAnswered) {
            isAnswered.selectedOptions = [thisOption]
            const newSolutions: any = solutions.map((solution: any) => {
                if (solution.questionId == id) {
                    solution = isAnswered
                    return solution
                }
                return solution
            })
            setSolutions(newSolutions)
            return
        }
        setSolutions([...solutions, {
            questionId: id, selectedOptions: [
                thisOption
            ]
        }])

    }

    function handleShortAnswer(e: any, id: any) {
        let isAnswered: any = solutions.find((question: any) => question.questionId == id)
        if (isAnswered) {
            isAnswered.shortAnswer = e.target.value
            const newSolutions: any = solutions.map((solution: any) => {
                if (solution.questionId == id) {
                    solution = isAnswered
                    return solution
                }
                return solution
            })
            setSolutions(newSolutions)
            return
        }
        setSolutions([...solutions, {
            questionId: id, shortAnswer: e.target.value
        }])
    }

    function handleTrueFalse(e: any, id: any, options: []) {
        // debugger
        let isAnswered: any = solutions.find((question: any) => question.questionId == id)
        let thisOption = options.find((option: any) => option.optionText == e.target.value)
        if (isAnswered) {
            isAnswered.selectedOptions = [thisOption]
            const newSolutions: any = solutions.map((solution: any) => {
                if (solution.questionId == id) {
                    solution = isAnswered
                    return solution
                }
                return solution
            })
            setSolutions(newSolutions)
            return
        }
        setSolutions([...solutions, {
            questionId: id, selectedOptions: [
                thisOption
            ]
        }])

    }

    function handleAssessmentSelect(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
        // debugger
        setAssessmentToView(allAssessments[Number(value)])
    }

    async function submitAssessment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true)
        // const id = JSON.parse(localStorage.getItem("employer")).id
        // const token = localStorage.getItem("token") || ""
        debugger
        // console.log("body: ", bodyObject)

        try {
            debugger
            const submitted = await axios.post(
                `${assessmentEndpoint}admin/api/assessments/submit/${assessmentToView.id}`,
                solutions,
                // {
                //   headers: {
                //     Authorization: `Bearer ${token}`,
                //   },
                //   withCredentials: true
                // }
            )

            if (submitted.status === 200) {
                setSubmitting(false)
                setSolutions([])
                setDialogue({ ...dialogue, result: true, text: "Assessment submitted successfully", path: "/" })
            }
        } catch (error) {
            // console.error("Signin error:", error)
            setDialogue({ ...dialogue, result: false, text: "Error submitting assessment", path: "" })
            setSubmitting(false)
        }
        // finally {
        //   setDialogue({ ...dialogue, result: false, text: "Error creating. try again", path: "" })
        //   setSubmitting(false)
        // }
    }



    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col rounded-[10px] border-[#2dcd7c] w-[90%] md:w-[500px] mt-[10px] border p-[10px] gap-[5px]">
                <h2 className="rounded-t-[10px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] text-center">
                    SELECT ASSESSMENT TO VIEW
                </h2>
                <div className="flex flex-col gap-[5px]">
                    <select
                        required
                        onChange={handleAssessmentSelect}
                        name="assessmentId"
                        value={assessmentToView.id}
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
            {currentAssessmentQuestions.length > 0 && (
                <form onSubmit={submitAssessment} className="mt-[100px] pb-[20px] rounded-[5px] p-[5px] borde w-fit flex flex-col gap-[15px] items-center">
                    {currentAssessmentQuestions.map((question, index) => {
                        return (
                            <Fragment key={index}>
                                <AssessmentBuilder
                                    questionText={question.questionText}
                                    options={question.options}
                                    questionType={question.questionType}
                                    id={question.id}
                                    handleSolution={
                                        question.questionType == "MULTI_CORRECT" ? handleMultiChoice :
                                            question.questionType == "MCQ" ? handleSingleChoice :
                                                question.questionType == "SHORT_ANSWER" ? handleShortAnswer : handleTrueFalse
                                    }
                                />
                            </Fragment>
                        )
                    })}
                    <button disabled={submitting} className={`border w-[120px] py-[5px] rounded-[7px] mt-[15px] bg-[#2dcd7c] active:bg-[#cfe1f0] text-white font-[600] text-[20px]`}>
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
            )}
            <AlertDialog props={dialogue} />
        </div>
    )
}

// handleSolution={assessment.type == "singleChoice" ? handleSingleChoice : handleMultiChoice}