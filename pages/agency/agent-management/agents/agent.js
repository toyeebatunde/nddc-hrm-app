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

import UserButton from "../../../../components/ButtonMaker"
import ImageHolder from "../../../../components/ImageHolder"
import RadioToggle from "../../../../components/radioToggle"
import { useState } from "react"
import Toggler from "../../../../components/Toggle"

export default function Agent({ modals, setModalState }) {
    const [toggleStateOne, setToggleStateOne] = useState(false)
    const [toggleStateTwo, setToggleStateTwo] = useState(true)

    const toggle = (e, toggler) => {
        // console.log(e.target.checked)
        toggler(e.target.checked)
      };



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
            <section className="flex px-4 flex-col mt-[35px] gap-[3%] lg:flex-row w-full">
                <div className="flex flex-col w-full lg:w-[47%]">
                    <div className="w-full gap-[7px] h-[520px] flex flex-col">
                        <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                            <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">Mike Ola wallet details</h2>
                            <div className="w-[134px] h-[35px]">
                                <UserButton type="gradient" text="System split" />
                            </div>
                        </div>
                        <div className=" flex border border-[#E8E8E8] flex-col rounded-[10px]">
                            <div className="px-4 flex py-4 flex-col">
                                <div className="flex justify-between">
                                    <h2 className="font-pushpennyBook font-[400] text-[#161616] text-[11px] lg:text-[12px]">TRADING BALANCE</h2>
                                    <div className="flex relative">
                                        <div className="relative w-[24px] h-[24px]">
                                            <ImageHolder src="/icons/configurations.svg" />
                                        </div>
                                        <h2 className="font-pushpennyMedium text-[11px] lg:text-[13px] font-[500] leading-[24px]">Commission Configurations</h2>
                                    </div>
                                </div>
                                <div className="font-[500] text-[40px] font-pushpennyMedium leading-[52px]"> ₦10,078,092.00</div>
                                <div className="w-[210px] h-[50px] pl-4 justify-center border border-[#E8E8E8] rounded-[10px] flex flex-col">
                                    <h2 className="font-pushpennyBook text-[8px] text-[#6E7883] font-[400] leading-[10px]">commission balance</h2>
                                    <h2 className="text-[20px] font-pushpennyMedium text-[#6E7883] font-[500] ">₦70,092.00</h2>
                                </div>
                            </div>
                            <div className="w-full justify-between p-4 h-[258px] bg-[#FBF4EB] flex flex-col rounded-[10px]">
                                <h2 className="font-pushpennyBook text-[12px] font-[400] text-[#6E7883] leading-[15px]">BANK ACCOUNT DETAILS</h2>
                                <div className="flex justify-between">
                                    <h2 className="font-pushpennyBook text-[18px] font-[400] text-[#6E7883] leading-[15px]">ACCOUNT NUMBER</h2>
                                    <h2 className="font-pushpennyBook text-[18px] font-[400] text-[#6E7883] leading-[15px]">091027637183</h2>
                                </div>
                                <div className="flex justify-between">
                                    <h2 className="font-pushpennyBook text-[18px] font-[400] text-[#6E7883] leading-[15px]">ACCOUNT NAME</h2>
                                    <h2 className="font-pushpennyBook text-[18px] font-[400] text-[#6E7883] leading-[15px]">MIKE OLA</h2>
                                </div>
                                <div className="flex justify-between">
                                    <h2 className="font-pushpennyBook text-[18px] font-[400] text-[#6E7883] leading-[15px]">BANK NAME</h2>
                                    <h2 className="font-pushpennyBook text-[18px] font-[400] text-[#6E7883] leading-[15px]">PROVIDUS BANK</h2>
                                </div>
                                <div className="w-[95%] flex self-center h-[36px]">
                                    <UserButton type="transaction" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[513px] gap-[7px] flex flex-col">
                        <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                            <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">Mike Ola wallet details</h2>
                        </div>
                        <div className=" flex border grow border-[#E8E8E8] flex-col rounded-[10px]">
                            <div className="grow w-full justify-around p-4 flex flex-col">
                                <h2 className="font-pushpennyBook text-[12px] font-[400] leading-[14px] text-[#6E7883]">
                                    Manage user account activities
                                </h2>
                                <ul className="flex justify-between border-b border-[#FBF4EB] w-full xl:w-[90%]">
                                    <li className="font-pushpennyBook  text-[12px] font-[400] leading-[15px]">STATUS</li>
                                    <li className="font-pushpennyBook text-[12px] font-[400] leading-[15px]">CREATED ON</li>
                                    <li className="font-pushpennyBook text-[12px] font-[400] leading-[15px]">LAST LOGIN</li>
                                    <li className="font-pushpennyBook text-[12px] font-[400] leading-[15px]">LIEN STATUS</li>
                                </ul>
                                <div className="flex justify-between w-full">
                                    <div className="w-[40px] text-center   font-pushpennyBook text-[18px] font-[400] leading-[23px] text-[#6E7883] ">A</div>
                                    <div className="w-[80px] xl:w-[100px]  font-pushpennyBook text-[18px] font-[400] leading-[23px] text-[#6E7883] ">
                                        27-12-2021 06:48 PM
                                    </div>
                                    <div className="w-[80px] xl:w-[100px]  font-pushpennyBook text-[18px] font-[400] leading-[23px] text-[#6E7883] ">
                                        27-12-2021 06:48 PM
                                    </div>
                                    <div className="w-[60px] xl:w-[100px] lg:w-[40px]  font-pushpennyBook text-[18px] font-[400] leading-[23px] text-[#6E7883] ">NO</div>
                                </div>
                            </div>
                            <div className="w-full relative justify-between p-4 h-[270px] bg-[#FBF4EB] flex flex-col rounded-[10px]">
                            <Toggler label="Toggler" toggleState={toggleStateOne} onClick={toggle} toggler={setToggleStateOne} />
                            </div>
                        </div>
                    </div>
                    <div className="border w-full h-[705px] overflow-y-auto"></div>
                </div>
                <div className="flex flex-col w-full lg:w-[50%]">
                    <div className="border flex h-[513px] flex-col lg:flex-row w-full">
                        <div className="w-full lg:w-[49%] border h-full"></div>
                        <div className="w-full lg:w-[49%] border h-full"></div>
                    </div>
                    <div className="flex-col w-full h-[763px] border">
                        
                    </div>
                </div>
            </section>
        </div>
    )
}