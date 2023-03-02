
import MetricLayoutTemplate from "../../../../components/MetricLayoutTemplate";
// import ImageHolder from "../../../../components/ImageHolder";
import UserButton from "../../../../components/ButtonMaker";
import { useEffect, useState } from "react";
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import { ngrok, testEnv, editApi } from "../../../../components/Endpoints";
import Textfield from "../../../../components/TextField";
import ImageHolder from "../../../../components/ImageHolder";
import TableContainer from "../../../../components/TableContainer";

export default function Pos({ modals, setToken, setActiveDashboard, setActiveState,setActiveTab, viewState, setView, isLoading, setLoading, entryValue, pageSelector }) {

    const [posData, setPosData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/transaction/pos?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)


    useEffect(() => {
        setActiveTab("Requests")
        setView(false)
        setActiveDashboard("POSTerminals")
        setActiveState("2")
        if (data) {
            setLoading(false)
            setPosData(data)
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

            <section className={`py-2 w-full mt-[20px] ${modals.isOpen ? "blur-sm" : "blur-none"} flex flex-col gap-[20px] lg:gap-[10px] lg:flex-row`}>
                <div className=" w-full lg:w-[65%] gap-[10px] flex flex-col">
                    <section className={`justify-center  w-full ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                        <section className={`px-[10px] pt-2 pb-2 w-full md:w-full h-fit lg:h-[61px] flex flex-col justify-between lg:flex-row items-center rounded-[10px] lg:rounded-[48px] bg-[#F3F3F3]`}>
                            <section className={`md:w-[250px] h-[40px] bg-white flex rounded-[20px] px-2 relative items-center`}>
                                <input className="search-tab rounded-[20px]" placeholder="Search Revenue" />
                                <div className="w-[28px] h-[28px] relative">
                                    <ImageHolder src='/icons/search-icon.svg' />
                                </div>
                            </section>
                            <div className={`lg:mt-0 mt-[10px] w-[95%] lg:w-fit lg:h-[35px]`}>
                                <div className={`h-[35px] w-full lg:w-[200px]`}>
                                    <UserButton type="file" />
                                </div>
                            </div>
                        </section>
                    </section>
                    <section className={`min-h-[674px] w-full pt-4 pl-[5px]`}>
                        <TableContainer entryValue={entryValue} pageSelector={pageSelector}>
                            <table className="table-fixed px-[15px] w-full ">
                                <thead>
                                    <tr className="px-[10px]">
                                        <th className="font-400 w-[95px] text-start   text-[12px] leading-[15.62px] font-pushpennyBook">REQUEST DATE</th>
                                        <th className="font-400  w-[74px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">NAME</th>
                                        <th className="font-400  w-[106px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">PHONE</th>
                                        <th className="font-400 w-[70px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">STATUS</th>
                                        <th className="font-400 w-[106px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">POS TYPE</th>
                                        <th className="font-400 w-[88px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody className="mt-6">
                                    <tr>
                                        <th colspan="1" className=""></th>
                                        <th colspan="2" className="text-start">Agent Information</th>
                                        <th colspan="3" className=""></th>
                                    </tr>

                                    {posData?.data.map((data, index) => {
                                        return (
                                            <tr key={index} className="h-[50px] border-b px-[10px] border-[#979797]">
                                                <td className="font-pushpennyBook  w-[95px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{dateFormatter(data.dateCreated)}</td>
                                                <td className="font-pushpennyBook  w-[74px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.customerName}</td>
                                                <td className="font-pushpennyBook  w-[106px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.customerPhoneNumber || "n/a"}</td>
                                                <td className="font-pushpennyBook  w-[70px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.status}</td>
                                                <td className="font-pushpennyBook  w-[106px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.serviceName}</td>
                                                <td className="font-pushpennyBook gap-[5px] flex w-[88px]  flex items-start">
                                                    <div className="w-[88px] h-[36px]">
                                                        <UserButton type="view" text="View" onClick={() => { router.push(`/dashboard/agency/customer-management/${customer.id}`) }} />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}


                                </tbody>
                            </table>
                        </TableContainer>
                    </section>
                </div>
                <div className="w-full lg:w-[35%] gap-[10px] flex flex-col">
                    <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                        <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">POS Process</h2>
                    </div>
                    <section className={`min-h-[674px] w-full flex rounded-[10px] bg-brand-light-yellow pt-4`}>
                        <form className="flex pb-[20px] gap-[15px] flex-col items-center w-full">
                            <div className="w-full xl:w-[336px] h-[57px] rounded-[28.5px]">
                                <Textfield title="Agent ID" bg="bg-white" />
                            </div>
                            <div className="w-full xl:w-[336px] h-[57px] rounded-[28.5px]">
                                <Textfield title="Agent Name" bg="bg-white" />
                            </div>
                            <div className="w-full xl:w-[336px] h-[57px] rounded-[28.5px]">
                                <Textfield title="Agent Phone No." bg="bg-white" />
                            </div>
                            <div className="w-full xl:w-[336px] h-[57px] rounded-[28.5px]">
                                <Textfield title="Status" type="select" selectOptions={["Completed", "Processing"]} bg="bg-white" />
                            </div>
                            <div className="w-full xl:w-[336px] h-[57px] rounded-[28.5px]">
                                <Textfield title="POS Type" type="select" selectOptions={["GA Linux Terminal", "GA POS Android Terminal"]} bg="bg-white" />
                            </div>
                            <div className="w-full flex justify-between items-center xl:w-[336px] mt-auto h-[57px]">
                                <div className="w-[49%] h-[36px]">
                                    <UserButton text="Cancel" bg="bg-[#DDDDDD]" textColor="text-white" />
                                </div>
                                <div className="w-[49%] h-[36px]">
                                    <UserButton type="gradient" text="Save" />
                                </div>
                            </div>


                        </form>
                    </section>
                </div>
            </section>
        </div>
    )
}



Pos.Layout = MetricLayoutTemplate