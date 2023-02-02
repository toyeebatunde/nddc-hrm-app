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
                            <div className="w-full relative justify-between p-4 lg:h-[270px] bg-[#FBF4EB] flex flex-col rounded-[10px]">
                                <div className="w-full flex flex-col items-center gap-[7px]">
                                    <h2 className="font-pushpennyBook text-[12px] font-[400] leading-[15px]">ACTIONS</h2>
                                    <div className="border-t-[1px] border-white flex flex-col lg:flex-row w-full">
                                        <div className="w-full lg:w-[50%] lg:border-r-[0.5px] lg:border-white flex flex-col p-[10px] items-center lg:items-start">
                                            <h2 className="font-pushpennyBook text-[18px] text-[#6E7883] font-[400] leading-[15px]">ACTIVATE</h2>
                                            <div className="w-[153px] lg:w-full flex flex-col items-center lg:flex-row justify-between xl:w-full lg:h-[36px] mt-[17px]">
                                                <h2 className="font-pushpennyBook text-[18px] text-[#6E7883] font-[400] leading-[15px]">Account Status</h2>
                                                <div>
                                                    <Toggler toggleState={toggleStateOne} onClick={toggle} toggler={setToggleStateOne} />
                                                </div>
                                            </div>
                                            <div className="w-[153px] lg:w-full flex flex-col items-center lg:flex-row justify-between lg:h-[36px] mt-[17px]">
                                                <h2 className="font-pushpennyBook text-[18px] text-[#6E7883] font-[400] leading-[15px]">Lien Status</h2>
                                                <div >
                                                    <Toggler toggleState={toggleStateOne} onClick={toggle} toggler={setToggleStateOne} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-[50%] lg:border-l-[0.5px] lg:border-white flex flex-col p-[10px] items-center lg:items-start">
                                            <h2 className="font-pushpennyBook text-[18px] text-[#6E7883] font-[400] leading-[15px]">RESET</h2>
                                            <div className="w-[153px] lg:w-[113px] xl:w-[153px] h-[36px] mt-[17px]">
                                                <UserButton text="Password" type="edit" />
                                            </div>
                                            <div className="w-[153px] lg:w-[113px] xl:w-[153px] h-[36px] mt-[12px]">
                                                <UserButton text="PIN" type="edit" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="gap-[7px] flex flex-col mt-[20px] w-full min-h-[210px] overflow-y-auto">
                        <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                            <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">Device Information</h2>
                        </div>

                        <div className=" flex p-4 border min-h-[200px] overflow-y-auto border-[#E8E8E8] flex-col rounded-[10px]">
                            <h2 className="font-pushpennyBook text-[12px] text-[#6E7883]">Monitor user's login information</h2>
                            <div className="flex w-full justify-between">
                                <h2 className="font-pushpennyBook text-[12px] font-[400] leading-[15px]">DEVICE ID</h2>
                                <h2 className="font-pushpennyBook text-[12px] font-[400] leading-[15px]">ACTION</h2>
                            </div>
                            <div className="flex justify-between border-b-[1px] border-[#D8D8D8] mt-[30px] h-[57px] items-start w-full">
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">CBCFF9FE-7BC2-4FE7-9BD8-494A3FFED8DD</h2>
                                <div className="w-[98px] h-[30px]">
                                    <UserButton type="delete" small={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full mt-[20px] lg:mt-0 lg:w-[50%]">
                    <div className="flex min-h-[250px] xl:h-[513px] justify-between flex-col xl:flex-row w-full">
                        <div className="w-full xl:w-[49%] xl:h-full">
                            <div className="w-full min-h-[513px] gap-[7px] flex flex-col">
                                <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                                    <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">Agent Information</h2>
                                </div>
                                <div className=" flex grow flex-col bg-[#FBF4EB] px-4 py-4 rounded-[10px]">
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Agent ID</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">AGL0000002</h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Email</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Mykel4gog@yahoo.com</h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Email</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Mykel4gog@yahoo.com</h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Email</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Mykel4gog@yahoo.com</h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Email</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Mykel4gog@yahoo.com</h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Email</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Mykel4gog@yahoo.com</h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Email</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Mykel4gog@yahoo.com</h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Email</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Mykel4gog@yahoo.com</h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Email</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Mykel4gog@yahoo.com</h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Email</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Mykel4gog@yahoo.com</h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Email</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Mykel4gog@yahoo.com</h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Email</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Mykel4gog@yahoo.com</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full xl:w-[49%] mt-[20px] xl:mt-0  xl:h-full">
                            <div className="w-full min-h-[213px] gap-[7px] flex flex-col">
                                <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                                    <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">Sub-agent Information</h2>
                                </div>
                                <div className=" flex grow flex-col bg-[#FBF4EB] px-4 py-4 rounded-[10px]">
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Agent ID</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">AGL0000002</h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Email</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Mykel4gog@yahoo.com</h2>
                                    </div>
                                    <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Email</h2>
                                        <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Mykel4gog@yahoo.com</h2>
                                    </div>

                                    <div className="h-[36px] self-center mt-[20px] w-[236px]">
                                        <UserButton type="view" text="View agent" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-col w-full mt-[10px] min-h-[763px]">
                        <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col mt-[20px] lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                            <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">KYC Details</h2>
                        </div>
                        <div className="flex w-full grow flex-col mt-[10px] overflow-x-auto bg-[#FBF4EB] px-4 py-4 rounded-[10px]">  
                        <div className="w-[541px]  h-fit">

                        <table className="table-fixed w-full flex flex-col">
                            <thead>
                                <tr className="flex gap-[5px]">
                                    <th className="font-400 flex  text-[12px] w-[50px] leading-[15.62px] font-pushpennyBook">KYC</th>
                                    <th className="font-400 w-[100px] flex   text-[12px] leading-[15.62px] font-pushpennyBook">DETAILS</th>
                                    <th className="font-400  flex w-[100px] text-[12px] leading-[15.62px] font-pushpennyBook">UPLOADED ON</th>
                                    <th className="font-400  flex   text-[12px] w-[60px] leading-[15.62px] font-pushpennyBook">STATUS</th>
                                    <th className="font-400 w-[210px] flex text-[12px] leading-[15.62px] font-pushpennyBook">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6 ">
                                <tr className="flex gap-[5px] h-[50px]">
                                    <td className="font-pushpennyBook flex w-[50px]  font-400 text-[14px] leading-[18px] text-[#6E7883]">BVN</td>
                                    <td className="font-pushpennyBook flex w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">12345678909</td>                                   
                                    <td className="font-pushpennyBook flex w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">27-12-2021 06:48 PM</td>
                                    <td className="font-pushpennyBook flex w-[60px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">Verified</td>
                                    
                                    <td className="font-pushpennyBook gap-[5px] flex w-[210px]  flex items-start">
                                        <div className="w-[110px] h-[36px]">
                                            <UserButton type="edit" text="Approve" />
                                        </div>
                                        <div className="w-[100px] h-[36px]">
                                            <UserButton type="view" text="Decline" />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="flex gap-[5px] h-[50px]">
                                    <td className="font-pushpennyBook flex w-[50px]  font-400 text-[14px] leading-[18px] text-[#6E7883]">BVN</td>
                                    <td className="font-pushpennyBook flex w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">12345678909</td>                                   
                                    <td className="font-pushpennyBook flex w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">27-12-2021 06:48 PM</td>
                                    <td className="font-pushpennyBook flex w-[60px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">Verified</td>
                                    
                                    <td className="font-pushpennyBook gap-[5px] flex w-[210px]  flex items-start">
                                        <div className="w-[110px] h-[36px]">
                                            <UserButton type="edit" text="Approve" />
                                        </div>
                                        <div className="w-[100px] h-[36px]">
                                            <UserButton type="view" text="Decline" />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="flex gap-[5px] h-[50px]">
                                    <td className="font-pushpennyBook flex w-[50px]  font-400 text-[14px] leading-[18px] text-[#6E7883]">BVN</td>
                                    <td className="font-pushpennyBook flex w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">12345678909</td>                                   
                                    <td className="font-pushpennyBook flex w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">27-12-2021 06:48 PM</td>
                                    <td className="font-pushpennyBook flex w-[60px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">Verified</td>
                                    
                                    <td className="font-pushpennyBook gap-[5px] flex w-[210px]  flex items-start">
                                        <div className="w-[110px] h-[36px]">
                                            <UserButton type="edit" text="Approve" />
                                        </div>
                                        <div className="w-[100px] h-[36px]">
                                            <UserButton type="view" text="Decline" />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="flex gap-[5px] h-[50px]">
                                    <td className="font-pushpennyBook flex w-[50px]  font-400 text-[14px] leading-[18px] text-[#6E7883]">BVN</td>
                                    <td className="font-pushpennyBook flex w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">12345678909</td>                                   
                                    <td className="font-pushpennyBook flex w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">27-12-2021 06:48 PM</td>
                                    <td className="font-pushpennyBook flex w-[60px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">Verified</td>
                                    
                                    <td className="font-pushpennyBook gap-[5px] flex w-[210px]  flex items-start">
                                        <div className="w-[110px] h-[36px]">
                                            <UserButton type="edit" text="Approve" />
                                        </div>
                                        <div className="w-[100px] h-[36px]">
                                            <UserButton type="view" text="Decline" />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="flex gap-[5px] h-[50px]">
                                    <td className="font-pushpennyBook flex w-[50px]  font-400 text-[14px] leading-[18px] text-[#6E7883]">BVN</td>
                                    <td className="font-pushpennyBook flex w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">12345678909</td>                                   
                                    <td className="font-pushpennyBook flex w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">27-12-2021 06:48 PM</td>
                                    <td className="font-pushpennyBook flex w-[60px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">Verified</td>
                                    
                                    <td className="font-pushpennyBook gap-[5px] flex w-[210px]  flex items-start">
                                        <div className="w-[110px] h-[36px]">
                                            <UserButton type="edit" text="Approve" />
                                        </div>
                                        <div className="w-[100px] h-[36px]">
                                            <UserButton type="view" text="Decline" />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="flex gap-[5px] h-[50px]">
                                    <td className="font-pushpennyBook flex w-[50px]  font-400 text-[14px] leading-[18px] text-[#6E7883]">BVN</td>
                                    <td className="font-pushpennyBook flex w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">12345678909</td>                                   
                                    <td className="font-pushpennyBook flex w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">27-12-2021 06:48 PM</td>
                                    <td className="font-pushpennyBook flex w-[60px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">Verified</td>
                                    
                                    <td className="font-pushpennyBook gap-[5px] flex w-[210px]  flex items-start">
                                        <div className="w-[110px] h-[36px]">
                                            <UserButton type="edit" text="Approve" />
                                        </div>
                                        <div className="w-[100px] h-[36px]">
                                            <UserButton type="view" text="Decline" />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="flex gap-[5px] h-[50px]">
                                    <td className="font-pushpennyBook flex w-[50px]  font-400 text-[14px] leading-[18px] text-[#6E7883]">BVN</td>
                                    <td className="font-pushpennyBook flex w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">12345678909</td>                                   
                                    <td className="font-pushpennyBook flex w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">27-12-2021 06:48 PM</td>
                                    <td className="font-pushpennyBook flex w-[60px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">Verified</td>
                                    
                                    <td className="font-pushpennyBook gap-[5px] flex w-[210px]  flex items-start">
                                        <div className="w-[110px] h-[36px]">
                                            <UserButton type="edit" text="Approve" />
                                        </div>
                                        <div className="w-[100px] h-[36px]">
                                            <UserButton type="view" text="Decline" />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="flex gap-[5px] h-[50px]">
                                    <td className="font-pushpennyBook flex w-[50px]  font-400 text-[14px] leading-[18px] text-[#6E7883]">BVN</td>
                                    <td className="font-pushpennyBook flex w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">12345678909</td>                                   
                                    <td className="font-pushpennyBook flex w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">27-12-2021 06:48 PM</td>
                                    <td className="font-pushpennyBook flex w-[60px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">Verified</td>
                                    
                                    <td className="font-pushpennyBook gap-[5px] flex w-[210px]  flex items-start">
                                        <div className="w-[110px] h-[36px]">
                                            <UserButton type="edit" text="Approve" />
                                        </div>
                                        <div className="w-[100px] h-[36px]">
                                            <UserButton type="view" text="Decline" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>                          
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}