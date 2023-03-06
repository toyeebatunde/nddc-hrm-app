
import MetricLayoutTemplate from "../../../../../components/MetricLayoutTemplate";
// import ImageHolder from "../../../../components/ImageHolder";
import UserButton from "../../../../../components/ButtonMaker";
import { useEffect, useState } from "react";
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import { ngrok, testEnv } from "../../../../../components/Endpoints";
import TableContainer from "../../../../../components/TableContainer";

export default function Agents({ modals, setToken, setActiveDashboard, setActiveState, entryValue, pageSelector, setActiveTab }) {

    const [agentData, setAgentData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/agent/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const router = useRouter()

    useEffect(() => {
        setActiveTab("Agents")
        setToken()
        setActiveDashboard("Agent Management")
        setActiveState("2")
        if (data) {
            setAgentData(data)
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
                <section className="min-h-[674px] w-full  pt-4 pl-[5px]">
                    <TableContainer pageSelector={pageSelector} entryValue={entryValue}>

                        <table className=" w-full">
                            <thead>
                                <tr className="">
                                    <th className="font-400 borde  w-[90px] text-start  text-[12px] leading-[15.62px] font-pushpennyBook">AGENT ID</th>
                                    <th className="font-400 bordr  ml-[10px]   w-[120px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">USERNAME</th>
                                    <th className="font-400  boder w-[100px] text-[12px] text-start leading-[15.62px] font-pushpennyBook">TYPE</th>
                                    <th className="font-400 boder  w-[100px] text-[12px] text-start leading-[15.62px] font-pushpennyBook">NAME F/L</th>
                                    <th className="font-400 brder  w-[120px] text-[12px] text-start leading-[15.62px] font-pushpennyBook">PHONE NUMBER</th>
                                    <th className="font-400 order  w-[80px] break-words text-[12px] text-start leading-[15.62px] font-pushpennyBook">STATUS/ ACTIVITIES</th>
                                    <th className="font-400 borer  w-[75px] text-[12px] leading-[15.62px] text-start font-pushpennyBook">CREATED ON</th>
                                    <th className="font-40 borde  w-[75px] text-[12px] leading-[15.62px] text-start font-pushpennyBook">LAST LOGIN</th>
                                    <th className="font-400 bordr  w-[100px] text-[12px] leading-[15.62px] text-start font-pushpennyBook">STATE/LGA</th>
                                    <th className="font-400 borer  w-[173px] text-[12px] leading-[15.62px] text-start font-pushpennyBook">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6 ">
                                {data?.data.map((agent, index) => {
                                    return (
                                        <tr key={index} className=" justify-between h-[50px]">
                                            <td className="font-pushpennyBook  w-[95px]  font-400 text-[14px] leading-[18px] text-start text-[#6E7883]">{agent.agentIdentifier}</td>
                                            <td className="font-pushpennyBook  w-[120px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{agent.userName}</td>
                                            <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{agent.agentType}</td>
                                            <td className="font-pushpennyBook   w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">

                                                {agent.firstName} <br></br>
                                                {agent.lastName}

                                            </td>
                                            <td className="font-pushpennyBook  w-[120px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">+2347039429722</td>
                                            <td className="font-pushpennyBook  w-[80px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">
                                                <h2>
                                                    Activated
                                                </h2>
                                                <h2>
                                                    Inactive
                                                </h2>
                                            </td>
                                            <td className="font-pushpennyBook  w-[75px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{dateFormatter(agent.dateCreated)}</td>
                                            <td className="font-pushpennyBook  w-[75px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{dateFormatter(agent.lastLoginDate) || ""}</td>
                                            <td className="font-pushpennyBook  w-[100px] font-400 text-[14px] leading-[14px] text-[#6E7883]">
                                                <h2>
                                                    {agent.state}
                                                </h2>
                                                <h2>
                                                    {agent.lga}
                                                </h2>
                                            </td>
                                            <td className="font-pushpennyBook gap-[5px] w-[175px] flex  items-start">
                                                <div className="w-[80px] h-[36px]">
                                                    <UserButton type="edit" />
                                                </div>
                                                <div className="w-[88px] h-[36px]">
                                                    <UserButton type="view" text="View" onClick={() => { router.push(`/dashboard/agency/agent-management/agents/${agent.id}`) }} />
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

Agents.Layout = MetricLayoutTemplate