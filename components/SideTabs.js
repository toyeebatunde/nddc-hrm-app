import ImageHolder from "./ImageHolder"
import { useState, useEffect } from "react"
import SingleTab from "./SingleTab"
import Link from "next/link"

export default function SideTabs({ text, dataSet, subTexts, activeDashboard, setActiveDashboard, switchBoard, switchActive, activeState, closeSideBar }) {
    const [tabImage, setTabImage] = useState()

    const activeClass = dataSet == activeState ? "active" : ""
    const activeBar = dataSet == activeState ? "block" : "hidden"

    useEffect(()=>{        
        setTabImage(subTexts.inactive)
    },[subTexts])    

    const theNode=(event)=>{
        console.log(event)
        
    }

    
    // debugger
    // console.log(dataSet)
    return (
        <li data-tab={dataSet} className={`${activeClass} w-full group relative tab-parent cursor-pointer mt-2 justify-between flex flex-col`}>
            <div className="font-pushPennyMedium z-30 bg-[#FAFBFC] flex items-start justify-between min-h-[24px] z-50 text-[16px] leading-[18px] font-[700]">
                {text}
                <div className={`bg-black h-1 rounded-2xl w-[100px] mt-2 ${activeBar} group-hover:block`}></div>
            </div>
            {subTexts.map((text, index)=>{
                let newId = text.text.replaceAll(' ','')
                return <SingleTab key={index} dataSet={dataSet} text={text} index={newId} activeDashboard={activeDashboard} setActiveDashboard={setActiveDashboard} switchBoard={switchBoard} activeState={activeState} switchActive={switchActive} link={text.link} closeSideBar={closeSideBar} />
            })}
        </li>
    )
}
// switchBoard={switchBoard}

