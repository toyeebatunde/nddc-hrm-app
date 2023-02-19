
import { useState, useEffect } from "react"
import ImageHolder from "./ImageHolder"


export default function Textfield({ title, type = "text", value, name, bg = "bg-[#F3F3F3]", formFields, setFormFields, formEdit, selectOptions = "", charType = "text" }) {
    const [focusState, setFocusState] = useState(false)


    useEffect(() => { }, [value])

    

    if (type == "select") {
        return (
            <div className="flex items-center relative h-full group justify-center w-full  rounded-[inherit]">
                <label className="text-[12px] font-[400] top-[-10px] left-[25px] font-interegular absolute w-fit text-[#777777] bg-[white] px-[4px]">{title}</label>
                <select name={name} onChange={(e) => { formEdit(e) }} className={`h-full outline-none pl-[25px] font-interegular text-[14px] font-[400] rounded-[10px] ${bg} w-[95%] rounded-[inherit]`}>
                    {selectOptions.map((option, index) => {
                        if (option == value) {
                            return <option key={index} value={option} selected>{option}</option>
                        }
                        return <option key={index} value={option}>{option}</option>
                    })}
                </select>
            </div>
        )
    }
    if (type == "textbox") {
        return (
            <div className="w-full h-full rounded-[inherit] bg-[#F3F3F3]">
                <h2 className="absolute font-pushpennyMedium ml-[15px] text-[10px] top-[-7px] h-[13px] text-[#6E7883] bg-[#F3F3F3] px-[3px]">Reason for action</h2>
                <textarea className="h-full w-full rounded-[inherit] bg-[#F3F3F3] outline-none px-[10px] py-[10px]"></textarea>
            </div>
        )
    }
    if (type == "text") {
        return (
            <div className="flex items-center relative h-full group justify-center w-full  rounded-[inherit]">
                <label className="text-[12px] font-[400] top-[-10px] left-[45px] font-interegular absolute w-fit text-[#777777] bg-[#F3F3F3] px-[4px]">{title}</label>
                <input type={charType} name={name} onChange={(e) => { formEdit(e) }} value={value} className={`h-full outline-none pl-[25px] font-interegular text-[14px] font-[400] rounded-[10px] ${bg} w-[95%] rounded-[inherit]`} />
            </div>
        )
    }
}