import ImageHolder from '../../components/ImageHolder'
import directionDown from '../../public/icons/direction-down.svg'
import down from '../../public/icons/down.svg'
import arrowUpGreen from '../../public/icons/arrow-up-green-circle.svg'
import searchIcon from '../../public/icons/search-icon.svg'
import closeIcon from '../../public/icons/close-modal.svg'
import { useState, useRef, useEffect } from "react"
import tick from '../../public/icons/tick.svg'
import RadioToggle from "../../components/radioToggle"
import ButtonTab from "../../components/ButtonTab"
import UserButton from '../../components/ButtonMaker'
import Textfield from '../../components/TextField'

export default function Institutions({ modals, setModalState }) {
    const textFieldList = [
            {
                title: "Institution Code",
                name: "institutionCode",
            },
            {
                title: "NIP Code",
                name: "nipCode",
            },
            {
                title: "Institution Name",
                name: "institutionName",
            },
            {
                title: "Bank Account Number",
                name: "bankAccountNumber",
            },
            {
                title: "Bank Account Name",
                name: "bankAccountName",
            },
            {
                title: "Ledger Purse",
                name: "ledgerPurse",
            }
    ]

    const initialForm = {
        institutionCode: "",
        nipCode: "",
        institutionName: "",
        bankAccountName: "",
        bankAccountNumber: "",
        ledgerPurse: ""
    }

    const [formFields, setFormFields] = useState(initialForm)
    const [createRole, setCreateRole] = useState(false)
    // ${modals.isOpen ? "blur-sm" : "blur-none"}




    const getModalRef = useRef()
    const getModalButtonRef = useRef()

    const tabs = [
        "Team",
        "Roles and Privileges"
    ]


    return (
        <div className={`flex relative flex-col items-start pt-[60px] overflow-hidden w-full`}>
            <section className={`w-full flex px-4 justify-between ${modals.isOpen ? "blur-sm" : "blur-none"} `}>
                <h4 className="font-pushpennyMedium text-[36px] leading-[47px]">
                    System
                </h4>
            </section>
            <section className={`h-fit flex font-pushpennyMedium leading-[31px] text-[24px] font-[400] w-fit px-4 relative mt-5 ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                Bank Management
            </section>
            <section className={`px-4 flex justify-center w-full ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <section className={`px-[40px] mdxl:px-[10px] pt-2 pb-2 w-fit md:w-full mt-8 h-fit lg:h-[61px] flex flex-col mdxl:flex-row justify-between items-center rounded-[48px] bg-[#F3F3F3] md:pr-[60px]`}>
                    <section className="md:w-[354px] h-[40px] bg-white rounded-[20px] px-2 relative flex items-center justify-between">
                        <input className="search-tab rounded-[20px] w-[80%]" placeholder="Search member" />
                        <div className="w-[28px] h-[28px] relative">
                            <ImageHolder src={searchIcon} />
                        </div>
                    </section>
                    <section className="flex w-[250px] md:w-[354px] mt-4 mdxl:mt-0 justify-between">
                        <button ref={getModalButtonRef} onClick={() => { setModalState(true, "teamModal") }} className="flex font-pushpennyMedium font-500 text-[18px] leading-[23.44px] grow lg:w-[216px] h-[35px] rounded-[20px] items-center justify-center bg-gradient-to-r text-[#ffffff] from-[#EF6B25] to-[#F6BC18]">
                            + Add New Bank
                        </button>
                    </section>

                </section>
            </section>

            {/* <section className={`py-2 w-full mt-[20px] px-4 ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <section className="h-[674px] w-full overflow-x-auto rounded-[10px] bg-brand-light-yellow pt-4 pl-2 pr-4">
                    <div className=" w-[250%] sm:w-[230%] md:w-[200%] mdxl:w-[180%] lg:w-[160%] xlg:w-[140%] xl:w-full h-[30px]">

                        <table className="table-fixed w-full flex flex-col">
                            <thead>
                                <tr className="flex justify-around">
                                    <th className="font-400  flex w-[20%]  text-[12px] leading-[15.62px] font-pushpennyBook">CODE</th>
                                    <th className="font-400   flex w-[20%] text-[12px] leading-[15.62px] font-pushpennyBook">BANK NAME</th>
                                    <th className="font-400  flex w-[20%] text-[12px] leading-[15.62px] font-pushpennyBook">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6">
                               
                                <tr className="flex justify-around h-[50px]">
                                    <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">Olamide Olagunju</td>
                                    <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">mideola@angalafintech.com</td>
                                    
                                    <td className="font-pushpennyBook flex w-[20%] flex items-start font-400 text-[18px] leading-[14px] text-[#6E7883]">
                                        <button className="w-[fit] h-[36px] flex justify-between px-[20px] items-center text-white rounded-[24px] bg-black flex">
                                            <h2 className="font-[400] font-pushPenny text-[18px]">Edit</h2>
                                            <div className="w-[20px] h-[20px] relative">
                                            <ImageHolder src= '/icons/arrow.svg' />
                                            </div>
                                        </button>
                                        <button className="w-[117px] h-[36px] flex justify-between px-[20px] items-center ml-[5px] text-white rounded-[24px] bg-black flex">
                                            <h2 className="font-[400] font-pushPenny text-[18px]">Delete</h2>
                                            <div className="w-[20px] h-[20px] relative">
                                            <ImageHolder src= '/icons/delete.svg' />
                                            </div>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </section> */}

            <section className='w-[98%] mt-[30px] h-fit rounded-[10px] bg-[#FBF4EB]'>
            
            <form className="w-full mt-[30px] w-[330px] flex flex-col items-center justify-between py-2 px-4">
                {textFieldList.map((item, index) => {
                    return (
                        <div className='mt-[25px] w-full'>
                            <Textfield title={item.title} value={formFields[item.name]} formFields={formFields} setFormFields={setFormFields} name={item.name} />
                        </div>
                    )
                })}
                <div className='w-full mt-[30px]  w-[330px] flex justify-between py-2 px-4'>
                <UserButton text="Cancel" type={1} />
                <UserButton text="Save" type={2} />
                </div>
            </form>
            
            </section>
        </div>
    )
}