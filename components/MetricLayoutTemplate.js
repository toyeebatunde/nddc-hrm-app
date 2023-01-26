
import { useState } from "react"
import DateSelector from "../components/DateSelector"
import ButtonTab from "./ButtonTab"
import ImageHolder from "./ImageHolder"
import UserButton from "./ButtonMaker"


export default function MetricLayoutTemplate({ children, title, modals }) {
    const [dateRange, setDateRange] = useState({ dateFrom: getPreviousDay(), dateTo: new Date() })
    const [activeTab, setActiveTab] = useState("")

    function setTab(tab) {
        setActiveTab(tab)
    }

    const tabs = [
        {
            name: "Agents",
            url: "/agency/agent-management/agents"
        },
        {
            name: "New Agents",
            url: "/agency/agent-management/new-agents"
        },
        {
            name: "KYC Pending approvals",
            url: "/agency/agent-management/pending-approval"
        },
    ]

    function getPreviousDay(date = new Date()) {
        const previous = new Date(date.getTime());
        previous.setDate(date.getDate() - 7);

        return previous;
    }
    const ninety = "90"

    return (
        <div className="flex flex-col items-center pt-[60px] w-full">
            <section className="w-full flex flex-col sm:flex-row px-4 justify-between">
                <h4 className="font-pushpennyMedium text-[36px] leading-[47px]">
                    Agency
                </h4>
                <DateSelector dateRange={dateRange} setDateRange={setDateRange} directionDown="/icons/direction-down.svg" />
            </section>
            <section className={`h-[44px] flex flex-col w-full px-4 relative mt-5 ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <div className="flex w-full z-[40] absolute h-full top-[1px] approvals-tab justify-start relative">
                    {tabs.map((tab, index) => <div><ButtonTab tabKey={index} name={tab.name} url={tab.url} activeTab={activeTab} link={true} setTab={setTab} /></div>)}
                </div>
                <div className="border-b-[2px] z-[10] mt-auto z-10 border-[#979797]"></div>
            </section>
            <section className={`px-4 flex justify-center w-full ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <section className={`px-[40px] mdxl:px-[10px] pt-2 pb-2 w-fit md:w-full mt-8 h-fit lg:h-[61px] flex flex-col mdxl:flex-row justify-between items-center rounded-[48px] bg-[#F3F3F3] md:pr-[60px]`}>
                    <section className="md:w-[250px] h-[40px] bg-white rounded-[20px] px-2 relative flex items-center justify-between">
                        <input className="search-tab rounded-[20px] w-[80%]" placeholder="Search member" />
                        <div className="w-[28px] h-[28px] relative">
                            <ImageHolder src='/icons/search-icon.svg' />
                        </div>
                    </section>
                    <div className='grow flex flex-col lg:mt-0 mt-[10px] w-full lg:flex-row lg:justify-end gap-[10px] lg:h-[35px]'>
                        <div className="h-[35px] w-full lg:w-[200px]">
                            <UserButton type="file" />
                        </div>
                        <div className="h-[35px]  w-full lg:w-[200px]">
                            <UserButton type="pdf" />
                        </div>
                        <div className="h-[35px]  w-full lg:w-[200px]">
                            <UserButton type="gradient" text="+ Add New Agents" />
                        </div>
                    </div>
                </section>
            </section>
            <section className={`w-full relative mt-[10px] `}>
                {children}
            </section>
        </div>
    )
}