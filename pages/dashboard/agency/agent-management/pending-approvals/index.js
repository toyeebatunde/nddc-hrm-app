
import MetricLayoutTemplate from "../../../../../components/MetricLayoutTemplate";
// import ImageHolder from "../../../../components/ImageHolder";
import UserButton from "../../../../../components/ButtonMaker";
import { useEffect, useState } from "react";
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import { ngrok, testEnv } from "../../../../../components/Endpoints";

export default function Agents({ modals, setToken, setActiveDashboard, setActiveState, entryValue, setActiveTab }) {

    const [agentData, setAgentData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/agent/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const router = useRouter()

    useEffect(() => {
        setActiveTab("KYC Pending approvals")
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
                <section className="h-[674px] w-full overflow-x-auto rounded-[10px] bg-brand-light-yellow pt-4 pl-[5px]">
                    <div className="w-[1135px] h-fit">

                        <table className="table-fixed w-full flex flex-col">
                            <thead>
                                <tr className="flex justify-between">
                                    <th className="font-400   flex w-[100px]  text-[12px] leading-[15.62px] font-pushpennyBook">AGENT ID</th>
                                    <th className="font-400  ml-[10px]  flex w-[120px] text-[12px] leading-[15.62px] font-pushpennyBook">USERNAME</th>
                                    <th className="font-400  flex w-[100px] text-[12px] leading-[15.62px] font-pushpennyBook">TYPE</th>
                                    <th className="font-400  flex w-[100px] text-[12px] leading-[15.62px] font-pushpennyBook">NAME F/L</th>
                                    <th className="font-400  flex w-[120px] text-[12px] leading-[15.62px] font-pushpennyBook">PHONE NUMBER</th>
                                    <th className="font-400  flex w-[80px] break-words text-[12px] leading-[15.62px] font-pushpennyBook">STATUS/ ACTIVITIES</th>
                                    <th className="font-400  flex w-[75px] text-[12px] leading-[15.62px] font-pushpennyBook">CREATED ON</th>
                                    <th className="font-400  flex w-[75px] text-[12px] leading-[15.62px] font-pushpennyBook">LAST LOGIN</th>
                                    <th className="font-400  flex w-[100px] text-[12px] leading-[15.62px] font-pushpennyBook">STATE/LGA</th>
                                    <th className="font-400  flex w-[173px] text-[12px] leading-[15.62px] font-pushpennyBook">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6 ">
                                {data?.data.map((agent, index) => {
                                    return (
                                        <tr key={index} className="flex justify-between h-[50px]">
                                            <td className="font-pushpennyBook flex w-[100px]  font-400 text-[14px] leading-[18px] text-[#6E7883]">{agent.agentIdentifier}</td>
                                            <td className="font-pushpennyBook flex w-[120px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{agent.userName}</td>
                                            <td className="font-pushpennyBook flex w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{agent.agentType}</td>
                                            <td className="font-pushpennyBook flex flex-col w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">
                                                <h2>
                                                    {agent.firstName}
                                                </h2>
                                                <h2>
                                                    {agent.lastName}
                                                </h2>
                                            </td>
                                            <td className="font-pushpennyBook flex w-[120px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">+2347039429722</td>
                                            <td className="font-pushpennyBook flex w-[80px]  font-400 text-[14px] flex-col leading-[14px] text-[#6E7883]">
                                                <h2>
                                                    Activated
                                                </h2>
                                                <h2>
                                                    Inactive
                                                </h2>
                                            </td>
                                            <td className="font-pushpennyBook flex w-[75px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{dateFormatter(agent.dateCreated)}</td>
                                            <td className="font-pushpennyBook flex w-[75px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{dateFormatter(agent.lastLoginDate) || ""}</td>
                                            <td className="font-pushpennyBook flex w-[100px] font-400 text-[14px] leading-[14px] flex-col text-[#6E7883]">
                                                <h2>
                                                    {agent.state}
                                                </h2>
                                                <h2>
                                                    {agent.lga}
                                                </h2>
                                            </td>
                                            <td className="font-pushpennyBook gap-[5px] flex w-[175px]  flex items-start">
                                                <div className="w-[80px] h-[36px]">
                                                    <UserButton type="edit" />
                                                </div>
                                                <div className="w-[88px] h-[36px]">
                                                    <UserButton type="view" text="View" onClick={()=>{ router.push(`/dashboard/agency/agent-management/agents/${agent.id}`)}} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </section>
        </div>
    )
}

Agents.Layout = MetricLayoutTemplate