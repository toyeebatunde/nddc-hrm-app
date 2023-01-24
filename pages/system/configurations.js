import ImageHolder from '../../components/ImageHolder'
import directionDown from '../../public/icons/direction-down.svg'
import down from '../../public/icons/down.svg'
import arrowUpGreen from '../../public/icons/arrow-up-green-circle.svg'
import searchIcon from '../../public/icons/search-icon.svg'
import closeIcon from '../../public/icons/close-modal.svg'
import { useState, useRef, useEffect } from "react"
import tick from '../../public/icons/tick.svg'
import RadioToggle from "../../components/radioToggle"
import ConfigCards from "../../components/ConfigCards"
import { configurationCards } from "../../components/Tabs"
import ButtonTab from "../../components/ButtonTab"

export default function Configuration({ modals, setModalState }) {
    const [activeTab, setActiveTab] = useState("Settings")
    const [createRole, setCreateRole] = useState(false)

    function setTab(tab) {
        setActiveTab(tab)
    }

    const getModalRef = useRef()
    const getModalButtonRef = useRef()

    const tabs = [
        "Settings",
        "Charges",
        "Referrers",
        "Code",
        "Currency",
        "Content",
        "FAQs",
        "Approvals"
    ]


    return (
        <div className={`flex relative flex-col items-start pt-[60px] w-full`}>
            <section className={`w-full flex px-4 justify-between ${modals.isOpen ? "blur-sm" : "blur-none"} `}>
                <h4 className="font-pushpennyMedium text-[36px] leading-[47px]">
                    System
                </h4>
            </section>
            <section className={`h-[44px] flex w-full px-4 relative mt-5 ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <div className="flex w-full justify-between relative">
                    {tabs.map((tab, index)=><ButtonTab key={index} name={tab} activeTab={activeTab} setTab={setTab} />)}
                </div>
                <div className="border-b-[0.5px] mt-auto z-10 border-[#979797]"></div>
            </section>
           <>
           <div className='w-full'>
           
            </div>
           </>
        </div>
    )
}