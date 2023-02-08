
import { useState, useEffect } from "react"
import ImageHolder from "./ImageHolder"


export default function Textfield({ title, type = "text", value, name, bg="bg-[#F3F3F3]", formEdit, selectOptions="", charType = "text" }) {
    const [focusState, setFocusState] = useState(false)
   

    useEffect(()=>{},[value])

    function onChange(e) {
        setFormFields({ ...formFields, [e.target.name]: e.target.value })
    }

    if (type == "select") {
        return (
            <div className="flex flex-col relative lg:h-[35px] h-[50px] group justify-center lg:w-[45%] w-[95%] m-auto rounded-[10px]">
                <label className="text-[12px] font-[400] top-[-10px] left-[25px] font-interegular absolute w-fit text-[#777777] bg-[white] px-[4px]">{title}</label>
                <select name={name} onChange={(e)=>{formEdit(e)}} className=" outline-none pl-[25px] border font-interegular text-[14px] font-[400] rounded-[10px] border-[#D4D4D4] focus:border-[#F7941D] w-full lg:h-[35px] h-[50px]">
                    {/* <option value="Transporters">Transporters</option>
                    <option value="Producers">Producers</option>
                    <option value="Investors">Investors</option> */}
                    {selectOptions.map((option, index)=> {
                        if(option == value) {
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
            <div className="flex flex-col  relative group justify-center w-[95%] lg:w-[45%] m-auto rounded-[10px]">
                <textarea rows="4" cols="50" placeholder={title} className="outline-none pl-[25px] font-interegular text-[14px] font-[400] rounded-[10px] border border-[#D4D4D4] focus:border-[#F7941D] w-full h-[90px]" />
            </div>
        )
    }
    if (type == "text") {
        return (
            <div className="flex items-center relative h-full group justify-center w-full  rounded-[inherit]">
                <label className="text-[12px] font-[400] top-[-10px] left-[45px] font-interegular absolute w-fit text-[#777777] bg-[#F3F3F3] px-[4px]">{title}</label>
                <input type={charType} name={name} onChange={(e)=>{formEdit(e)}} value={value} className={`h-full outline-none pl-[25px] font-interegular text-[14px] font-[400] rounded-[10px] ${bg} w-[95%] rounded-[inherit]`} />
            </div>
        )
    }
}