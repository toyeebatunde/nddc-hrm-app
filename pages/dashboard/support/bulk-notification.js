
import ImageHolder from "../../../components/ImageHolder";
import UserButton from "../../../components/ButtonMaker";
import { useEffect, useState } from "react";
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import { ngrok, testEnv, editApi } from "../../../components/Endpoints";
import Textfield from "../../../components/TextField";
import SupportLayoutTemplate from "../../../components/SupportLayout";

export default function Bulk({ modals, setToken, setActiveDashboard, setActiveState, viewState, setView, isLoading, setLoading }) {

    const [settlementData, setSettlementData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/bulk_notification/all?pageNo=0&pageSize=10`, fetching)


    useEffect(() => {
        // setLoading(true)
        setView(false)
        setActiveDashboard("BulkNotification")
        setActiveState("4")
        if (data) {
            setLoading(false)
            setSettlementData(data)
        }
        if (error) {
            console.log(error)
        }
    }, [data])


    const dateFormatter = (stamp) => {
        const date = new Date(stamp)
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes()
    }





    return (
        <div className="w-full">
            <section className={`py-2 w-full mt-[20px] ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <h2 className="font-pushpennyBook font-[400] text-[24px] leading-[31px]">Bulk Notification</h2>

                <section className="flex flex-col w-full mt-[20px]">
                    <div className="w-full lg:w-[485px] min-h-[470px] gap-[10px] flex flex-col">
                        <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                            <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">Compose New Message</h2>
                        </div>
                        <section className={`h-[402px] w-full flex rounded-[10px] bg-brand-light-yellow pt-4`}>
                            <form className="flex pb-[20px] gap-[15px] flex-col items-center w-full">
                                <div className="w-full xl:w-[427px] h-[57px] rounded-[28.5px]">
                                    <Textfield title="Title" bg="bg-white" />
                                </div>
                                <div className="w-[95%] xl:w-[427px] h-[132px] rounded-[30px] relative rounded-[28.5px]">
                                    <Textfield type="textbox" title="Message" bg="bg-white" />
                                </div>

                                <div className="w-full flex px-[10px] justify-between items-center xl:w-[427px] mt-auto h-[57px]">
                                    <div className="w-[49%] h-[46px]">
                                        <UserButton text="Cancel" bg="bg-[#DDDDDD]" textColor="text-white" />
                                    </div>
                                    <div className="w-[49%] h-[46px]">
                                        <UserButton type="gradient" text="Save" />
                                    </div>
                                </div>


                            </form>
                        </section>
                    </div>
                </section>

                <section className={`px-[40px] mdxl:px-[10px] pt-2 pb-2 w-fit md:w-full mt-8 h-fit lg:h-[61px] flex flex-col mdxl:flex-row items-center rounded-[48px] bg-[#F3F3F3] md:pr-[60px]`}>
                    <section className={`md:w-[250px] h-[40px] flex bg-white rounded-[20px] px-2 relative  items-center justify-between`}>
                        <input className="search-tab rounded-[20px] w-[80%]" placeholder="Search message" />
                        <div className="w-[28px] h-[28px] relative">
                            <ImageHolder src='/icons/search-icon.svg' />
                        </div>
                    </section>
                    <div className={`grow flex flex-col lg:mt-0 mt-[10px] w-full lg:flex-row lg:justify-end gap-[10px] lg:h-[35px]`}>
                        <div className={`h-[35px] w-full lg:w-[200px] `}>
                            <UserButton type="file" />
                        </div>
                        <div className="h-[35px]  w-full lg:w-[200px]">
                            <UserButton type="pdf" />
                        </div>

                    </div>
                </section>

                <section className="h-[674px] mt-[20px] w-full overflow-x-auto rounded-[10px] bg-brand-light-yellow pt-4 pl-2 pr-4">
                    <div className="min-w-[1115px] h-fit">

                        <table className="table-fixed px-[15px] w-full">
                            <thead>
                                <tr className="">
                                    <th className="font-400 w-[135px] text-start  text-[12px] leading-[15.62px] font-pushpennyBook">DATE</th>
                                    <th className="font-400 w-[601px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">MESSAGE</th>
                                    <th className="font-400 w-[106px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">SMS</th>
                                    <th className="font-400 w-[106px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">PUSH</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6">
                                <tr className="h-[70px] border-b px-[10px] border-[#979797]">
                                    <td className="font-pushpennyBook  w-[135px] break-words font-400 text-[14px] leading-[14px] text-[#6E7883]">stuff</td>
                                    <td className="font-pushpennyBook  w-[601px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">stuff</td>
                                    <td className="font-pushpennyBook  group:ml-[10px] w-[106px]">
                                        <div className="w-[106px] group  inline-flex h-[36px]">
                                            <UserButton type="accept" text="True" onClick={() => { router.push(`/dashboard/agency/customer-management/${customer.id}`) }} />
                                        </div>
                                    </td>
                                    <td className="font-pushpennyBook  group:ml-[10px] w-[106px]">
                                        <div className="w-[106px]  inline-flex h-[36px]">
                                            <UserButton type="decline" text="False" onClick={() => { router.push(`/dashboard/agency/customer-management/${customer.id}`) }} />
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </section>
                

            </section>
        </div>
    )
}



Bulk.Layout = SupportLayoutTemplate