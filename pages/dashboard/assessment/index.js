"use client"
import { useState, useEffect, Fragment } from "react"

import AssessmentBuilder from "../../../components/AssessmentBuilder"



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

export default function Assessment() {
    const [solutions, setSolutions] = useState([])

    function removeCheckboxAnswer(text, arr) {
        const newArr = arr.filter((item) => item !== text)
        return newArr
    }

    function addCheckboxAnswer(text, arr) {
        const newArr = [...arr, text]
        return newArr
    }

    function handleMultiChoice(e, id) {
        // e.preventDefault()
        setSolutions((currentSolutions) => {
            let newSolutions
            const isAnswered = solutions.find((solution) => solution.question == id)
            if (isAnswered && e.target.checked) {
                newSolutions = currentSolutions.map((solution) => {
                    if (solution.question == id) {
                        solution.answer = addCheckboxAnswer(e.target.value, solution.answer)
                    }
                    return solution
                })
            }
            if (isAnswered && !e.target.checked) {
                newSolutions = currentSolutions.map((solution) => {
                    if (solution.question == id) {
                        solution.answer = removeCheckboxAnswer(e.target.value, solution.answer)
                    }
                    return solution
                })
            }

            if (!isAnswered) {
                newSolutions = [...currentSolutions, { question: id, answer: [e.target.value] }]
            }
            return newSolutions
        })
    }

    function handleSingleChoice(e, id) {
        e.preventDefault()
        // debugger
        console.log(e)
        setSolutions((currentSolutions) => {
            let newSolutions
            const isAnswered = solutions.find((solution) => solution.question == id)
            if (isAnswered) {
                newSolutions = currentSolutions.map((solution) => {
                    if (solution.question == id) {
                        solution.answer = e.target.value
                    }
                    // debugger
                    return solution
                })
            } else {
                newSolutions = [...currentSolutions, { question: id, answer: e.target.value }]
            }

            // debugger
            return newSolutions
        })
    }


    return (
        <div className="flex items-center justify-center">
            <form className=" mt-[100px] rounded-[5px] p-[5px] border w-fit flex flex-col gap-[5px] items-center">
                {testAssessments.map((assessment, index) => {
                    return (
                        <Fragment key={index}>
                            <AssessmentBuilder question={assessment.question} answers={assessment.options} type={assessment.type} handleSolution={assessment.type == "singleChoice" ? handleSingleChoice : handleMultiChoice} id={assessment.id} />
                        </Fragment>
                    )
                })}
            </form>
        </div>
    )
}