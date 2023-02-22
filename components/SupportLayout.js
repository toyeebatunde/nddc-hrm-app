
import { useState } from "react"
import DateSelector from "./DateSelector"
import ButtonTab from "./ButtonTab"
import ImageHolder from "./ImageHolder"
import UserButton from "./ButtonMaker"
import { useRouter } from "next/router"


export default function SupportLayoutTemplate({ children, title, modals, activeAgency, viewState, setView, activeTab, setActiveTab }) {

    return (
        <div className="flex flex-col items-center pt-[60px] w-full">
            <section className="w-full flex flex-col sm:flex-row px-4 justify-between">
                <h4 className="font-pushpennyMedium text-[36px] leading-[47px]">
                    Support
                </h4>               
            </section>
            <section className={`w-full relative mt-[10px] px-5 `}>
                {children}
            </section>
        </div>
    )
}