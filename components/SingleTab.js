import { useEffect, useState } from "react";
import ImageHolder from "./ImageHolder";
import Link from "next/link";

export default function SingleTab({ text, index, dataSet, position, activeDashboard, setActiveDashboard, switchBoard, activeState, link, closeSideBar }) {
    const [hoverState, setHoverState] = useState(false)
    const activeClass = dataSet == activeState ? "active" : ""

    function manageHoverState(event, id) {
        if (event.type == "mouseout") {
            setHoverState(false)
            return
        }
        setHoverState(true)
    }

    function checkActive(activeId) {
        if (activeId == index) {
            return true
        }
        if (activeId == index && hoverState == true) {
            return
        }
        if (activeId != index && hoverState == true) {
            return true
        }
        return false
    }



    return (
        <>
            <Link href={`${link}`}>
                <div id={index} onClick={(e) => {switchBoard(e, index, dataSet), closeSideBar() }} onMouseOver={manageHoverState} onMouseOut={manageHoverState} className={`flex  relative borde justify-start ${position == 0 ?" " : "mt-[5px]"} w-full h-[25px] items-center font-pushPennyMedium font-[500] text-[13px] hover:text-[#2dcd7c] leading-[24px] `}>
                    <div className={`w-[24px] h-[24px] relative agent-metrics bg-cover`}>
                        <ImageHolder src={checkActive(activeDashboard) ? text.active : text.inactive} />
                    </div>
                    <div data-stab={dataSet} className="ml-4">{text.text}</div>
                </div>
            </Link>
        </>
    )
}