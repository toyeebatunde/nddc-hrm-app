
import { useState, useEffect } from "react"
import DateSelector from "../components/DateSelector"
import ButtonTab from "./ButtonTab"
import ImageHolder from "./ImageHolder"
import UserButton from "./ButtonMaker"
import { useRouter } from "next/router"
import { tabs } from "./Tabs"



export default function MetricLayoutTemplate({children, modals, activeAgency, viewState, setView, activeTab, setActiveTab, activeState }) {
    const [dateRange, setDateRange] = useState({ dateFrom: getPreviousDay(), dateTo: new Date() })
    // const [activeTab, setActiveTab] = useState("")
    const [tab, setTab] = useState()

    useEffect(()=>{
        if(activeState) {
            setTab(Number(activeState))
        }
    },[activeState])


    



    const agencyTabs = [
        {
            name: "Agents",
            url: "/dashboard/agency/agent-management/agents"
        },
        {
            name: "New Agents",
            url: "/dashboard/agency/agent-management/new-agents"
        },
        {
            name: "KYC Pending approvals",
            url: "/agency/agent-management/pending-approval"
        },
    ]
    const transactionTabs = [
        {
            name: "All Transactions",
            url: "/dashboard/agency/transactions"
        },
        {
            name: "Withdrawals",
            url: "/dashboard/agency/transactions/withdrawals"
        },
        {
            name: "Deposits",
            url: "/dashboard/agency/transactions/deposits"
        },
        {
            name: "Utilities",
            url: "/dashboard/agency/transactions/utilities"
        },
        {
            name: "Wallet Fundings",
            url: "/dashboard/agency/transactions/wallet-funding"
        },
    ]
    const ticketTabs = [
        {
            name: "Open Tickets",
            url: "/dashboard/support/ticket-management"
        },
        {
            name: "Answered Tickets",
            url: "/dashboard/support/ticket-management/answered-tickets"
        },
        {
            name: "Closed Tickets",
            url: "/dashboard/support/ticket-management/closed-tickets"
        },
        {
            name: "Ticket Metrics",
            url: "/dashboard/support/ticket-management"
        }
    ]
    const PosTabs = [
        {
            name: "Requests",
            url: "/dashboard/agency/pos-terminals"
        },
        {
            name: "Inventory",
            url: "/dashboard/agency/pos-terminals/inventory"
        }
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
                {tab ? tabs[tab].text : "Agency"}
                </h4>
                <div className={`${activeAgency == "POSTerminals" ? "hidden" : activeAgency == "TicketManagement" ? "hidden" :"flex"} justify-end grow`}>
                <DateSelector dateRange={dateRange} setDateRange={setDateRange} directionDown="/icons/direction-down.svg" />
                </div>
            </section>
            <section className={`h-[44px] ${activeAgency == "Agent Management" ? "flex" : activeAgency == "Transactions" ? "flex" : activeAgency == "POSTerminals" ? "flex": activeAgency == "TicketManagement" ? "flex": "hidden"} flex-col w-full px-4 relative mt-5 ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <div className="flex w-full z-[40] absolute h-full top-[1px] approvals-tab justify-start relative">
                    {activeAgency == "Agent Management" ? agencyTabs.map((tab, index) => <div key={index}><ButtonTab tabKey={index} name={tab.name} url={tab.url} activeTab={activeTab} link={true} setTab={setActiveTab} /></div>) : activeAgency == "Transactions" ? transactionTabs.map((tab, index) => <div key={index}><ButtonTab tabKey={index} name={tab.name} url={tab.url} activeTab={activeTab} link={true} setTab={setActiveTab} /></div>) : activeAgency == "TicketManagement" ? ticketTabs.map((tab, index) => <div key={index}><ButtonTab tabKey={index} name={tab.name} url={tab.url} activeTab={activeTab} link={true} setTab={setActiveTab} /></div>) : PosTabs.map((tab, index) => <div key={index}><ButtonTab tabKey={index} name={tab.name} url={tab.url} activeTab={activeTab} link={true} setTab={setActiveTab} /></div>)}
                </div>
                <div className="border-b-[2px] z-[10] mt-auto z-10 border-[#979797]"></div>
            </section>
            <section className={`px-4 ${activeAgency == "POSTerminals" ? "hidden" : activeAgency == "TicketManagement" ? "hidden" :"flex"} justify-center w-full ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <section className={`px-[40px] mdxl:px-[10px] pt-2 pb-2 w-fit md:w-full mt-8 h-fit lg:h-[61px] ${viewState ? "hidden" : "flex"} flex-col mdxl:flex-row ${activeAgency == "Reconciliation" ? "justify-end" : "justify-between"} items-center rounded-[48px] bg-[#F3F3F3] md:pr-[60px]`}>
                    <section className={`md:w-[250px] h-[40px] bg-white rounded-[20px] px-2 relative ${activeAgency == "Reconciliation" ? "hidden" : "flex"} items-center justify-between`}>
                        <input className="search-tab rounded-[20px] w-[80%]" placeholder="Search member" />
                        <div className="w-[28px] h-[28px] relative">
                            <ImageHolder src='/icons/search-icon.svg' />
                        </div>
                    </section>
                    <div className={`grow flex flex-col lg:mt-0 mt-[10px] w-full lg:flex-row lg:justify-end gap-[10px] lg:h-[35px]`}>
                        <div className={`h-[35px] w-full lg:w-[200px] ${activeAgency == "Reconciliation" ? "hidden" : ""}`}>
                            <UserButton type="file" />
                        </div>
                        <div className="h-[35px]  w-full lg:w-[200px]">
                            <UserButton type="pdf" />
                        </div>
                        <div className={`h-[35px] ${activeAgency == "Agent Management" ? "" : "hidden"}  w-full lg:w-[200px]`}>
                            <UserButton type="gradient" text="+ Add New Agents" />
                        </div>
                    </div>
                </section>
            </section>
            
            <section className={`w-full relative mt-[10px] px-5 `}>
                {children}
            </section>
        </div>
    )
}