
import MetricLayoutTemplate from "../../../../../components/MetricLayoutTemplate";
// import ImageHolder from "../../../../components/ImageHolder";
import UserButton from "../../../../../components/ButtonMaker";
import { useEffect, useState } from "react";
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import { ngrok, testEnv, editApi } from "../../../../../components/Endpoints";
import Textfield from "../../../../../components/TextField";
import TableContainer from "../../../../../components/TableContainer";

export default function TransactionHistory({ modals, setToken, setActiveDashboard, setActiveState, viewState, setView, isLoading, setLoading, entryValue, pageSelector, dateRange, search, searchField }) {

    const [id, setId] = useState()
    const [transactionHistoryData, setTransactionHistoryData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)

    useEffect(() => {
        const newId = localStorage.getItem('id')
        setId(newId)
    }, [])
    const { data, error } = useSWR(`${testEnv}v1/agent/${id}/transaction_history?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)


    useEffect(() => {
        setLoading(true)
        setView(false)
        setActiveDashboard("AgentManagemen")
        setActiveState("2")
        if (data) {
            setLoading(false)
            setTransactionHistoryData(data)
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
                <section className={`min-h-[674px] w-full pt-4 pl-[5px]`}>
                    <TableContainer pageSelector={pageSelector} entryValue={entryValue}>
                        <table className="table-fixed px-[5px] w-full">
                            <thead>
                                <tr className="">
                                    <th className="font-400 w-[75px] text-[12px] text-start leading-[15.62px] font-pushpennyBook">DATE</th>
                                    <th className="font-400 w-[148px] text-[12px] text-start leading-[15.62px] font-pushpennyBook">REFERENCE</th>
                                    <th className="font-400 w-[73px]   text-[12px] text-start leading-[15.62px] font-pushpennyBook">TRAN TYPE</th>
                                    <th className="font-400 w-[80px]   text-[12px] text-start leading-[15.62px] font-pushpennyBook">DESCRIPTION</th>
                                    <th className="font-400 w-[105px]   text-[12px] text-start leading-[15.62px] font-pushpennyBook">CHANNEL</th>
                                    <th className="font-400 w-[75px]   text-[12px] text-start leading-[15.62px] font-pushpennyBook">AMOUNT</th>
                                    <th className="font-400 w-[85px]   text-[12px] text-start leading-[15.62px] font-pushpennyBook">OLD BALANCE</th>
                                    <th className="font-400 w-[85px]   text-[12px] text-start leading-[15.62px] font-pushpennyBook">NEW BALANCE</th>
                                    <th className="font-400 w-[70px]   text-[12px] text-start leading-[15.62px] font-pushpennyBook">STATUS</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6 ">
                                {transactionHistoryData?.data.map((customer, index) => {
                                    return (
                                        <tr key={index} className="items-center h-[50px] border-b border-[#979797]">
                                            <td className="font-pushpennyBook    font-400 text-[14px] leading-[14px] text-[#6E7883]">{dateFormatter(customer.dateCreated)}</td>
                                            <td className="font-pushpennyBook    font-400 text-[14px] leading-[14px] text-[#6E7883]">{customer.reference}</td>
                                            <td className="font-pushpennyBook    font-400 text-[14px] leading-[14px] text-[#6E7883]">{customer.tranType}</td>
                                            <td className="font-pushpennyBook    font-400 text-[14px] leading-[14px] text-[#6E7883] truncate">{customer.purpose}</td>
                                            <td className="font-pushpennyBook    font-400 text-[14px] leading-[14px] text-[#6E7883]">{customer.channel}</td>
                                            <td className="font-pushpennyBook    font-400 text-[14px] leading-[14px] text-[#6E7883]">{customer.amount}</td>
                                            <td className="font-pushpennyBook    font-400 text-[14px] leading-[14px] text-[#6E7883]">{customer.oldBalance}</td>
                                            <td className="font-pushpennyBook    font-400 text-[14px] leading-[14px] text-[#6E7883]">{customer.newBalance}</td>
                                            <td className="font-pushpennyBook    font-400 text-[14px] leading-[14px] text-[#6E7883]">{customer.tranStatus}</td>
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



TransactionHistory.Layout = MetricLayoutTemplate