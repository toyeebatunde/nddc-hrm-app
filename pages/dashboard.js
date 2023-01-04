import ImageHolder from "../components/ImageHolder"
import logoYellow from '../public/icons/payrail-logo-circle.svg'
import agentMetrics from '../public/icons/agent-metrics.svg'
import loanMetrics from '../public/icons/loan-performance.svg'
import TestImageHolder from "../components/TestImageHolder"
import tabs from "../components/Tabs"
import SideTabs from "../components/SideTabs"
import { useEffect, useState } from "react"



export default function Dashboard({ children }) {
    const [activeDashboard, setActiveDashboard] = useState("AgentMetrics")

    function switchBoard(e,board) {
        // debugger
        // let newHeight = e.target.parentElement.offsetHeight.toString()
        // e.target.parentElement.style.height = `${newHeight}px`
        // setActiveDashboard(board)
    }

    

    return (
        <div className="w-full flex">
            <div className="flex w-[247.49px] h-screen bg-[#FAFBFC] flex-col relative pl-[50px]">
                <div className="relative mt-[46px] w-[66.32px] h-[66.32px]">
                    <ImageHolder src={logoYellow} />
                </div>
                <ul className="flex flex-col w-[197px] mt-[13px] min-h-fit pb-2">

                    {tabs.map((tab, idx) => {
                        console.log(tab)
                        return <SideTabs key={idx} text={tab.text} dataSet={tab.data} subTexts={tab.subTexts} activeDashboard={activeDashboard} setActiveDashboard={setActiveDashboard} switchBoard={switchBoard}  />
                    })}
                </ul>
                <div className=" flex w-[156px] h-[50px] absolute justify-around border bottom-2">
                    <div className="w-[50px] h-[50px] border rounded-[50%]"></div>
                    <div className="flex flex-col">
                        Logout
                        <br />
                        <div className="font-[400] text-[12px] leading-[15.62px] font-pushPennyBook text-brand-yellow">
                            Change Password</div>
                    </div>
                </div>
            </div>
        </div>
    )
}