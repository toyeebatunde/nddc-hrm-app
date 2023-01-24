
import ImageHolder from "../components/ImageHolder"
import logoYellow from '/public/icons/payrail-logo-circle.svg'
import agentMetrics from '../public/icons/agent-metrics.svg'
import loanMetrics from '../public/icons/loan-performance.svg'
import TestImageHolder from "../components/TestImageHolder"
import { tabs } from "../components/Tabs"
import SideTabs from "../components/SideTabs"
import { useEffect, useState, useRef } from "react"
import chevronRight from "../public/icons/chevron-right-2.svg"
import Modal from "./modal"



export default function Dashboard({ children, modals, setModalState }) {
    const [activeDashboard, setActiveDashboard] = useState("AgentMetrics")
    const [activeState, setActiveState] = useState("0")
    const [isFull, setIsFull] = useState()
    const bodyRef = useRef()
    const sideBarMargin = isFull ? "-ml-[255px]" : "ml-[0]"

    function switchBoard(e, board, active) {
        setActiveDashboard(board)
        setActiveState(active)
    }

    function switchActive(e, active) {
        setActiveState(active)
    }


    useEffect(() => {
        window.innerWidth < 1024 ? setIsFull(true) : setIsFull(false)
        function logWindow() {
            window.innerWidth < 1024 ? setIsFull(true) : setIsFull(false)
        }
        window.addEventListener('resize', logWindow)

        return function unlog() {
            window.removeEventListener('resize', logWindow)
        }
    }, [children])

    function openSideBar() {
        if (window.innerWidth > 1024) {
            return
        }
        setIsFull(false)
    }

    function closeSideBar() {
        if (window.innerWidth > 1024) {
            return
        }

        setIsFull(true)
    }

    function closeModal(e) {
        if(e.target.id == "modalLayer"){
        setModalState(false)
        return
        }
    }

    
    return (
        <div className={`w-full h-screen flex justify-between overflow-auto`}>
            <div id="modalLayer" onClick={(e)=>{closeModal(e)}} className={`w-full h-full bg-[#000000] opacity-[0.8] fixed justify-center ${modals.isOpen ? "flex" : "hidden"} items-center top-0 z-[150]`}>
                <Modal closeModal={closeModal} />
            </div>            

            
            <div onClick={openSideBar} className="fixed left-[10px] cursor-pointer lg:left-[50px] z-[95]">
                <div className="relative side-bar mt-[46px] w-[40px] h-[40px] lg:w-[66.32px] lg:h-[66.32px]">
                    <ImageHolder src="/icons/payrail-logo-circle.svg" />
                </div>
            </div>
            <div onClick={openSideBar} className={`w-[45px] ${isFull ? "ml-0" : "-ml-[46px]"} h-screen sticky top-0 bg-[#FAFBFC] block z-[90] pl-[10px] relative`}>
                <div className="mt-[150px] w-fit sticky top-[140px]">
                    <div className={`${isFull ? "block" : "hidden"} relative w-[24px] h-[24px]`}>
                        <ImageHolder src="/icons/chevron-right-2.svg" />
                    </div>
                </div>
            </div>
            <div onMouseLeave={closeSideBar} className={`flex z-[57] ${sideBarMargin} transition-all linear duration-[0.3s] w-[255px] h-screen bg-[#FAFBFC] flex-col fixed lg:relative top-0 pl-[50px] ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <ul className="flex flex-col w-[197px] sticky top-[90px] mt-[150px] min-h-fit pb-2">
                    {tabs.map((tab, idx) => {
                        return <SideTabs key={idx} dataSet={tab.data} text={tab.text} subTexts={tab.subTexts} height={tab.height} activeDashboard={activeDashboard} setActiveDashboard={setActiveDashboard} switchBoard={switchBoard} switchActive={switchActive} activeState={activeState} closeSideBar={closeSideBar} />
                    })}
                </ul>
                <div className=" flex w-[156px] h-[50px] absolute justify-around bottom-2">
                    <div className="w-[50px] h-[50px] border border-[#dddddd] rounded-[50%]"></div>
                    <div className="flex flex-col">
                        Logout
                        <br />
                        <div className="font-[400] text-[12px] leading-[15.62px] font-pushPennyBook text-brand-yellow">
                            Change Password</div>
                    </div>
                </div>
            </div>
            <div className=" grow h-[fit] overflow-auto pb-[50px]">
                {children}
               
            </div>
        </div>
    )
}