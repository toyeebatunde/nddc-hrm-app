
import ImageHolder from '../../../components/ImageHolder'
import directionDown from '../../../public/icons/direction-down.svg'
import down from '../../../public/icons/down.svg'
import arrowUpGreen from '../../../public/icons/arrow-up-green-circle.svg'
import searchIcon from '../../../public/icons/search-icon.svg'
import closeIcon from '../../../public/icons/close-modal.svg'
import { useState, useRef, useEffect } from "react"
import tick from '../../../public/icons/tick.svg'
import RadioToggle from "../../../components/radioToggle"
import ConfigCards from "../../../components/ConfigCards"
import { configurationCards } from "../../../components/Tabs"
import ButtonTab from "../../../components/ButtonTab"
import SubLayoutTemplate from '../../../components/ConfigLayoutTemplate'

export default function Configuration({ modals, setModalState }) {
    const [activeTab, setActiveTab] = useState("")
    const [createRole, setCreateRole] = useState(false)

    function setTab(tab) {
        setActiveTab(tab)
    }

    const getModalRef = useRef()
    const getModalButtonRef = useRef()


    return (
        // <div className={`flex relative flex-col items-start pt-[60px] w-full`}>
        //     <section className={`w-full flex px-4 justify-between ${modals.isOpen ? "blur-sm" : "blur-none"} `}>
        //         <h4 className="font-pushpennyMedium text-[36px] leading-[47px]">
        //             System
        //         </h4>
        //     </section>
        //     <section className={`h-[44px] flex w-full px-4 relative mt-5 ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
        //         <div className="flex w-full justify-between relative">
        //             {tabs.map((tab, index)=><ButtonTab key={index} name={tab.name} url={tab.url} activeTab={activeTab} link={true} setTab={setTab} />)}
        //         </div>
        //         <div className="border-b-[0.5px] mt-auto z-10 border-[#979797]"></div>
        //     </section>
        //     <div className='w-full'>
        //     <section className="p-4 mt-5 w-full grid grid-cols-1 sm:grid-cols-2 xlg:grid-cols-3 gap-4 min-h-[400px]">
        //         {configurationCards.map(card => {
        //             return <ConfigCards url={card.url} title={card.title} detail={card.detail} />
        //         })}
        //     </section>
        //     </div>
        // </div>
        <section className="p-4 mt-5 w-full grid grid-cols-1 sm:grid-cols-2 xlg:grid-cols-3 gap-4 min-h-[400px]">
            {configurationCards.map(card => {
                return <ConfigCards url={card.url} title={card.title} detail={card.detail} />
            })}
        </section>
    )
}

Configuration.Layout = SubLayoutTemplate