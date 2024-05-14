
import MetricLayoutTemplate from "../../../components/MetricLayoutTemplate";
// import ImageHolder from "../../../../components/ImageHolder";
import UserButton from "../../../components/ButtonMaker";
import { useEffect, useState } from "react";
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import { ngrok, testEnv, editApi } from "../../../components/Endpoints";
import Textfield from "../../../components/TextField";

export default function Settlement({ modals, setToken, setActiveDashboard, setActiveState, viewState, setView, isLoading, setLoading, entryValue }) {

    const [settlementData, setSettlementData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/settlement/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)


    useEffect(() => {
        setLoading(true)
        setView(false)
        setActiveDashboard("Settlement")
        setActiveState("2")
        if (data) {
            setLoading(false)
            setSettlementData(data.data)
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
                <section className={`h-[674px] w-full flex overflow-x-auto rounded-[10px] bg-brand-light-yellow pt-4 pl-[5px]`}>
                    <div className="w-[1135px] h-fit">

                        <table className="table-fixed px-[5px] w-full">
                            <thead>
                                <tr className="">
                                    <th className="borde font-400 w-[106px] text-left   text-[11px] leading-[15.62px] font-pushpennyBook">AGENT</th>
                                    <th className="borde font-400 w-[75px] lex text-left text-[11px] leading-[15.62px] font-pushpennyBook">DATE</th>
                                    <th className="borde font-400 w-[73px] lex text-left text-[11px] leading-[15.62px] font-pushpennyBook">TYPE/ID</th>
                                    <th className="borde font-400 w-[80px] lex text-left text-[11px] leading-[15.62px] font-pushpennyBook">SERVICE TYPE</th>
                                    <th className="borde font-400 w-[73px] lex text-left text-[11px] leading-[15.62px] font-pushpennyBook">AMOUNT</th>
                                    <th className="borde font-400 w-[122px] lex text-left text-[12px] leading-[15.62px] font-pushpennyBook">COMMISSION AGENT</th>
                                    <th className="borde font-400 w-[114px] lex text-left text-[11px] leading-[15.62px] font-pushpennyBook">COMMISSION SA</th>
                                    <th className="borde font-400 w-[70px] lex text-left text-[11px] leading-[15.62px] font-pushpennyBook">STATUS</th>
                                    <th className="borde font-400 w-[118px] lex text-left text-[11px] leading-[15.62px] font-pushpennyBook">PRE BALANCE</th>
                                    <th className="borde font-400 w-[118px] lex text-left text-[11px] leading-[15.62px] font-pushpennyBook">POST BALANCE</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6 ">
                                {settlementData?.map((settlement, index) => {
                                    return (
                                        <tr key={index} className="h-[50px] border-b border-[#979797]">
                                            <td className="borde font-pushpennyBook truncate  font-400 text-[14px] leading-[14px] text-[#6E7883]">{settlement.agentPhoneNumber}</td>
                                            <td className="font-pushpennyBook truncate font-400 text-[14px] leading-[18px] text-[#6E7883]">{dateFormatter(settlement.date)}</td>
                                            <td className="font-pushpennyBook truncate  font-400 text-[14px] leading-[14px] text-[#6E7883]">{settlement.transactionId}</td>
                                            <td className="font-pushpennyBook  truncate font-400 text-[14px] leading-[14px] text-[#6E7883]">{settlement.serviceType}</td>
                                            <td className="font-pushpennyBook  truncate font-400 text-[14px] leading-[14px] text-[#6E7883]">{settlement.amount}</td>
                                            <td className="font-pushpennyBook  truncate font-400 text-[14px] leading-[14px] text-[#6E7883]">{settlement.agentCommission}</td>
                                            <td className="font-pushpennyBook  truncate font-400 text-[14px] leading-[14px] text-[#6E7883]">{settlement.superAgentCommission}</td>
                                            <td className="font-pushpennyBook  truncate font-400 text-[14px] leading-[14px] text-[#6E7883]">{settlement.settlementStatus}</td>
                                            <td className="font-pushpennyBook  truncate font-400 text-[14px] leading-[14px] text-[#6E7883]">{settlement.preBalance}</td>
                                            <td className="font-pushpennyBook  truncate font-400 text-[14px] leading-[14px] text-[#6E7883]">{settlement.postBalance}</td>
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



Settlement.Layout = MetricLayoutTemplate