
import MetricLayoutTemplate from "../../../components/MetricLayoutTemplate";
// import ImageHolder from "../../../../components/ImageHolder";
import UserButton from "../../../components/ButtonMaker";
import { useEffect, useState } from "react";
import useSWR, { mutate } from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import { ngrok, testEnv, editApi } from "../../../components/Endpoints";
import TableContainer from "../../../components/TableContainer";
// import { useRouter } from "next/router";



const testAml = [
    {
        date: "27-6-2024 13:35",
        username: "08096596047",
        ip: "102.90.46.23",
        op: "Rapid Transaction",
        status: "Success"
    },
    {
        date: "24-6-2024 12:35",
        username: "0808564789",
        ip: "102.64.46.23",
        op: "High Amount Rate",
        status: "Failed"
    },
    {
        date: "24-6-2024 13:35",
        username: "08065783902",
        ip: "109.90.46.23",
        op: "Rapid Transaction",
        status: "Success"
    },
    {
        date: "20-6-2024 13:35",
        username: "08054119389",
        ip: "102.90.416.22",
        op: "Rapid Transaction",
        status: "Success"
    },
    {
        date: "18-6-2024 13:35",
        username: "08076789902",
        ip: "103.90.46.25",
        op: "High Amount Rate",
        status: "Success"
    },
    {
        date: "27-6-2024 13:35",
        username: "08096596047",
        ip: "102.90.46.23",
        op: "Rapid Transaction",
        status: "Success"
    },
    {
        date: "27-6-2024 13:35",
        username: "08096596047",
        ip: "102.90.46.23",
        op: "Rapid Transaction",
        status: "Success"
    }
]

export default function AmlAudit({ modals, setToken, setActiveDashboard, setActiveState, viewState, setView, isLoading, setLoading, entryValue, pageSelector, search, resetSearchParams, searchField, dateRange, day }) {

    const [auditData, setAuditData] = useState()
    const [dateFiltered, setDateFiltered] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data: audits, error: auditsError } = useSWR(`${testEnv}v1/audit/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const { data: auditsFiltered, error: auditsFilteredError } = useSWR(`${testEnv}v1/audit/filter_by_date_between?from=${formatDate(dateRange.dateFrom)}&pageNo=${entryValue.page}&pageSize=${entryValue.size}&to=${formatDate(dateRange.dateTo)}`, fetching)
    const { data: dayFiltered, error: dayFilteredError } = useSWR(`${testEnv}v1/audit/filter_by_days?days=${day}&pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const { data: searchBarData, error: searchBarDataError } = useSWR(`${testEnv}v1/audit/search?pattern=${searchField}&pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const {viewTransaction, setViewTransaction} = useState(false)
    const router = useRouter()


    useEffect(() => {
        setView(false)
        setLoading(true)
        resetSearchParams()
        setActiveDashboard("AMLAudits")
        setActiveState("4")

        const timeout = setTimeout(() => {
            if (!audits) {
                setLoading(false);
                window.alert("Something went wrong, loading is taking longer than usual. Please refresh page")
            }
        }, 10000)
        if (audits) {
            setLoading(false)
            setAuditData(audits)
        }
        if (auditsError) {
            console.log(auditsError)
        }
        return () => clearTimeout(timeout);
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
                                    <th className="font-400 w-[100px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">OPERATION TYPE</th>
                                    <th className="font-400 w-[100px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">STATUS</th>
                                    <th className="font-400 text-left  w-[88px] text-[12px] leading-[15.62px] font-pushpennyBook">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6">
                                {searchField == "" ?
                                    testAml.map((data, index) => {
                                        return (
                                            <tr key={index} className="h-[70px] border-b px-[10px] border-[#979797]">
                                                <td className="font-pushpennyBook  w-[135px] break-words font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.date}</td>
                                                <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.username}</td>
                                                <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.ip}</td>
                                                <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.op}</td>
                                                <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.status}</td>
                                                <td className="font-pushpennyBook  ">
                                                    <div className="w-[88px] h-[36px]">
                                                        <UserButton type="view" text="View" onClick={() => { router.push("/dashboard/agency/transactions/ARPPETER2440252635") }} />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }) :
                                    testAml.map((data, index) => {
                                        return (
                                            <tr key={index} className="h-[70px] border-b px-[10px] border-[#979797]">
                                                <td className="font-pushpennyBook  w-[135px] break-words font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.date}</td>
                                                <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.username}</td>
                                                <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.ip}</td>
                                                <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.op}</td>
                                                <td className="font-pushpennyBook  w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{data.status}</td>
                                                <td className="font-pushpennyBook  ">
                                                    <div className="w-[88px] h-[36px]">
                                                        <UserButton type="view" text="View" onClick={() => { router.push("/dashboard/agency/transactions/ARPPETER2440252635") }} />
                                                    </div>
                                                </td>
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

// /dashboard/agency/transactions/ARPPETER2440252635

AmlAudit.Layout = MetricLayoutTemplate