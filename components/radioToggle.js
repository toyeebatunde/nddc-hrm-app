import tick from '../public/icons/tick.svg'
import { useState } from 'react'
import ImageHolder from './ImageHolder'


export default function RadioToggle({parent, label}) {
    const [toggleState, setToggleState] = useState(false)
    const [toggleStateAnother, setToggleStateAnother] = useState("Hide")
    const [toggleStateLast, setToggleStateLast] = useState(false)

    function tickRadio(e, state) {
        // console.log(e)        
        e.nativeEvent.path[3].classList.add("radio-checked")
        if(toggleState == state){
            return
        } 
        setToggleState(!toggleState)       
        // let domArray = Array.from(e.path)
        // console.log (domArray)
    }
    function tickRadioLast(e, state) {
        // console.log(e)        
        e.nativeEvent.path[3].classList.add("radio-checked")
        if(toggleState == state){
            return
        } 
        setToggleState(!toggleState)       
        // let domArray = Array.from(e.path)
        // console.log (domArray)
    }

    function tickRadioAnother(e, state) {
        // console.log(e)        
        e.nativeEvent.path[3].classList.add("radio-checked")
        setToggleStateAnother(state)       
        // let domArray = Array.from(e.path)
        // console.log (domArray)
    }


    if(parent == "System") {
        return   <div className="flex justify-between">
        <p className='font-pushpennyBook text-[14px] font-400 leading-[22px] text-[#6E7883]'>{label}</p>
        <div className="flex  border-black w-[183px] h-[18px] justify-between items-center">
            <section className=" flex justify-between items-center w-[56px]">
                <div onClick={(e)=>{tickRadio(e,true)}} className={`${toggleState ? "radio-checked" : ""} border border-[2px] h-[16px] w-[16px] border-gray rounded-[50%] relative flex justify-center items-center`}>
                    <div className="relative w-[95%] rounded-[50%] h-[95%]">
                        <ImageHolder src={tick}></ImageHolder>
                    </div>
                </div>
                <p className="font-400 text-[14px] leading-[18.23px font-pushpennyBook]">Yes</p>
            </section>
            <section className=" flex justify-between items-center w-[56px]">
                <div onClick={(e)=>{tickRadio(e,false)}} className={`${toggleState ? "" :"radio-checked"} border border-[2px] h-[16px] w-[16px] border-gray rounded-[50%] relative flex justify-center items-center`}>
                    <div className="relative w-[95%] rounded-[50%] h-[95%]">
                        <ImageHolder src={tick}></ImageHolder>
                    </div>
                </div>
                <p className="font-400 text-[14px] leading-[18.23px font-pushpennyBook]">No</p>
            </section>
        </div>
    </div>
    }
    if((parent == "Agency") || (parent == "Insights and Reports") || (parent == "Loan")) {
        return   <div className="flex justify-between">
        <p className='font-pushpennyBook text-[14px] font-400 leading-[22px] text-[#6E7883]'>{label}</p>
        <div className="flex  border-black w-[319px] h-[18px] justify-between items-center">
            <section className=" flex justify-between items-center w-[56px]">
                <div onClick={(e)=>{tickRadioAnother(e,"View")}} className={`${toggleStateAnother == "View" ? "radio-checked" : ""} border border-[2px] h-[16px] w-[16px] border-gray rounded-[50%] relative flex justify-center items-center`}>
                    <div className="relative w-[95%] rounded-[50%] h-[95%]">
                        <ImageHolder src={tick}></ImageHolder>
                    </div>
                </div>
                <p className="font-400 text-[14px] leading-[18.23px font-pushpennyBook]">View</p>
            </section>
            <section className=" flex justify-between items-center w-[56px]">
                <div onClick={(e)=>{tickRadioAnother(e,"Edit")}} className={`${toggleStateAnother == "Edit" ? "radio-checked" :""} border border-[2px] h-[16px] w-[16px] border-gray rounded-[50%] relative flex justify-center items-center`}>
                    <div className="relative w-[95%] rounded-[50%] h-[95%]">
                        <ImageHolder src={tick}></ImageHolder>
                    </div>
                </div>
                <p className="font-400 text-[14px] leading-[18.23px font-pushpennyBook]">Edit</p>
            </section>
            <section className="flex justify-between items-center w-[56px]">
                <div onClick={(e)=>{tickRadioAnother(e,"Hide")}} className={`${toggleStateAnother == "Hide" ? "radio-checked" :""} border border-[2px] h-[16px] w-[16px] border-gray rounded-[50%] relative flex justify-center items-center`}>
                    <div className="relative w-[95%] rounded-[50%] h-[95%]">
                        <ImageHolder src={tick}></ImageHolder>
                    </div>
                </div>
                <p className="font-400 text-[14px] leading-[18.23px font-pushpennyBook]">Hide</p>
            </section>
        </div>
    </div>
    }

    if(parent == "Support") {
        return   <div className="flex justify-between">
        <p className='font-pushpennyBook text-[14px] font-400 leading-[22px] text-[#6E7883]'>{label}</p>
        <div className="flex  border-black w-[183px] h-[18px] justify-between items-center">
            <section className=" flex justify-between items-center w-[56px]">
                <div onClick={(e)=>{tickRadioLast(e,true)}} className={`${toggleState ? "radio-checked" : ""} border border-[2px] h-[16px] w-[16px] border-gray rounded-[50%] relative flex justify-center items-center`}>
                    <div className="relative w-[95%] rounded-[50%] h-[95%]">
                        <ImageHolder src={tick}></ImageHolder>
                    </div>
                </div>
                <p className="font-400 text-[14px] leading-[18.23px font-pushpennyBook]">Edit</p>
            </section>
            <section className=" flex justify-between items-center w-[56px]">
                <div onClick={(e)=>{tickRadioLast(e,false)}} className={`${toggleState ? "" :"radio-checked"} border border-[2px] h-[16px] w-[16px] border-gray rounded-[50%] relative flex justify-center items-center`}>
                    <div className="relative w-[95%] rounded-[50%] h-[95%]">
                        <ImageHolder src={tick}></ImageHolder>
                    </div>
                </div>
                <p className="font-400 text-[14px] leading-[18.23px font-pushpennyBook]">Hide</p>
            </section>
        </div>
    </div>
    }
}