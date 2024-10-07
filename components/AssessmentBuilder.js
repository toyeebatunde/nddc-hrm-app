"use client"
import { useState, useEffect, Fragment } from "react"
import { RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox } from "@mui/material"



export default function AssessmentBuilder({ question, type, answers, id, handleSolution }) {

    const [selectedAnswers, setSelectedAnswers] = useState([])


    return (
        <div className="w-[400px] borde flex flex-col">
            <h2 className={`text-[25px] borde bg-[#2dcd7c] font-[600] text-[20px] text-white px-[10px] `}>
                {question}
                {type == "multiChoice" && (<h2 className="text-[12px] font-[700]">
                    {"*This is a multiple choice question. Select all answers that apply"}
                </h2>)}
            </h2>

            {type == "singleChoice" && (
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    onChange={(e) => { handleSolution(e, id) }}
                    className="borde px-[10px] bg-[beige]"
                >
                    {answers.map((answer, index) => {
                        return (
                            <Fragment key={index}>
                                <FormControlLabel value={answer} control={<Radio />} label={answer} />
                            </Fragment>
                        )
                    })}
                </RadioGroup>
            )}

            {type == "multiChoice" && (
                <div className="flex flex-col bg-[beige] gap-[5px] items-start">
                    {answers.map((answer, index) => {
                        return (
                            <Fragment key={index}>
                                <div className="flex  gap-[5px] items-center text-[20px] font-[600]">
                                    <Checkbox
                                        name={answer}
                                        value={answer}
                                        onChange={(e) => { handleSolution(e, id) }}
                                    />
                                    <label htmlFor={answer}>{answer}</label>
                                </div>
                            </Fragment>
                        )
                    })}
                </div>
            )}

        </div>
    )
}