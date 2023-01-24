
import { useState, useRef} from "react"
import ButtonTab from "./ButtonTab"

export default function ApprovalsLayoutTemplate({ modals, setModalState, children }) {
    const [activeTab, setActiveTab] = useState("")

    function setTab(tab) {
        setActiveTab(tab)
    }

    const getModalRef = useRef()
    const getModalButtonRef = useRef()

    const tabs = [
        {
            name: "All",
            url: "all",
        },
        {
            name: "Pending Approvals",
            url: "pending-approval",
        },
        {
            name: "My Initiation",
            url: "user-initiated",
        },
        
              
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
                    {tabs.map((tab, index)=><ButtonTab tabKey={index} name={tab.name} url={tab.url} activeTab={activeTab} link={true} setTab={setTab} />)}
                </div>
                <div className="border-b-[0.5px] mt-auto z-10 border-[#979797]"></div>
            </section>
            <div className='w-full'>
            {children}
            </div>
            <div className='w-full'>
            </div>
        </div>
    )
}