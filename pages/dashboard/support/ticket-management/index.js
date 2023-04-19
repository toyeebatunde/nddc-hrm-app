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
export default function Tickets({ modals, setToken, setActiveDashboard, setActiveState, viewState, setView, isLoading, setLoading, entryValue, pageSelector, setActiveTab }) {


    const [ticketData, setTicketData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/ticket/OPEN_TICKETS/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const router = useRouter()


    useEffect(() => {
        setActiveTab("Open Tickets")
        setView(false)
        setActiveDashboard("TicketManagement")
        setActiveState("4")
        if (data) {
            setLoading(false)
            setTicketData(data)
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
            <section className={`px-4 justify-center w-full ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <section className={`pt-2 px-2 pb-2 w-full flex flex-col lg:flex-row items-center mt-8 h-fit lg:h-[61px] rounded-[10px] lg:rounded-[48px] bg-[#F3F3F3]`}>
                    <section className={`md:w-[250px] w-[95%] flex h-[40px] bg-white rounded-[20px] px-2 relative  items-center justify-between`}>
                        <input className="search-tab rounded-[20px] w-[80%]" placeholder="Search member" />
                        <div className="w-[28px] h-[28px] relative">
                            <ImageHolder src='/icons/search-icon.svg' />
                        </div>
                    </section>
                    <div className={`flex flex-col lg:mt-0 mt-[10px] gap-[10px] w-[90%] lg:grow lg:flex-row lg:justify-end lg:h-[35px]`}>
                        <div className={`h-[35px] w-full lg:w-[200px] `}>
                            <UserButton type="file" />
                        </div>
                        <div className="h-[35px]  w-full lg:w-[200px]">
                            <UserButton type="pdf" />
                        </div>
                        <div className={`h-[35px]  w-full lg:w-[200px]`}>
                            <UserButton type="gradient" text="+ Create Ticket" />
                        </div>
                    </div>
                </section>
            </section>

            <section className="min-h-[674px] mt-[20px] w-full pt-4 pl-2 pr-4">
                <TableContainer pageSelector={pageSelector} entryValue={entryValue}>
                    <table className="table-fixed px-[15px] w-full">
                        <thead>
                            <tr className="">
                                <th className="font-400 w-[160px] text-start  text-[12px] leading-[15.62px] font-pushpennyBook">DATE</th>
                                <th className="font-400 w-[132px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">CATEGORY</th>
                                <th className="font-400 w-[106px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">UNIQUE ID</th>
                                <th className="font-400 w-[90px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">CLIENT</th>
                                <th className="font-400 w-[70px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">SUBJECT</th>
                                <th className="font-400 w-[46px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">STATUS</th>
                                <th className="font-400 w-[88px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="mt-6">
                            {ticketData?.data.map((ticket, index) => {
                                return (
                                    <tr key={index} className="h-[70px] border-b px-[10px] border-[#979797]">
                                        <td className="font-pushpennyBook  w-[160px] break-words font-400 text-[14px] leading-[14px] text-[#6E7883]">{dateFormatter(ticket.dateCreated)}</td>
                                        <td className="font-pushpennyBook  w-[132px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{ticket.department}</td>
                                        <td className="font-pushpennyBook  w-[106px] break-words  font-400 text-[14px] leading-[14px] text-[#6E7883]">{ticket.uniqueId}</td>
                                        <td className="font-pushpennyBook  w-[90px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{ticket.agentName}</td>
                                        <td className="font-pushpennyBook  w-[70px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{ticket.subject}</td>
                                        <td className="font-pushpennyBook  w-[46px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{ticket.ticketStatus}</td>
                                        <td className="font-pushpennyBook  group:ml-[10px] w-[88px]">
                                            <div className="w-[88px] h-[30px] rounded-[24px]">
                                                <UserButton type="view" text="View" onClick={() => { router.push(`/dashboard/support/ticket-management/${ticket.id}`) }} />
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
    )
}



Tickets.Layout = MetricLayoutTemplate