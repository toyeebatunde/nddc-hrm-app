
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

export default function Reconciliation({ modals, setToken, setActiveDashboard, setActiveState, viewState, setView, isLoading, setLoading, entryValue, pageSelector, formatDate, dateRange, search }) {

    const [reconciliationData, setReconciliationData] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [filteredData, setFilteredData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data: recon, error: reconError } = useSWR(`${testEnv}v1/reconciliation/filter_all_by_dates?from=${formatDate(dateRange.dateFrom)}&to=${formatDate(dateRange.dateTo)}&pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const { data: dateFiltered, error: filteredError } = useSWR(`${testEnv}v1/reconciliation/filter_all_by_dates?from=${formatDate(dateRange.dateFrom)}&to=${formatDate(dateRange.dateTo)}&pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)


    useEffect(() => {
        // setLoading(true)
        setView(false)
        setActiveDashboard("Reconciliation")
        setActiveState("2")
        if (recon) {
            setLoading(false)
            // debugger
            setReconciliationData(recon.data.ReconciliationList)
            setTotalPages(recon.data.TotalPages)
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
        if (recon) {
            setReconciliationData(recon.data.ReconciliationList)
        }
        if (reconError) {
            // console.log(filteredError)
        }
    }, [entryValue, dateRange])


    const dateFormatter = (stamp) => {
        const date = new Date(stamp)
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes()
    }





    return (
        <div className="w-full">
            <section className={`py-2 w-full mt-[20px] ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <section className={`min-h-[674px] w-full min-h-[674px] w-full  pt-4 pl-[5px]`}>
                    <TableContainer entryValue={entryValue} pageSelector={pageSelector} totalPages={totalPages}>
                        <table className="table-fixed w-full">
                            <thead>
                                <tr className="px-[10px">
                                    <th className="font-400 w-[116px]  text-start  text-[12px] leading-[15.62px] font-pushpennyBook">DATE</th>
                                    <th className="font-400 w-[116px]  text-start  text-[12px] leading-[15.62px] font-pushpennyBook">CREDIT {"(IN)"}</th>
                                    <th className="font-400 w-[116px]  text-start  text-[12px] leading-[15.62px] font-pushpennyBook">DEBIT {"(OUT)"}</th>
                                    <th className="font-400 w-[116px]  text-start  text-[12px] leading-[15.62px] font-pushpennyBook">BALANCE</th>
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
                                {reconciliationData.map((reconItem, index) => {
                                    return (
                                        <tr className="fle h-[60px]">
                                            <td className="font-pushpennyBook fle w-[75px]  font-400 text-[14px] leading-[18px] text-[#6E7883]">{reconItem.dateCreated ? dateFormatter(reconItem.dateCreated) : "n/a"}</td>
                                            <td className="font-pushpennyBook  truncate   font-400 text-[14px] leading-[14px] text-[#6E7883]">{reconItem.totalInflow ? reconItem.totalInflow : "n/a"}</td>
                                            <td className="font-pushpennyBook truncate  w-[124px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{reconItem.totalOutflow ? reconItem.totalOutflow : "n/a"}</td>
                                            <td className="font-pushpennyBook fle w-[106px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{reconItem.totalClosingBalance ? reconItem.totalClosingBalance : "n/a"}</td>
                                            <td className="font-pushpennyBook fle w-[91px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{reconItem.ledgerBalance ?reconItem.ledgerBalance : "n/a"}</td>
                                            <td className="font-pushpennyBook truncate inline-block w-[165px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{reconItem.totalAgentCommission ? reconItem.totalAgentCommission : "n/a"}</td>
                                            <td className="font-pushpennyBook fle w-[90px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{reconItem.totalSuperAgentCommission ? reconItem.totalSuperAgentCommission : "n/a"}</td>
                                            <td className="font-pushpennyBook fle w-[50px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{reconItem.totalPayrailCommission ?reconItem.totalPayrailCommission : "n/a"}</td>
                                            <td className="font-pushpennyBook fle w-[69px]  font-[600] text-[11px] leading-[14px] text-[#6E7883]">{reconItem.glBalance ? reconItem.glBalance : "n/a"}</td>
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



Reconciliation.Layout = MetricLayoutTemplate