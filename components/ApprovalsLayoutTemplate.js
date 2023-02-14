
import { useState, useRef} from "react"
import ButtonTab from "./ButtonTab"
import ImageHolder from "./ImageHolder"

export default function ApprovalsLayoutTemplate({ modals, setModalState, children }) {
    const [activeTab, setActiveTab] = useState("")

    function setTab(tab) {
        setActiveTab(tab)
    }

    const tabs = [
        {
            name: "All",
            url: "/system/approvals/all",
        },
        {
            name: "Pending Approvals",
            url: "/system/approvals/pending-approvals",
        },
        {
            name: "My Initiation",
            url: "/system/approvals/user-initiated",
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
                <div className="flex w-full approvals-tab justify-start relative">
                    {tabs.map((tab, index)=> <div key={index}><ButtonTab tabKey={index} name={tab.name} url={tab.url} activeTab={activeTab} link={true} setTab={setTab} /></div>)}
                </div>
                <div className="border-b-[0.5px] mt-auto z-10 border-[#979797]"></div>
            </section>
            <section className={`px-[40px] mdxl:px-[10px] pt-2 pb-2 w-full md:w-full mt-8 h-fit lg:h-[61px] flex flex-col mdxl:flex-row justify-between items-center rounded-[48px] bg-[#F3F3F3] md:pr-[60px]`}>
                <section className="w-full lg:w-[354px] h-[40px] bg-white rounded-[20px] px-2 relative flex items-center justify-between">
                    <input className="search-tab rounded-[20px] w-[80%]" placeholder="Search member" />
                    <div className="w-[28px] h-[28px] relative">
                        <ImageHolder src="/icons/search-icon.svg" />
                    </div>
                </section>

            </section>
            <div className='w-full mt-[20px]'>
            {children}
            </div>
        </div>
    )
}