
import MetricLayoutTemplate from "../../../../components/MetricLayoutTemplate";
// import ImageHolder from "../../../../components/ImageHolder";
import UserButton from "../../../../components/ButtonMaker";
import { useEffect, useState } from "react";
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import { ngrok, testEnv } from "../../../../components/Endpoints";

export default function Transactions({ modals, setToken, setActiveDashboard, setActiveState, setLoading, activeTab, setActiveTab }) {

    const [transactionsData, setTransactionsData] = useState()
    const [transactionToView, setTransactionToView] = useState()
    const [viewState, setViewState] = useState(true)
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/transaction/deposit/all?pageNo=0&pageSize=10`, fetching)
    const router = useRouter()

    useEffect(() => {
        setActiveTab("All Transactions")
        setLoading(true)
        setToken()
        setActiveDashboard("Transactions")
        setActiveState("2")
        if (data) {
            setLoading(false)
            setTransactionsData(data.data)
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
                <section className={`h-[674px] w-full overflow-x-auto rounded-[10px] bg-brand-light-yellow pt-4 pl-[5px]`}>
                    <div className="w-[1135px] h-fit">

                        <table className="table-fixed w-full flex flex-col">
                            <thead>
                                <tr className="flex justify-between">
                                    <th className="font-400  flex w-[75px]  text-[12px] leading-[15.62px] font-pushpennyBook">DATE</th>
                                    <th className="font-400  flex w-[148px] text-[12px] leading-[15.62px] font-pushpennyBook">REFERENCE</th>
                                    <th className="font-400  flex w-[124px] text-[12px] leading-[15.62px] font-pushpennyBook">TRANSACTION TYPE</th>
                                    <th className="font-400  flex w-[106px] text-[12px] leading-[15.62px] font-pushpennyBook">AGENT</th>
                                    <th className="font-400  flex w-[91px] break-words text-[12px] leading-[15.62px] font-pushpennyBook">SERVICE</th>
                                    <th className="font-400  flex w-[165px] text-[12px] leading-[15.62px] font-pushpennyBook">SERVICE REFERENCE</th>
                                    <th className="font-400  flex w-[90px] text-[12px] leading-[15.62px] font-pushpennyBook">AMOUNT</th>
                                    <th className="font-400  flex w-[50px] text-[12px] leading-[15.62px] font-pushpennyBook">CHARGE</th>
                                    <th className="font-400  flex w-[69px] text-[12px] leading-[15.62px] font-pushpennyBook">STATUS</th>
                                    <th className="font-400  flex w-[88px] text-[12px] leading-[15.62px] font-pushpennyBook">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6 ">
                                {transactionsData?.map((transaction, index) => {
                                    return (
                                        <tr key={index} className="flex justify-between h-[60px]">
                                            <td className="font-pushpennyBook flex w-[75px]  font-400 text-[14px] leading-[18px] text-[#6E7883]">{dateFormatter(transaction.dateCreated)}</td>
                                            <td className="font-pushpennyBook w-[148px] truncate inline-block  font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.tranRef}</td>
                                            <td className="font-pushpennyBook truncate inline-block w-[124px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.type}</td>                                            
                                            <td className="font-pushpennyBook flex w-[106px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.agent.phoneNumber}</td>
                                            <td className="font-pushpennyBook flex w-[91px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.serviceNAme}</td>                                            
                                            <td className="font-pushpennyBook truncate inline-block w-[165px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.externalServiceReference || "n/a"}</td>
                                            <td className="font-pushpennyBook flex w-[90px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.amount}</td>                                            
                                            <td className="font-pushpennyBook flex w-[50px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{transaction.charge}</td>                                            
                                            <td className="font-pushpennyBook flex w-[69px]  font-[600] text-[11px] leading-[14px] text-[#6E7883]">{transaction.status}</td>                                            
                                            <td className="font-pushpennyBook flex w-[88px]  flex items-start">                                            
                                                <div className="w-[88px] h-[36px]">
                                                    <UserButton type="view" text="View" onClick={()=>{ router.push(`/dashboard/agency/transactions/${transaction.id}`)}} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
                <section></section>
            </section>
        </div>
    )
}

Transactions.Layout = MetricLayoutTemplate