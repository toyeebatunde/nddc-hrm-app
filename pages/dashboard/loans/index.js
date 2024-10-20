
import MetricLayoutTemplate from "../../../components/MetricLayoutTemplate";
// import ImageHolder from "../../../../components/ImageHolder";
import UserButton from "../../../components/ButtonMaker";
import { useEffect, useState } from "react";
import useSWR, { mutate } from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import { ngrok, testEnv } from "../../../components/Endpoints";
import TableContainer from "../../../components/TableContainer";

export default function Transactions({ modals, setToken, setActiveDashboard, setActiveState, setLoading, activeTab, setActiveTab, entryValue, pageSelector, search, setSearch, formatDate, dateRange, searchField, resetSearchParams, day, resetDay, rangeParam }) {

    const [transactionsData, setTransactionsData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [transactionToView, setTransactionToView] = useState()
    const [viewState, setViewState] = useState(true)
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data: allTransactions, error: allTransactionsError } = useSWR(`${testEnv}v1/transaction/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching) // https://admapis-staging.payrail.co/v1/transaction/all?pageNo=0&pageSize=10
    const { data: dateFiltered, error: filteredError } = useSWR(`${testEnv}v1/transaction/filter_by_dates?from=${formatDate(dateRange.dateFrom)}&pageNo=${entryValue.page}&pageSize=${entryValue.size}&to=${formatDate(dateRange.dateTo)}`, fetching)
    const { data: dayFiltered, error: dayFilteredError } = useSWR(`${testEnv}v1/transaction/filter_by_days?days=${day}&pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const { data: searchBarData, error: searchBarDataError } = useSWR(`${testEnv}v1/transaction/search/all?pattern=${searchField}&pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const router = useRouter()

    useEffect(() => {
        resetSearchParams()
        resetDay()
    }, [])

    useEffect(() => {
        setActiveTab("All Loans")
        setLoading(true)
        setToken()
        setActiveDashboard("Loans")
        setActiveState("5")

        const timeout = setTimeout(() => {
            if (!allTransactions) {
                setLoading(false);
                window.alert("Something went wrong, loading is taking longer than usual. Please refresh page")
            }
        }, 10000); // 5 seconds

        if (allTransactions) {
            setLoading(false)
            setTransactionsData(allTransactions.data.Transactions)
        }
        if (allTransactionsError) {
            console.log(" connection error")
        }
        return () => clearTimeout(timeout);
    }, [allTransactions])

    useEffect(() => {
        let newSearch
        axios.get(`${testEnv}v1/transaction/filter_by_days?days=${day}&pageNo=${entryValue.page}&pageSize=${entryValue.size}`,
            { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
            .then(res => {
                // debugger
                // setSearchedField(res.data)
                newSearch = res.data
                console.log(newSearch)
                if (rangeParam == "date") {
                    setFilteredData(res.data)
                }
            }
            )

        if (dayFilteredError) {
            console.log(dayFilteredError)
        }
    }, [day, entryValue])



    useEffect(() => {
        mutate(`${testEnv}v1/transaction/filter_by_dates?from=${formatDate(dateRange.dateFrom)}&pageNo=${entryValue.page}&pageSize=${entryValue.size}&to=${formatDate(dateRange.dateTo)}`)
        if (dateFiltered && (rangeParam == "")) {
            setFilteredData(dateFiltered)
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

    function setActiveTransaction(ref) {
        const currentTransaction = transactionsData.find(transaction => transaction.reference == ref)
        const currentTransactionFilter = filteredData.find(transaction => transaction.reference == ref)
        const currentTransactionSearchBar = searchBarData?.data?.find(transaction => transaction.reference == ref)
        // debugger
        localStorage.setItem("currentTransaction", JSON.stringify(currentTransaction || currentTransactionFilter || currentTransactionSearchBar))
        router.push(`/dashboard/agency/transactions/${ref}`)
    }



    return (
        <div className="w-full">
            <section className={`py-2 w-full mt-[20px] ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <section className={`min-h-[674px] w-full  pt-4 pl-[5px]`}>
                    <TableContainer entryValue={entryValue} pageSelector={pageSelector}>

                        <table className="table-fixed w-full">
                            <thead>
                                <tr className="">
                                    <th className=" font-400 text-left borde bg-[#ffffff]  w-[80px]  text-[12px] leading-[15.62px] rounded-tl-md pl-[5px] font-pushpennyBook">REQUESTED</th>
                                    <th className="font-400 text-left bg-[#ffffff] w-[70px] text-[12px] leading-[15.62px] font-pushpennyBook">APPROVED</th>
                                    <th className="font-400 text-left bg-[#ffffff] w-[70px] text-[12px] leading-[15.62px] font-pushpennyBook rounded-tr-md borde">DUE</th>
                                    <th className="font-400 text-left  w-[106px] text-[12px] leading-[15.62px] font-pushpennyBook borde">
                                        <div className="ml-[10px] borde bg-[#ffffff] pl-[10px] rounded-tl-md">NAME</div>
                                    </th>
                                    <th className="font-400 text-left bg-[#ffffff] w-[207px] break-words text-[12px] leading-[15.62px] font-pushpennyBook rounded-tr-md">AGENT ID</th>
                                    <th className="font-400 text-left w-[125px] text-[12px] leading-[15.62px] font-pushpennyBook">
                                        <div className="ml-[10px] borde bg-[#ffffff] pl-[10px] rounded-tl-md">COLLECTED</div>
                                    </th>
                                    <th className="font-400 text-left bg-[#ffffff] w-[125px] text-[12px] leading-[15.62px] font-pushpennyBook">PAID</th>
                                    <th className="font-400 text-left bg-[#ffffff] w-[125px] text-[12px] leading-[15.62px] font-pushpennyBook rounded-tr-md">PENDING</th>
                                    <th className="font-400 text-left  w-[60px]  text-[12px] leading-[15.62px] borde pl-[5px] font-pushpennyBook">STATUS</th>
                                    <th className="font-400 text-left  w-[88px] text-[12px] leading-[15.62px] font-pushpennyBook">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="mt-[30px] ">
                                <tr>
                                    {/* <th colSpan="1" className=""></th> */}
                                    <th colSpan="3" className="">DATE</th>
                                    <th colSpan="2" className="">AGENT</th>
                                    <th colSpan="3" className="">AMOUNT</th>
                                    {/* <th className="w-[161px] "></th> */}
                                </tr>
                                {searchField == "" ?
                                    (search ? filteredData : transactionsData)?.map((transaction, index) => {
                                        return (
                                            <tr key={index} className="h-[60px]">
                                                <td className="font-pushpennyBook   font-400 text-[14px] leading-[18px] text-[#6E7883]">{dateFormatter(transaction.date)}</td>
                                                <td className="font-pushpennyBook  truncate   font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.reference}</td>
                                                <td className="font-pushpennyBook truncate w-[124px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.transType || "n/a"}</td>
                                                <td className="font-pushpennyBook   truncate   font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.customerInfo?.name || "n/a"}</td>
                                                <td className="font-pushpennyBook   truncate font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.serviceInfo.serviceName || "n/a"}</td>
                                                <td className="font-pushpennyBook truncate font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.serviceReference || "n/a"}</td>
                                                <td className="font-pushpennyBook    font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.amount}</td>
                                                <td className="font-pushpennyBook    font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.charge || "n/a"}</td>
                                                <td className="font-pushpennyBook    font-[600]  truncate text-[11px] leading-[14px] text-[#6E7883]">{transaction.status}</td>
                                                <td className="font-pushpennyBook  ">
                                                    <div className="w-[88px] h-[36px]">
                                                        <UserButton type="view" text="View" onClick={() => { setActiveTransaction(transaction.reference) }} />
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
                                                        <UserButton type="view" text="View" onClick={() => { router.push(`/dashboard/agency/transactions/${transaction.reference}`) }} />
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