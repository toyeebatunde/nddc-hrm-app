
import MetricLayoutTemplate from "../../../components/MetricLayoutTemplate";
// import ImageHolder from "../../../../components/ImageHolder";
import UserButton from "../../../components/ButtonMaker";
import { useEffect, useState } from "react";
import useSWR, { mutate } from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import { ngrok, testEnv, editApi } from "../../../components/Endpoints";
import Textfield from "../../../components/TextField";
import TableContainer from "../../../components/TableContainer";

export default function Reconciliation({ modals, setToken, setActiveDashboard, setActiveState, viewState, setView, isLoading, setLoading, entryValue, formatDate, dateRange, search }) {

    const [reconciliationData, setReconciliationData] = useState()
    const [filteredData, setFilteredData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data: recon, error:reconError } = useSWR(`${testEnv}v1/reconciliation/current?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const { data:dateFiltered, error:filteredError } = useSWR(`${testEnv}v1/reconciliation/filter_all_by_dates?from=${formatDate(dateRange.dateFrom)}&pageNo=${entryValue.page}&pageSize=${entryValue.size}&to=${formatDate(dateRange.dateTo)}`, fetching)


    useEffect(() => {
        setLoading(true)
        setView(false)
        setActiveDashboard("Reconciliation")
        setActiveState("2")
        if (recon) {
            setLoading(false)
            setReconciliationData(recon)
        }
        if (reconError) {
            console.log(reconError)
        }
    }, [recon])

    useEffect(() => {
        // if(dateRange.dateTo < dateRange.dateFrom) {
        //     console.log("valid date range")
        // }
        mutate(`${testEnv}v1/reconciliation/filter_all_by_dates?from=${formatDate(dateRange.dateFrom)}&pageNo=${entryValue.page}&pageSize=${entryValue.size}&to=${formatDate(dateRange.dateTo)}`)
        if (dateFiltered) {
            setFilteredData(dateFiltered.data)
        }
        if (filteredError) {
            console.log(filteredError)
        }
    }, [dateFiltered])


    const dateFormatter = (stamp) => {
        const date = new Date(stamp)
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes()
    }





    return (
        <div className="w-full">

            <section className={`py-2 w-full mt-[20px] ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <section className={`h-[674px] w-full overflow-x-auto rounded-[10px] bg-brand-light-yellow pt-4 pl-[5px]`}>
                    <div className="min-w-[1135px] h-fit">

                        <table className="table-fixed px-[5px] w-full">
                            <thead>
                                <tr className="px-[10px]">
                                    <th className="font-400 w-[116px]  text-start   text-[12px] leading-[15.62px] font-pushpennyBook">DATE</th>
                                    <th className="font-400 w-[116px]  text-start  text-[12px] leading-[15.62px] font-pushpennyBook">CREDIT {"(IN)"}</th>
                                    <th className="font-400 w-[116px]  text-start   text-[12px] leading-[15.62px] font-pushpennyBook">DEBIT {"(OUT)"}</th>
                                    <th className="font-400 w-[116px]  text-start   text-[12px] leading-[15.62px] font-pushpennyBook">BALANCE</th>
                                    <th className="font-400 w-[116px]  text-start  text-[12px] leading-[15.62px] font-pushpennyBook">LEDGER BALANCE</th>
                                    <th className="font-400 w-[116px]  text-start  text-[12px] leading-[15.62px] font-pushpennyBook">AGENT</th>
                                    <th className="font-400 w-[116px]  text-start  text-[12px] leading-[15.62px] font-pushpennyBook">SUPER AGENT</th>
                                    <th className="font-400 w-[116px]  text-start  text-[12px] leading-[15.62px] font-pushpennyBook">PAYRAIL</th>
                                    <th className="font-400 w-[161px]  text-start  text-[12px] leading-[15.62px] font-pushpennyBook">GL BALANCE</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6">
                                <tr>
                                    <th colSpan="1" className=""></th>
                                    <th colSpan="2" className="">Agents Wallet</th>
                                    <th colSpan="2" className="">Commissions</th>
                                    <th className="w-[161px] "></th>
                                </tr>

                                {/* {(search ? filteredData : transactionsData)?.map((transaction, index) => {
                                    return (
                                        <tr key={index} className="flex justify-between h-[60px]">
                                            <td className="font-pushpennyBook flex w-[75px]  font-400 text-[14px] leading-[18px] text-[#6E7883]">{dateFormatter(transaction.dateCreated)}</td>
                                            <td className="font-pushpennyBook w-[148px] truncate inline-block  font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.tranRef}</td>
                                            <td className="font-pushpennyBook truncate inline-block w-[124px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.type}</td>
                                            <td className="font-pushpennyBook flex w-[106px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.agent.userName}</td>
                                            <td className="font-pushpennyBook flex w-[91px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.serviceName}</td>
                                            <td className="font-pushpennyBook truncate inline-block w-[165px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.externalServiceReference || "n/a"}</td>
                                            <td className="font-pushpennyBook flex w-[90px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.amount}</td>
                                            <td className="font-pushpennyBook flex w-[50px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.charge}</td>
                                            <td className="font-pushpennyBook flex w-[69px]  font-[600] text-[11px] leading-[14px] text-[#6E7883]">{transaction.status}</td>
                                            <td className="font-pushpennyBook flex w-[88px]  flex items-start">
                                                <div className="w-[88px] h-[36px]">
                                                    <UserButton type="view" text="View" onClick={() => { router.push(`/dashboard/agency/transactions/${transaction.id}`) }} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })} */}
                                
                            </tbody>
                        </table>

                    </div>
                </section>
            </section>
        </div>
    )
}



Reconciliation.Layout = MetricLayoutTemplate