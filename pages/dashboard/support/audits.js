
import MetricLayoutTemplate from "../../../components/MetricLayoutTemplate";
// import ImageHolder from "../../../../components/ImageHolder";
import UserButton from "../../../components/ButtonMaker";
import { useEffect, useState } from "react";
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from "next/router";
import { ngrok, testEnv, editApi } from "../../../components/Endpoints";
import Textfield from "../../../components/TextField";

export default function Audit({ modals, setToken, setActiveDashboard, setActiveState, viewState, setView, isLoading, setLoading, entryValue}) {

    const [auditData, setAuditData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/audit/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)


    useEffect(() => {
        setView(false)
        setActiveDashboard("Audits")
        setActiveState("4")
        if (data) {
            setLoading(false)
            setAuditData(data)
        }
        if (error) {
            console.log(error)
        }
    }, [data, entryValue])


    const dateFormatter = (stamp) => {
        const date = new Date(stamp)
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes()
    }





    return (
        <div className="w-full">

            <section className={`py-2 w-full mt-[20px] ${modals.isOpen ? "blur-sm" : "blur-none"}`}>

                <section className="h-[674px] mt-[20px] w-full overflow-x-auto rounded-[10px] bg-brand-light-yellow pt-4 pl-2 pr-4">
                    <div className="min-w-[1115px] h-fit">

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
                                {auditData?.data.map((data, index) => {
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
                                })}

                            </tbody>
                        </table>
                    </div>
                </section>
            </section>
        </div>
    )
}



Audit.Layout = MetricLayoutTemplate