
import SubLayoutTemplate from "../../../../components/ConfigLayoutTemplate"
import ImageHolder from "../../../../components/ImageHolder"
import { useEffect, useState } from "react"
import nookies from 'nookies'
import UserButton from "../../../../components/ButtonMaker"
import Textfield from "../../../../components/TextField"
import axios from "axios"
import { testEnv } from "../../../../components/Endpoints"
import useSWR from 'swr'
import TableContainer from "../../../../components/TableContainer"

export default function Referrers({ modals, setToken, setActiveDashboard, setActiveState, setActiveTab, setModalState, editFormState, getModalButtonRef, pageSelector, entryValue }) {
    const [chargeView, setChargeView] = useState({})
    const [view, setView] = useState(false)
    const [referralData, setReferralData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/referrer/all?pageNo=0&pageSize=10`, fetching)




    useEffect(() => {
        setActiveTab("Referrers")
        setToken()
        setActiveDashboard("Configurations")
        setActiveState("1")
        if (data) {
            setReferralData(data)

        }
    }, [data])

    function changeView(id) {
        if (view) {
            setView(false)
            return
        }
        setView(true)
        const currentView = chargeData.data.filter(charge => charge.id === id)
        setChargeView(currentView[0])
    }

    function referrerHandler(modalState, modal, fields, id) {
        setModalState(modalState, modal)
        editFormState(fields, id)
    }

    const deleteCaution = "You are about to delete a referrer, note after deleting it will go through approval process"


    return (
        <div className="">
            <section className={`px-[40px] mdxl:px-[10px] pt-2 pb-2 w-fit md:w-full mt-8 h-fit lg:h-[61px] flex flex-col mdxl:flex-row justify-between items-center rounded-[48px] bg-[#F3F3F3] md:pr-[60px]`}>
                <section className="w-[354px] h-[40px] bg-white rounded-[20px] px-2 relative flex items-center justify-between">
                    <input className="search-tab rounded-[20px] w-[80%]" placeholder="Search referral" />
                    <div className="w-[28px] h-[28px] relative">
                        <ImageHolder src="/icons/search-icon.svg" />
                    </div>
                </section>
                <section className="flex w-[354px] mt-4 mdxl:mt-0 justify-between">
                    <button ref={getModalButtonRef} onClick={() => {setView(true)}} className="flex font-pushpennyMedium font-500 text-[18px] leading-[23.44px] grow lg:w-[216px] h-[35px] rounded-[20px] items-center justify-center bg-gradient-to-r text-[#ffffff] from-[#EF6B25] to-[#F6BC18]">
                        + Add new referrers
                    </button>
                </section>

            </section>
            <section className={`py-2 w-full mt-[20px] px-4 ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <section className="h-[674px] w-full  pt-4 pl-2 pr-2">
                    <TableContainer pageSelector={pageSelector} entryValue={entryValue}>
                        <table className="table-fixed w-full flex flex-col">
                            <thead>
                                <tr className="flex justify-between">
                                    <th className="font-400   flex w-[30%] text-[12px] leading-[15.62px] font-pushpennyBook">REFERRER NAME</th>
                                    <th className="font-400  flex  w-[30%]  text-[12px] leading-[15.62px] font-pushpennyBook">AGENT TYPE</th>
                                    <th className="font-400  flex w-[35%]  text-[12px] leading-[15.62px] font-pushpennyBook">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6">                                
                                {referralData?.data.map((item, index) => {
                                    return (
                                        <tr key={index} className="flex justify-around h-[50px]">
                                            <td className="font-pushpennyBook  flex w-[30%] font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.name}</td>
                                            <td className="font-pushpennyBook  flex w-[30%] font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.agentType}</td>

                                            <td className="font-pushpennyBook lg:pl-[10px] flex w-[35%] justify-start lg:gap-[10px]">

                                                <div className="w-[90px] xl:w-[107px] h-[36px]">
                                                    <UserButton type="edit" />
                                                </div>
                                                <div className="xl:w-[130px] h-[36px]">
                                                    <UserButton type="delete" onClick={()=>{referrerHandler(true, "action", {caution:deleteCaution, action: "delete", endpoint: `https://admapis-staging.payrail.co/v1/referrer/${item.id}/delete`}, item.id)}} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                   
                    </TableContainer>
                </section>
            </section>
        </div>
    )
}



Referrers.Layout = SubLayoutTemplate