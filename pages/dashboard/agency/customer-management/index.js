
import MetricLayoutTemplate from "../../../../components/MetricLayoutTemplate";
// import ImageHolder from "../../../../components/ImageHolder";
import UserButton from "../../../../components/ButtonMaker";
import { useEffect, useState } from "react";
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import { ngrok, testEnv } from "../../../../components/Endpoints";
import Textfield from "../../../../components/TextField";

export default function Customers({ modals, setToken, setActiveDashboard, setActiveState, viewState, setView }) {
    const router = useRouter()
    const [customerView, setCustomerView] = useState(true)
    const [customerData, setCustomerData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/customer/all?pageNo=0&pageSize=10`, fetching)

    useEffect(() => {
        setToken()
        setView(false)
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



    return (
        <div className="w-full">
            <section className={`py-2 w-full mt-[20px] ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <section className={`h-[674px] w-full hidden overflow-x-auto rounded-[10px] border border-[#777777] pt-4 pl-[5px]`}>
                    <div className="w-[1135px] h-fit">

                        <table className="table-fixed px-[5px] w-full flex flex-col">
                            <thead>
                                <tr className="flex justify-between">
                                    <th className="font-400   flex w-[120px] text-[12px] leading-[15.62px] font-pushpennyBook">FIRSTNAME</th>
                                    <th className="font-400   flex w-[120px]  text-[12px] leading-[15.62px] font-pushpennyBook">LASTNAME</th>
                                    <th className="font-400  flex w-[120px] text-[12px] leading-[15.62px] font-pushpennyBook">EMAIL ADDRESS</th>
                                    <th className="font-400  flex w-[120px] text-[12px] leading-[15.62px] font-pushpennyBook">PHONE NUMBER</th>
                                    <th className="font-400  flex w-[75px] text-[12px] leading-[15.62px] font-pushpennyBook">CREATED ON</th>
                                    <th className="font-400  flex w-[173px] text-[12px] leading-[15.62px] font-pushpennyBook">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6 ">
                                {customerData?.data.map((customer, index) => {
                                    return (
                                        <tr key={index} className="flex justify-between items-center h-[50px] border-b border-[#979797]">
                                            <td className="font-pushpennyBook flex w-[120px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{customer.firstName}</td>
                                            <td className="font-pushpennyBook flex w-[120px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{customer.lastName}</td>
                                            <td className="font-pushpennyBook flex w-[120px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{customer.email}</td>
                                            <td className="font-pushpennyBook flex w-[120px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{customer.phoneNumber}</td>

                                            <td className="font-pushpennyBook flex w-[75px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">{dateFormatter(customer.dateCreated)}</td>
                                            <td className="font-pushpennyBook gap-[5px] flex w-[175px]  flex items-start">
                                                <div className="w-[80px] h-[36px]">
                                                    <UserButton type="edit" onClick={() => { setView(true) }} />
                                                </div>
                                                <div className="w-[88px] h-[36px]">
                                                    <UserButton type="view" text="View" onClick={() => { router.push(`/dashboard/agency/customer-management/${customer.id}`) }} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
                <section className="flex flex-col gap-[10px]">
                    <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                        <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">Edit Agent Details</h2>
                    </div>
                    <form className=" flex flex-col lg:flex-row w-full gap-[20px] lg:gap-[9%] overflow-x-auto bg-[#FBF4EB] py-4 rounded-[10px]">
                        <section className="w-full lg:w-[45%] flex flex-col gap-[20px]">
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield title="Customer ID" bg="bg-[white]" />
                            </div>
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield title="First Name" bg="bg-[white]" />
                            </div>
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield title="Last Name" bg="bg-[white]" />
                            </div>
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield title="Email address" bg="bg-[white]" />
                            </div>
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield title="Date of Birth" bg="bg-[white]" />
                            </div>
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield title="Phone Number" bg="bg-[white]" />
                            </div>
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield title="Address" bg="bg-[white]" />
                            </div>
                            <div className="w-full h-[57px] rounded-[28px]">
                                <Textfield title="City" bg="bg-[white]" />
                            </div>
                        </section>
                        <section className="w-full lg:w-[45%] flex flex-col gap-[20px] lg:justify-between">
                            <section className="flex gap-[15px] flex-col">
                                <div className="w-full h-[57px] rounded-[28px]">
                                    <Textfield title="State" bg="bg-[white]" />
                                </div>
                                <div className="w-full h-[57px] rounded-[28px]">
                                    <Textfield title="Local Government Area" bg="bg-[white]" />
                                </div>
                                <div className="w-full h-[57px] rounded-[28px]">
                                    <Textfield title="BVN" bg="bg-[white]" />
                                </div>
                            </section>
                            <div className="w-full flex flex-col gap-[20px] lg:gap-0 md:flex-row md:justify-around h-fit rounded-[28px]">
                                <div className="w-full md:w-[164px] h-[46px] rounded-inherit">
                                    <UserButton type="" text="Cancel" bg="bg-[#DDDDDD]" />
                                </div>
                                <div className="w-full md:w-[164px] h-[46px] rounded-inherit">
                                    <UserButton type="gradient" text="Save" />
                                </div>
                            </div>
                        </section>
                    </form>
                </section>
            </section>
        </div>
    )
}

Customers.Layout = MetricLayoutTemplate