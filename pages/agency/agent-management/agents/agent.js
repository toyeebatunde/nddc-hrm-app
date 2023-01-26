// import ImageHolder from '../../components/ImageHolder'
// import directionDown from '../../public/icons/direction-down.svg'
// import down from '../../public/icons/down.svg'
// import arrowUpGreen from '../../public/icons/arrow-up-green-circle.svg'
// import searchIcon from '../../public/icons/search-icon.svg'
// import closeIcon from '../../public/icons/close-modal.svg'
// import { useState, useRef, useEffect } from "react"
// import tick from '../../public/icons/tick.svg'
// import RadioToggle from "../../components/radioToggle"
// import ButtonTab from "../../components/ButtonTab"

export default function Agent({ modals, setModalState }) {
    function setTab(tab) {
        setActiveTab(tab)
    }


    return (
        <div className={`flex relative flex-col items-start pt-[60px] overflow-hidden w-full`}>
            <section className={`w-full flex px-4 justify-between ${modals.isOpen ? "blur-sm" : "blur-none"} `}>
                <h4 className="font-pushpennyMedium text-[36px] leading-[47px]">
                    Agency
                </h4>
            </section>
            <h2 className="mt-[40px] ml-4 font-pushpennyBook">Agent Management</h2>
            <section className="flex px-4 flex-col gap-[3%] lg:flex-row w-full">
                <div className="flex flex-col w-full border lg:w-[47%]">
                    <div className="border w-full h-[566px]"></div>
                    <div className="border w-full h-[513px]"></div>
                    <div className="border w-full h-[705px] overflow-y-auto"></div>
                </div>
                <div className="flex flex-col w-full lg:w-[50%]">
                    <div className="border flex h-[513px] flex-col lg:flex-row w-full">
                        <div className="w-full lg:w-[49%] border h-full"></div>
                        <div className="w-full lg:w-[49%] border h-full"></div>
                    </div>
                    <div className="flex-col w-full h-[763px] border"></div>
                </div>
            </section>
        </div>
    )
}