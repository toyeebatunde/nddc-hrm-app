

import UserButton from "../../../../../components/ButtonMaker"
import ImageHolder from "../../../../../components/ImageHolder"
import { useState, useEffect } from "react"
import Toggler from "../../../../../components/Toggle"
import axios from "axios"
import useSWR from 'swr'
import { useRouter } from "next/router"
import { testEnv } from "../../../../../components/Endpoints"

export default function Customer({ modals, setModalState, setToken, setActiveDashboard, setActiveState }) {
    const router = useRouter()
    const [tranDetails, setTranDetails] = useState(false)

    const [customerData, setCustomerData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/customer/${router.query.id}`, fetching)

    useEffect(() => {
        console.log(router.query)
        setToken()
        setActiveDashboard("Agent Management")
        setActiveState("2")
        if (data) {
            setCustomerData(data)
        }
        if (error) {
            console.log(error)
        }
    }, [data])



    const dateFormatter = (stamp) => {
        const date = new Date(stamp)
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes()
    }




    const dataFormat = (data) => {
        const value = data.toString()
        if (value.includes(".00")) {
            return `₦${value}`
        }
        return `₦${value}.00`
    }



    function setTab(tab) {
        setActiveTab(tab)
    }


    return (
        <div className={`flex relative flex-col items-start pt-[60px] overflow-hidden w-full`}>
            <section className={`w-full flex px-4 justify-between ${modals.isOpen ? "blur-sm" : "blur-none"} `}>
                <h4 className="font-pushpennyMedium text-[36px] leading-[47px]">
                    Agency
                </h4>
            </section>
            <h2 className="mt-[40px] ml-4 font-pushpennyBook">Customer Management</h2>
            <div className="w-full px-[18px] gap-[10px] flex flex-col">
                <section className="flex flex-col gap-[10px] md:flex-row w-full">
                    <div className="w-[330px] md:w-[400px] min-h-[513px] gap-[10px] flex flex-col">
                        <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                            <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">Customer Information</h2>
                        </div>
                        <div className=" flex grow flex-col bg-[#FBF4EB] px-4 py-4 rounded-[10px]">
                            <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Customer ID</h2>
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{customerData?.customer.id || "n/a"}</h2>
                            </div>

                            <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">First Name</h2>
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{customerData?.customer.firstName || "n/a"}</h2>
                            </div>
                            <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Middle Name</h2>
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{customerData?.customer.middleName || "n/a"}</h2>
                            </div>
                            <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Last Name</h2>
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{customerData?.customer.lastName || "n/a"}</h2>
                            </div>
                            <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Email</h2>
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{customerData?.customer.email || "n/a"}</h2>
                            </div>
                            <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Phone</h2>
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{customerData?.customer.phoneNumber || "n/a"}</h2>
                            </div>
                            <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Date of birth</h2>
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{customerData?.customer.dob || "n/a"}</h2>
                            </div>
                            <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Address</h2>
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{customerData?.customer.address || "n/a"}</h2>
                            </div>
                            <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">City</h2>
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{customerData?.customer.city || "n/a"}</h2>
                            </div>
                            <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">LGA</h2>
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{customerData?.customer.lga || "n/a"}</h2>
                            </div>
                            <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">State</h2>
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{customerData?.customer.state || "n/a"}</h2>
                            </div>
                            <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Country</h2>
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{customerData?.customer.country || "n/a"}</h2>
                            </div>
                            <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">BVN</h2>
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{customerData?.customer.bvn || "n/a"}</h2>
                            </div>
                            <div className="flex h-[24px] border-b-[1px] mt-2 justify-between border-white items-start">
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">Created on</h2>
                                <h2 className="font-pushpennyBook text-[#6E7883] text-[14px] font-[400]">{dateFormatter(customerData?.customer.dateCreated) || "n/a"}</h2>
                            </div>
                            <div className="w-[95%] md:w-full flex self-center h-[36px]">
                                <UserButton type="edit" text="Edit account details" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col overflow-x-auto md:grow w-full gap-[10px]">
                        <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                            <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">Customer accounts</h2>
                        </div>
                        <div className=" flex w-full overflow-x-auto bg-[#FBF4EB] py-4 rounded-[10px]">
                            <div className="w-[850px] xl:w-full h-fit">
                                <table className="table-fixed w-full flex flex-col">
                                    <thead>
                                        <tr className="flex w-full px-[5px] gap-[25px]">
                                            <th className="font-400 flex w-[100px]  text-[12px] leading-[15.62px] font-pushpennyBook">ACCOUNT TYPE</th>
                                            <th className="font-400 flex w-[120px] text-[12px] leading-[15.62px] font-pushpennyBook">ACCOUNT NUMBER</th>
                                            <th className="font-400  flex w-[180px] text-[12px] leading-[15.62px] font-pushpennyBook">ACCOUNT NAME</th>
                                            <th className="font-400  flex w-[115px] text-[12px] leading-[15.62px] font-pushpennyBook">BANK NAME</th>
                                            <th className="font-400  flex w-[50px] text-[12px] leading-[15.62px] font-pushpennyBook">CURRENCY</th>
                                            <th className="font-400  flex w-[110px] text-[12px] leading-[15.62px] font-pushpennyBook">BALANCE</th>
                                        </tr>
                                    </thead>

                                    <tbody className="mt-6">
                                        {customerData?.customerAccountList.map((account, index) => {
                                            return (
                                                <tr key={index} className="flex px-[5px] items-center border-b border-[#979797] gap-[25px] h-[60px]">
                                                    <td className="font-pushpennyBook  flex w-[100px] font-400 text-[18px] leading-[14px] text-[#6E7883]">{account.type}</td>
                                                    <td className="font-pushpennyBook  flex w-[120px] font-400 text-[18px] leading-[14px] text-[#6E7883]">{account.number}</td>
                                                    <td className="font-pushpennyBook  truncate inline-block w-[180px] font-400 text-[18px] leading-[14px] text-[#6E7883]">{account.externalAccountName}</td>
                                                    <td className="font-pushpennyBook   flex w-[115px] font-400 text-[18px] leading-[14px] text-[#6E7883]">{account.externalBankName}</td>
                                                    <td className="font-pushpennyBook  flex w-[50px] font-400 text-[18px] leading-[14px] text-[#6E7883]">{account.currency.name}</td>
                                                    <td className="font-pushpennyBook  flex w-[110px] gap-[20px]">{account.balance}</td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full">
                    <div className="flex flex-col overflow-x-auto md:grow w-full gap-[10px]">
                        <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                            <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">Customer account history</h2>
                        </div>
                        <div className=" flex w-full overflow-x-auto bg-[#FBF4EB] py-4 rounded-[10px]">
                            <div className="min-w-[880px] xl:w-full h-fit">
                                <table className="table-fixed w-full flex flex-col">
                                    <thead>
                                        <tr className="flex w-full px-[5px] gap-[10px]">
                                            <th className="font-400 flex w-[190px]  text-[12px] leading-[15.62px] font-pushpennyBook">DATE</th>
                                            <th className="font-400 flex w-[148px]  text-[12px] leading-[15.62px] font-pushpennyBook">REFERENCE</th>
                                            <th className="font-400  flex w-[82px]  text-[12px] leading-[15.62px] font-pushpennyBook">TRAN TYPE</th>
                                            <th className="font-400  flex w-[140px] text-[12px] leading-[15.62px] font-pushpennyBook">DESCRIPTION</th>
                                            <th className="font-400  flex w-[105px] text-[12px] leading-[15.62px] font-pushpennyBook">CHANNEL</th>
                                            <th className="font-400  flex w-[110px] text-[12px] leading-[15.62px] font-pushpennyBook">AMOUNT</th>
                                            <th className="font-400  flex w-[110px] text-[12px] leading-[15.62px] font-pushpennyBook">OLD BALANCE</th>
                                            <th className="font-400  flex w-[110px] text-[12px] leading-[15.62px] font-pushpennyBook">NEW BALANCE</th>
                                            <th className="font-400  flex w-[80px] text-[12px] leading-[15.62px] font-pushpennyBook">STATUS</th>
                                        </tr>
                                    </thead>

                                    <tbody className="mt-6">
                                        {customerData?.customerAccountTransactions.map((trans, index) => {
                                            return (
                                                <tr key={index} className="flex px-[5px] items-center w-full border-b border-[#979797] gap-[10px] h-[60px]">
                                                    <td className="w-[190px]  font-pushpennyBook text-[16px] font-[400] leading-[23px] text-[#6E7883] ">
                                                        {trans.dateCreated == null ? "n/a" : dateFormatter(trans.dateCreated)}
                                                    </td>
                                                    <td className="font-400 flex w-[148px]  text-[12px] leading-[15.62px] font-pushpennyBook">{trans.externalReference}</td>
                                                    <td className="font-400  flex w-[82px]  text-[12px] leading-[15.62px] font-pushpennyBook">{trans.tranType}</td>
                                                    <td className="font-400  flex w-[140px] text-[12px] leading-[15.62px] font-pushpennyBook">{trans.purpose}</td>
                                                    <td className="font-400  flex w-[105px] text-[12px] leading-[15.62px] font-pushpennyBook">{trans.channel}</td>
                                                    <td className="font-400  flex w-[110px] text-[12px] leading-[15.62px] font-pushpennyBook">{dataFormat(trans.amount) || "₦0.00"}</td>
                                                    <td className="font-400  flex w-[110px] text-[12px] leading-[15.62px] font-pushpennyBook">{dataFormat(trans.oldBalance) || "₦0.00"}</td>
                                                    <td className="font-400  flex w-[110px] text-[12px] leading-[15.62px] font-pushpennyBook">{dataFormat(trans.newBalance) || "₦0.00"}</td>
                                                    <td className="font-400  flex w-[80px] text-[12px] leading-[15.62px] font-pushpennyBook">{trans.tranStatus}</td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    )
}