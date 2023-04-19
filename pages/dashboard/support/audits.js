
import MetricLayoutTemplate from "../../../components/MetricLayoutTemplate";
// import ImageHolder from "../../../../components/ImageHolder";
import UserButton from "../../../components/ButtonMaker";
import { useEffect, useState } from "react";
import useSWR, {mutate} from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import { ngrok, testEnv, editApi } from "../../../components/Endpoints";
import TableContainer from "../../../components/TableContainer";

export default function Audit({ modals, setToken, setActiveDashboard, setActiveState, viewState, setView, isLoading, setLoading, entryValue, pageSelector, search, resetSearchParams, searchField, dateRange, day }) {
    
    const [auditData, setAuditData] = useState()
    const [dateFiltered, setDateFiltered] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data: audits, error:auditsError } = useSWR(`${testEnv}v1/audit/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const { data: auditsFiltered, error:auditsFilteredError } = useSWR(`${testEnv}v1/audit/filter_by_date_between?from=${formatDate(dateRange.dateFrom)}&pageNo=${entryValue.page}&pageSize=${entryValue.size}&to=${formatDate(dateRange.dateTo)}`, fetching)
    const { data: dayFiltered, error: dayFilteredError } = useSWR(`${testEnv}v1/audit/filter_by_days?days=${day}&pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const { data: searchBarData, error: searchBarDataError } = useSWR(`${testEnv}v1/audit/search?pattern=${searchField}&pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)


    useEffect(() => {
        setView(false)
        resetSearchParams()
        setActiveDashboard("Audits")
        setActiveState("4")
        if (audits) {
            setLoading(false)
            setAuditData(audits)
        }
        if (auditsError) {
            console.log(auditsError)
        }
    }, [audits, entryValue])

    useEffect(() => {
        // mutate(`${testEnv}v1/audit/filter_by_date_between?from=${formatDate(dateRange.dateFrom)}&pageNo=${entryValue.page}&pageSize=${entryValue.size}&to=${formatDate(dateRange.dateTo)}`)
        if (auditsFiltered) {
            setDateFiltered(auditsFiltered)
        }
        if (auditsFilteredError) {
            console.log(auditsFilteredError)
        }
    }, [auditsFiltered])

    useEffect(() => {
        if (dayFiltered) {
            setDateFiltered(dayFiltered)
        }
        if (dayFilteredError) {
            console.log(dayFilteredError)
        }
    }, [dayFiltered])

    function formatDate(date) {
        var d = (date.getUTCDate() + 1).toString(),
            m = (date.getUTCMonth() + 1).toString(),
            y = date.getUTCFullYear().toString(),
            formatted = '';
        if (d.length === 1) {
            d = '0' + d;
        }
        if (m.length === 1) {
        }
        formatted = d + '-' + m + '-' + y;
        return formatted;
    }

    useEffect(() => {
        if (searchBarData) {
            // setSearchedField(searchBarData)
        }
        if (searchBarDataError) {
            console.log(searchBarDataError)
        }
    }, [searchBarData])


    const dateFormatter = (stamp) => {
        const date = new Date(stamp)
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes()
    }





    return (
        <div className="w-full">

            <section className={`py-2 w-full mt-[20px] ${modals.isOpen ? "blur-sm" : "blur-none"}`}>

                <section className="min-h-[674px] mt-[20px] w-full pt-4 pl-2 pr-4">
                    <TableContainer pageSelector={pageSelector} entryValue={entryValue}>
                        <table className="table-fixed px-[15px] w-full">
                            <thead>
                                <tr className="">
                                    <th className="font-400 w-[135px] text-start  text-[12px] leading-[15.62px] font-pushpennyBook">DATE</th>
                                    <th className="font-400 w-[100px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">USERNAME</th>
                                    <th className="font-400 w-[100px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">IP ADDRESS</th>
                                    <th className="font-400 w-[100px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">OPERATION</th>
                                    <th className="font-400 w-[100px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">COMMENT</th>
                                    <th className="font-400 w-[100px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">STATUS</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6">
                                {searchField == "" ?
                                (search ? dateFiltered : auditData)?.data.map((data, index) => {
                                    return (
                                        <tr key={index} className="h-[70px] border-b px-[10px] border-[#979797]">
                                            <td className="font-pushpennyBook  w-[135px] break-words font-400 text-[14px] leading-[14px] text-[#6E7883]">{dateFormatter(data.dateCreated)}</td>
                                            <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.initiatedBy}</td>
                                            <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.ipAddress}</td>
                                            <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.operation}</td>
                                            <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.comments}</td>
                                            <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.status}</td>

                                        </tr>
                                    )
                                }) :
                                searchBarData?.data.map((data, index) => {
                                    return (
                                        <tr key={index} className="h-[70px] border-b px-[10px] border-[#979797]">
                                            <td className="font-pushpennyBook  w-[135px] break-words font-400 text-[14px] leading-[14px] text-[#6E7883]">{dateFormatter(data.dateCreated)}</td>
                                            <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.initiatedBy}</td>
                                            <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.ipAddress}</td>
                                            <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.operation}</td>
                                            <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.comments}</td>
                                            <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.status}</td>

                                        </tr>
                                    )
                                })
                                }

                            </tbody>
                        </table>
                    </TableContainer>
                </section>
            </section>
        </div>
    )
}



Audit.Layout = MetricLayoutTemplate