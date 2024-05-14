
import MetricLayoutTemplate from "../../../../components/MetricLayoutTemplate";
// import ImageHolder from "../../../../components/ImageHolder";
import UserButton from "../../../../components/ButtonMaker";
import { useEffect, useState } from "react";
import useSWR, { mutate } from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import { ngrok, testEnv } from "../../../../components/Endpoints";
import TableContainer from "../../../../components/TableContainer";

export default function Transactions({ modals, setToken, setActiveDashboard, setActiveState, setLoading, activeTab, setActiveTab, entryValue, pageSelector, search, setSearch, formatDate, dateRange, searchField, resetSearchParams, day, resetDay, rangeParam }) {

    const [transactionsData, setTransactionsData] = useState([])
    const [filteredData, setFilteredData] = useState()
    const [transactionToView, setTransactionToView] = useState()
    const [viewState, setViewState] = useState(true)
    const [totalPages, setTotalPages] = useState(0)
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data: allTransactions, error: allTransactionsError } = useSWR(`${testEnv}v1/transaction/withdrawal/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const { data: dateFiltered, error: filteredError } = useSWR(`${testEnv}v1/transaction/withdrawal/filter_by_dates?from=${formatDate(dateRange.dateFrom)}&pageNo=${entryValue.page}&pageSize=${entryValue.size}&to=${formatDate(dateRange.dateTo)}`, fetching)
    const { data: dayFiltered, error: dayFilteredError } = useSWR(`${testEnv}v1/transaction/withdrawal/filter_by_days?days=${day}&pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const { data: searchBarData, error: searchBarDataError } = useSWR(`${testEnv}v1/transaction/search/withdrawal?pattern=${searchField}&pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)

    const router = useRouter()


    useEffect(() => {
        resetSearchParams()
        resetDay()
    }, [])

    useEffect(() => {
        setActiveTab("Withdrawals")
        setLoading(true)
        setToken()
        setActiveDashboard("Transactions")
        setActiveState("2")
        if (allTransactions) {
            console.log("all withdrawals data: ", allTransactions.data.Transactions)
            setLoading(false)
            setTransactionsData(allTransactions.data.Transactions)
            setTotalPages(allTransactions.data.TotalPages)
        }
        if (allTransactionsError) {
            console.log(allTransactionsError)
        }
    }, [allTransactions])

    useEffect(() => {
        let newSearch
        axios.get(`${testEnv}v1/transaction/withdrawal/filter_by_days?days=${day}&pageNo=${entryValue.page}&pageSize=${entryValue.size}`,
            { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
            .then(res => {
                // debugger
                // setSearchedField(res.data)
                newSearch = res.data
                console.log(newSearch)
                if (rangeParam == "date") {
                    setFilteredData(res.data.data.Transactions)
                    setTotalPages(res.data.data.TotalPages)
                }
            }
            )
        if (dayFilteredError) {
            console.log(dayFilteredError)
        }
    }, [day, entryValue])

    useEffect(() => {
        mutate(`${testEnv}v1/transaction/withdrawal/filter_by_dates?from=${formatDate(dateRange.dateFrom)}&pageNo=${entryValue.page}&pageSize=${entryValue.size}&to=${formatDate(dateRange.dateTo)}`)
        if (dateFiltered) {
            setFilteredData(dateFiltered.data.Transactions)
            if (search) {
                setTotalPages(dateFiltered.data.TotalPages)
            }
        }
        if (filteredError) {
            console.log(filteredError)
        }
    }, [dateFiltered, entryValue])



    useEffect(() => {
        // if(dateRange.dateTo < dateRange.dateFrom) {
        //     console.log("valid date range")
        // }
        // mutate(`${testEnv}v1/agent/filter_all_by_dates?from=${formatDate(dateRange.dateFrom)}&pageNo=${entryValue.page}&pageSize=${entryValue.size}&to=${formatDate(dateRange.dateTo)}`)
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
                <section className={`min-h-[674px] w-full  pt-4 pl-[5px]`}>
                    <TableContainer totalPages={totalPages} entryValue={entryValue} pageSelector={pageSelector}>

                        <table className="table-fixed w-full">
                            <thead>
                                <tr className="">
                                    <th className="font-400 text-left   w-[75px]  text-[12px] leading-[15.62px] font-pushpennyBook">DATE</th>
                                    <th className="font-400 text-left  w-[148px] text-[12px] leading-[15.62px] font-pushpennyBook">REFERENCE</th>
                                    <th className="font-400 text-left  w-[124px] text-[12px] leading-[15.62px] font-pushpennyBook">TRANSACTION TYPE</th>
                                    <th className="font-400 text-left  w-[106px] text-[12px] leading-[15.62px] font-pushpennyBook">AGENT</th>
                                    <th className="font-400 text-left  w-[91px] break-words text-[12px] leading-[15.62px] font-pushpennyBook">SERVICE</th>
                                    <th className="font-400 text-left  w-[125px] text-[12px] leading-[15.62px] font-pushpennyBook">SERVICE REFERENCE</th>
                                    <th className="font-400 text-left  w-[90px] text-[12px] leading-[15.62px] font-pushpennyBook">AMOUNT</th>
                                    <th className="font-400 text-left  w-[50px] text-[12px] leading-[15.62px] font-pushpennyBook">CHARGE</th>
                                    <th className="font-400 text-left  w-[69px]  text-[12px] leading-[15.62px] font-pushpennyBook">STATUS</th>
                                    <th className="font-400 text-left  w-[88px] text-[12px] leading-[15.62px] font-pushpennyBook">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6 ">
                                {searchField == "" ?
                                    (search ? filteredData : transactionsData)?.map((transaction, index) => {
                                        return (
                                            <tr key={index} className="h-[60px]">
                                                <td className="font-pushpennyBook    font-400 text-[14px] leading-[18px] text-[#6E7883]">{dateFormatter(transaction.date)}</td>
                                                <td className="font-pushpennyBook  truncate   font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.reference}</td>
                                                <td className="font-pushpennyBook truncate w-[124px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.transType || "n/a"}</td>
                                                <td className="font-pushpennyBook   truncate   font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.customerInfo.name || "n/a"}</td>
                                                <td className="font-pushpennyBook   truncate font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.serviceInfo.serviceName || "n/a"}</td>
                                                <td className="font-pushpennyBook truncate font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.serviceReference || "n/a"}</td>
                                                <td className="font-pushpennyBook    font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.amount}</td>
                                                <td className="font-pushpennyBook    font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.charge || "n/a"}</td>
                                                <td className="font-pushpennyBook    font-[600]  truncate text-[11px] leading-[14px] text-[#6E7883]">{transaction.status}</td>
                                                <td className="font-pushpennyBook  ">
                                                    <div className="w-[88px] h-[36px]">
                                                        <UserButton type="view" text="View" onClick={() => { router.push(`/dashboard/agency/transactions/${transaction.id}`) }} />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }) :
                                    searchBarData?.data.map((transaction, index) => {
                                        return (
                                            <tr key={index} className="h-[60px]">
                                                <td className="font-pushpennyBook    font-400 text-[14px] leading-[18px] text-[#6E7883]">{dateFormatter(transaction.dateCreated)}</td>
                                                <td className="font-pushpennyBook  truncate   font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.tranRef}</td>
                                                <td className="font-pushpennyBook truncate w-[124px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.type}</td>
                                                <td className="font-pushpennyBook   truncate   font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.agent.userName}</td>
                                                <td className="font-pushpennyBook   truncate font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.serviceName}</td>
                                                <td className="font-pushpennyBook truncate font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.externalServiceReference || "n/a"}</td>
                                                <td className="font-pushpennyBook    font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.amount}</td>
                                                <td className="font-pushpennyBook    font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.charge}</td>
                                                <td className="font-pushpennyBook    font-[600]  truncate text-[11px] leading-[14px] text-[#6E7883]">{transaction.status}</td>
                                                <td className="font-pushpennyBook  ">
                                                    <div className="w-[88px] h-[36px]">
                                                        <UserButton type="view" text="View" onClick={() => { router.push(`/dashboard/agency/transactions/${transaction.id}`) }} />
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
                <section></section>
            </section>
        </div>
    )
}

Transactions.Layout = MetricLayoutTemplate