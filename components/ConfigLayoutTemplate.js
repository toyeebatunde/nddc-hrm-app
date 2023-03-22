
import { useState, useRef } from "react"
import ButtonTab from "./ButtonTab"

export default function SubLayoutTemplate({ modals, setModalState, children, activeTab, setActiveTab, activeAgency, activeState }) {
    // const [activeTab, setActiveTab] = useState("")
    const [createRole, setCreateRole] = useState(false)

    function setTab(tab) {
        setActiveTab(tab)
    }

    const getModalRef = useRef()
    const getModalButtonRef = useRef()

    const tabs = [
        {
            name: "Settings",
            url: "/dashboard/system/configuration/settings",
        },
        {
            name: "Charges",
            url: "/dashboard/system/configuration/charges",
        },
        {
            name: "Referrers",
            url: "/dashboard/system/configuration/referrers",
        },
        {
            name: "Authentication",
            url: "/dashboard/system/configuration/authentication",
        },
        {
            name: "Currency",
            url: "/dashboard/system/configuration/currency",
        },
        {
            name: "FAQs",
            url: "/dashboard/system/configuration/faqs",
        },

    ]

    const userTabs = [
        {
            name: "Team",
            url: "/dashboard/system/user-management",
        },
        {
            name: "Roles and Privileges",
            url: "/dashboard/system/user-management/roles-and-privileges",
        },
    ]


    return (
        <div className={`flex relative flex-col items-start pt-[60px] w-full`}>
            <section className={`w-full flex px-4 justify-between ${modals.isOpen ? "blur-sm" : "blur-none"} `}>
                <h4 className="font-pushpennyMedium text-[36px] leading-[47px]">
                    System
                </h4>
            </section>
            <section className={`h-[44px] flex flex-col w-full px-4 relative mt-5 ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <div className={`flex w-full ${activeAgency == "Configurations" ? "justify-start gap-[50px]" : "justify-start gap-[100px]"} relative`}>
                    {activeAgency == "Configurations" ? tabs.map((tab, index) => <div key={index}><ButtonTab tabKey={index} name={tab.name} url={tab.url} activeTab={activeTab} link={true} setTab={setActiveTab} /></div>) : userTabs.map((tab, index) => <div key={index}><ButtonTab tabKey={index} name={tab.name} url={tab.url} activeTab={activeTab} link={true} setTab={setActiveTab} /></div>) }
                    {/* {tabs.map((tab, index) => <div key={index}><ButtonTab tabKey={index} name={tab.name} url={tab.url} activeTab={activeTab} link={true} setTab={setTab} /></div>)} */}
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