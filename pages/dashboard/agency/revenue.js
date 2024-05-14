
import MetricLayoutTemplate from "../../../components/MetricLayoutTemplate";
// import ImageHolder from "../../../../components/ImageHolder";
import UserButton from "../../../components/ButtonMaker";
import { useEffect, useState } from "react";
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import { ngrok, testEnv, editApi } from "../../../components/Endpoints";
import Textfield from "../../../components/TextField";
import ImageHolder from "../../../components/ImageHolder";
import TableContainer from "../../../components/TableContainer";

export default function Revenue({ modals, setToken, setActiveDashboard, setActiveState, setActiveTab, viewState, setView, isLoading, setLoading, entryValue, pageSelector }) {
    const initialView = { agentId: "", agentName: "", agentPhone: "", transactionType: "", amount: "", description: "" }

    const [posData, setPosData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/agent/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const [viewPayment, setPayment] = useState(initialView)

    function posToView(e, view, id, name, phone) {
        e.preventDefault()
        if (view) {
            setPayment({ ...viewPayment, agentId: id, agentName: `${name.firstName} ${name.lastName}`, agentPhone: phone, status: "", comment: "" })
            return
        }
        setPayment(initialView)
    }

    function formEdit(e) {
        setPayment({ ...viewPayment, [e.target.name]: e.target.value })
    }


    useEffect(() => {
        setActiveTab("Requests")
        setView(false)
        setActiveDashboard("Revenue")
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
            <section className={`py-2 w-full mt-[20px] ${modals.isOpen ? "blur-sm" : "blur-none"} flex flex-col gap-[20px] lg:gap-[10px] lg:flex-row`}>
                <div className=" borde w-full lg:w-[65%] gap-[10px] flex flex-col">
                    {/* <section className={`justify-center  w-full ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                        <section className={`px-[10px] pt-2 pb-2 w-full md:w-full h-fit lg:h-[61px] flex flex-col justify-between lg:flex-row items-center rounded-[10px] lg:rounded-[48px] bg-[#F3F3F3]`}>
                            <section className={`md:w-[250px] h-[40px] bg-white flex rounded-[20px] px-2 relative items-center`}>
                                <input className="search-tab rounded-[20px]" placeholder="Search Agent" />
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
                    </section> */}
                    <section className={`min-h-[674px] w-full pl-[5px]`}>
                        <TableContainer entryValue={entryValue} pageSelector={pageSelector}>
                            <table className="table-fixed px-[15px] w-full ">
                                <thead>
                                    <tr className="px-[10px]">
                                        <th className="font-400 w-[105px] text-start   text-[12px] leading-[15.62px] font-pushpennyBook">AGENT ID</th>
                                        <th className="font-400  w-[74px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">AGENT NAME</th>
                                        <th className="font-400  w-[106px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">AGENT PHONE NO</th>
                                        <th className="font-400 w-[88px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody className="mt-6">

                                    {posData?.data.map((data, index) => {
                                        return (
                                            <tr key={index} className="h-[50px] border-b px-[10px] border-[#979797]">
                                                <td className="font-pushpennyBook  w-[95px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.agentIdentifier}</td>
                                                <td className="font-pushpennyBook  w-[74px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.firstName} {data.lastName}</td>
                                                <td className="font-pushpennyBook  w-[106px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.phoneNumber || "n/a"}</td>
                                                <td className="font-pushpennyBook gap-[5px] flex w-[88px] h-[50px] flex items-center">
                                                    <div className="w-[150px]  h-[36px]">
                                                        <UserButton alterImg="/icons/transact.svg" type="view" text="Transact" onClick={(e) => { posToView(e, true, data.agentIdentifier, { firstName: data.firstName, lastName: data.lastName }, data.phoneNumber) }} />
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
                <div className="w-full borde lg:w-[35%] gap-[25px] flex flex-col">
                    <section className={`h-[586px] justify-center w-full flex rounded-[10px]`}>
                        <section className="lg:w-[400px] xl:ml-[5px] xl:mt-0 border rounded-[8px] mt-[10px] border-[#dddddd] h-[375px] flex flex-col items-center justify-between py-4">
                            <section className="flex justify-between w-full px-4">
                                <p className="font-pushpennyMedium font-500 text-[13px] leading-[20px]">Transaction Overview</p>
                                <p className="font-400 font-pushpennyBook text-[14px] leading-[22px] cursor-pointer underline underline-offset-1">View all</p>
                            </section>
                            <section className="w-[100%] rounded-[8px] h-[231px] relative bg-brand-light-yellow flex justify-between items-center px-4">
                                <section className="flex flex-col justify-center items-center w-[180px] h-[180px]">
                                    <p className="font-pushpennyMedium text-[40px] leading-[52px] text-[#6e7883] font-500">21841</p>
                                    <p className="font-pushpennyBook text-[12px] leading-[18px] text-black font-400">Total</p>
                                    <div id="first-chart" className="pie z-30 animate-two no-round" style={{ "--p": `${90}`, "--c": "rgba(233, 158, 36, 1)", "--b": "25px" }}></div>
                                    <div id="second-chart" className="pie z-20 animate no-round" style={{ "--p": "97", "--c": "black", "--b": "15px" }}></div>
                                    <div id="first-chart" className="pie flex flex-col items-center z-10 animate-three no-round" style={{ "--p": "100", "--c": "gray", "--b": "20px" }}></div>
                                    <div id="first-chart" className="pie flex flex-col items-center z-10 animate-three no-round" style={{ "--p": "97", "--c": "rgba(251, 244, 235, 1)", "--b": "25px" }}></div>
                                </section>
                                <section className="flex  justify-between h-[180px] flex-col">
                                    <section className="flex flex-col">
                                        <p className="font-pushpennyMedium flex justify-end text-[20px] font-500 leading-[26px] text-[#6e7883]">14967</p>
                                        <div className="flex justify-between w-[90px] items-center">
                                            <div className="w-[13px] h-[13px] rounded-[50%] bg-brand-yellow"></div>
                                            <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Successful</p>
                                        </div>
                                    </section>
                                    <section className="flex flex-col">
                                        <p className="font-pushpennyMedium flex justify-end text-[20px] font-500 leading-[26px] text-[#6e7883]">6008</p>
                                        <div className="flex justify-between w-[90px] items-center">
                                            <div className="w-[13px] h-[13px] rounded-[50%] bg-black"></div>
                                            <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Failed</p>
                                        </div>
                                    </section>
                                    <section className="flex flex-col">
                                        <p className="font-pushpennyMedium flex justify-end text-[20px] font-500 leading-[26px] text-[#6e7883]">74</p>
                                        <div className="flex justify-between w-[90px] items-center">
                                            <div className="w-[13px] h-[13px] rounded-[50%] bg-gray"></div>
                                            <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Reversed</p>
                                        </div>
                                    </section>
                                </section>
                            </section>
                            {/* <section className="flex justify-between h-[44px] px-2 w-full">
                                <section className="flex flex-col">
                                    <p className="font-pushpennyMedium font-500 text-[20px] leading-[26px]">20</p>
                                    <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Today</p>
                                </section>
                                <section className="flex flex-col">
                                    <p className="font-pushpennyMedium font-500 text-[20px] leading-[26px]">1358</p>
                                    <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Week</p>
                                </section>
                                <section className="flex flex-col">
                                    <p className="font-pushpennyMedium font-500 text-[20px] leading-[26px]">1389</p>
                                    <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Month</p>
                                </section>
                                <section className="flex flex-col">
                                    <p className="font-pushpennyMedium font-500 text-[20px] leading-[26px]">21049</p>
                                    <p className="font-pushpennyBook font-400 text-[12px] leading-[18px]">Year</p>
                                </section>
                            </section> */}
                        </section>
                    </section>
                </div>
            </section>
        </div>
    )
}



Revenue.Layout = MetricLayoutTemplate