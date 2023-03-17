import ImageHolder from "./ImageHolder"
import { useState, useEffect } from "react"
import SingleTab from "./SingleTab"
import Link from "next/link"

export default function SideTabs({permissions, text, dataSet, subTexts, activeDashboard, setActiveDashboard, full, height, switchBoard, switchActive, activeState, closeSideBar }) {
    const [tabImage, setTabImage] = useState()
    const [newPermissions, setNewPermissions] = useState([])


    // const activeClass = dataSet == activeState ? "active" : ""
    const activeBar = dataSet == activeState ? "block" : "hidden"

    useEffect(() => {
        setTabImage(subTexts.inactive)
        if(permissions) {
            setNewPermissions(permissions)
        }
    }, [subTexts, permissions, height])

    const theNode = (event) => {
        console.log(event)

    }


    // debugger
    // console.log(dataSet)
    return (
        <li data-tab={dataSet} className={`w-full group ${dataSet == activeState ? `${full}` : "h-[24px]"} transition-all linear duration-[1s] ${height} overflow-hidden relative cursor-pointer pb-[10px] mt-[20px] gap-[5px] flex flex-col`}>
            <div className="font-pushPennyMedium z-30 bg-[#FAFBFC] flex items-start justify-between h-[24px] z-50 text-[16px] leading-[18px] font-[700]">
                {text}
                <div className={`bg-black h-1 rounded-2xl ${text == "Insights and Reports" ? "w-[40px]" : "w-[100px]"} mt-2 ${activeBar} group-hover:block`}></div>
            </div>

            <ul className={`h-fit transition-all linear duration-[0.3s]`}>
                {subTexts.map((text, index) => {
                    let newId = text.text.replaceAll(' ', '')
                    return (
                        <SingleTab key={index} position={index} dataSet={dataSet} text={text} index={newId} activeDashboard={activeDashboard} setActiveDashboard={setActiveDashboard} switchBoard={switchBoard} activeState={activeState} switchActive={switchActive} link={text.link} closeSideBar={closeSideBar} />

                    )
                })}
            </ul>

        </li>
    )
}
// switchBoard={switchBoard}

