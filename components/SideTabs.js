import ImageHolder from "./ImageHolder"
import { useState, useEffect, useRef } from "react"
import SingleTab from "./SingleTab"
import Link from "next/link"

export default function SideTabs({permissions, text, dataSet, subTexts, activeDashboard, setActiveDashboard, full, height, switchBoard, switchActive, activeState, closeSideBar }) {
    const [tabImage, setTabImage] = useState()
    const [newPermissions, setNewPermissions] = useState([])
    const [newFullHeight, setNewFullHeight] = useState(25) 
    const [newHoverHeight, setNewHoverHeight] = useState("hover:h-[25px]")
    const sideTabRef = useRef(null) 


    const activeBar = dataSet == activeState ? "block" : "hidden"

    function handleHeight(size) {

        if(dataSet == activeState) {
            setNewFullHeight(()=>{   
                return 30 + 10 + (subTexts.length*30)             
            })
            return
        }

        if(size == "full") {
            setNewFullHeight(()=>{   
                return 30 + 10 + (subTexts.length*30)             
            })
            return
        }
        
        setNewFullHeight(()=>{   
            return 30             
        })
        return
    }

    useEffect(() => {
        setTabImage(subTexts.inactive)
        if(permissions) {
            setNewPermissions(permissions)
        }
    }, [subTexts, permissions])

    useEffect(()=>{
        if(dataSet == activeState) {
            setNewFullHeight(()=>{   
                return 30 + 10 + (subTexts.length*30)             
            })
        } else {
            setNewFullHeight(25)
        }
    },[activeState])

    const theNode = (event) => {
        console.log(event)

    }

    

    return (
        <li style={{height: `${newFullHeight}px`}} ref={sideTabRef} onMouseOut={()=>{handleHeight("")}} onMouseOver={()=>{handleHeight("full")}} data-tab={dataSet} className={`w-full group transition-all linear duration-[1s] overflow-hidden relative cursor-pointer pb-[10px] mt-[20px] gap-[10px] flex flex-col`}>
            <div className="font-pushPennyMedium hover:text-[#2dcd7c] z-30 bg-[#FAFBFC] flex items-start justify-between h-[24px] z-50 text-[15px] borde leading-[18px] flex-col font-[700]">
                <h2>{text}</h2>
                {/* <div className={`bg-black h-[10px] rounded-2xl w-[50px] mt-2 ${activeBar} group-hover:block`}></div> */}
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

