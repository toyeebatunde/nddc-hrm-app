
import MetricLayoutTemplate from "../../../../../../components/MetricLayoutTemplate";
// import ImageHolder from "../../../../components/ImageHolder";
import UserButton from "../../../../../../components/ButtonMaker";
import { useEffect, useState } from "react";
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import { testEnv } from "../../../../../../components/Endpoints";
import Textfield from "../../../../../../components/TextField";
import TableContainer from "../../../../../../components/TableContainer";

export default function Settlement({ modals, setToken, setActiveDashboard, setActiveState, viewState, setView, isLoading, setLoading, entryValue, pageSelector }) {
    const router = useRouter()
    const [settlementData, setSettlementData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/agent/${router.query.agent}/transaction_history?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)


    useEffect(() => {
        // setLoading(true)        
        setView(false)
        setActiveDashboard("AgentManagement")
        setActiveState("2")
        if (data) {
            setLoading(false)
            setSettlementData(data)
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
                <section className={`min-h-[674px] w-full flex pt-4 pl-[5px]`}>
                    <TableContainer entryValue={entryValue} pageSelector={pageSelector}>
                        <table className="table-fixed px-[5px] w-full">
                            <thead>
                                <tr className="">
                                    <th className="font-400 w-[75px] text-start  text-[12px] leading-[15.62px] font-pushpennyBook">DATE</th>
                                    <th className="font-400 w-[148px] text-start  text-[12px] leading-[15.62px] font-pushpennyBook">REFERENCE</th>
                                    <th className="font-400 w-[73px]  text-start text-[12px] leading-[15.62px] font-pushpennyBook">TRAN TYPE</th>
                                    <th className="font-400 w-[162px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">DESCRIPTION</th>
                                    <th className="font-400 w-[105px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">CHANNEL</th>
                                    <th className="font-400 w-[71px]  text-start text-[12px] leading-[15.62px] font-pushpennyBook">AMOUNT</th>
                                    <th className="font-400 w-[71px]  text-start text-[12px] leading-[15.62px] font-pushpennyBook">OLD BALANCE</th>
                                    <th className="font-400 w-[71px]  text-start text-[12px] leading-[15.62px] font-pushpennyBook">NEW BALANCE</th>
                                    <th className="font-400 w-[70px]  text-start text-[12px] leading-[15.62px] font-pushpennyBook">STATUS</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6 ">
                                {/* {customerData?.data.map((customer, index) => {
                                    return (
                                        <tr key={index} className="flex justify-between items-center h-[50px] border-b border-[#979797]">
                                            <td className="font-pushpennyBook flex w-[80px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{customer.firstName}</td>
                                            <td className="font-pushpennyBook flex w-[80px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{customer.lastName}</td>
                                            <td className="font-pushpennyBook flex w-[170px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{customer.email}</td>
                                            <td className="font-pushpennyBook flex w-[120px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{customer.phoneNumber}</td>

                                            <td className="font-pushpennyBook flex w-[75px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{dateFormatter(customer.dateCreated)}</td>
                                            <td className="font-pushpennyBook gap-[5px] flex w-[175px]  flex items-start">
                                                <div className="w-[80px] h-[36px]">
                                                    <UserButton type="edit" onClick={() => { editInfo(customer.id, customer.firstName, customer.lastName, customer.email, customer.dob, customer.phoneNumber, customer.address, customer.city, customer.state, customer.lga, customer.bvn, customer.middleName, customer.dateCreated, customer.gender) }} />
                                                </div>
                                                <div className="w-[88px] h-[36px]">
                                                    <UserButton type="view" text="View" onClick={() => { router.push(`/dashboard/agency/customer-management/${customer.id}`) }} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })} */}
                            </tbody>
                        </table>
                    </TableContainer>
                </section>
            </section>
        </div>
    )
}



Settlement.Layout = MetricLayoutTemplate