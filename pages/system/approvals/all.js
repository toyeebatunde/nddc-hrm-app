
import ImageHolder from '../../../components/ImageHolder'
import { useState, useRef, useEffect } from "react"
import ButtonTab from "../../../components/ButtonTab"
import ApprovalsLayoutTemplate from '../../../components/ApprovalsLayoutTemplate'
import UserButton from '../../../components/ButtonMaker'

export default function Approval({ modals, setModalState }) {
    const [activeTab, setActiveTab] = useState("")
    const [createRole, setCreateRole] = useState(false)

    function setTab(tab) {
        setActiveTab(tab)
    }

    const getModalRef = useRef()
    const getModalButtonRef = useRef()


    return (
        <section className={`py-2 w-full mt-[20px] ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
        <section className="h-[674px] w-full overflow-x-auto rounded-[10px] bg-brand-light-yellow pt-4">
            <div className=" w-[250%] px-[2px] sm:w-[230%] md:w-[200%] mdxl:w-[180%] lg:w-[160%] xlg:w-[140%] xl:w-full h-[30px]">

                <table className="table-fixed w-full flex flex-col pl-[20px]">
                    <thead>
                        <tr className="flex justify-between">
                            <th className="font-700 borde flex w-[6%] text-[10px]  lg:text-[12px] leading-[15.62px] font-pushpennyBook">CODE</th>
                            <th className="font-700 borde   flex w-[10%] text-[10px] lg:text-[12px] leading-[15.62px] font-pushpennyBook">OPERATION</th>
                            <th className="font-700 borde   flex w-[15%] text-[10px] lg:text-[12px] leading-[15.62px] font-pushpennyBook">INITIATED BY</th>
                            <th className="font-700 borde  flex w-[10%] text-[10px] lg:text-[12px] leading-[15.62px] font-pushpennyBook">AGENT/STAFF ID</th>
                            <th className="font-700 borde  flex w-[20%] text-[10px]  lg:text-[12px] leading-[15.62px] font-pushpennyBook">REASON FOR ACTION</th>
                            <th className="font-700 borde flex w-[25%] text-[10px] lg:text-[12px] leading-[15.62px]  font-pushpennyBook">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="mt-6 ">                       
                        <tr className="flex justify-between items-center border-b border-[#777777] h-[50px]">
                            <td className="font-pushpennyBook borde flex w-[6%] font-400 text-[13px] lg:text-[18px] leading-[14px] text-[#6E7883]">1234</td>
                            <td className="font-pushpennyBook borde flex w-[10%] font-400 text-[13px] lg:text-[18px] leading-[14px] text-[#6E7883]">Institution</td>
                            <td className="font-pushpennyBook borde flex w-[15%] font-400 text-[13px] lg:text-[18px] leading-[14px] text-[#6E7883]">Oluwaseyi</td>
                            <td className="font-pushpennyBook borde flex w-[10%] font-400 text-[13px] lg:text-[18px] leading-[14px] text-[#6E7883]">ANG009912</td>
                            <td className="font-pushpennyBook borde flex w-[20%] font-400 text-[13px] lg:text-[18px] leading-[14px] text-[#6E7883]">New Bank Addition</td>
                            
                            <td className="font-pushpennyBook flex justify-between lg:w-[25%] items-start font-400 text-[13px] lg:text-[18px] leading-[14px] text-[#6E7883]">
                                <div className='w-[120px] h-[36px]'>
                                    <UserButton type="decline" />
                                </div>
                                <div className='w-[120px] h-[36px]'>
                                    <UserButton type="accept" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </section>
    )
}

Approval.Layout = ApprovalsLayoutTemplate