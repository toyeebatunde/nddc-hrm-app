

import { useState, useRef, useEffect } from "react"
import ApprovalsLayoutTemplate from "../../../../components/ApprovalsLayoutTemplate"
import axios from "axios"
import useSWR from 'swr'
import { testEnv } from "../../../../components/Endpoints"
import UserButton from "../../../../components/ButtonMaker"
import TableContainer from "../../../../components/TableContainer"

export default function Approval({ modals, setModalState, setActiveDashboard, setActiveState, setToken, setLoading, entryValue, pageSelector }) {
    const [activeTab, setActiveTab] = useState("")
    const [createRole, setCreateRole] = useState(false)
    const [approvalsData, setApprovalsData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/approval/all?pageNo=1&pageSize=10`, fetching)




    useEffect(() => {
        setToken()
        // setLoading(true)
        setActiveDashboard("Approvals")
        setActiveState("1")

        if (data) {
            // setLoading(false)
            setApprovalsData(data)

        }
    }, [data])

    function setTab(tab) {
        setActiveTab(tab)
    }

    const getModalRef = useRef()
    const getModalButtonRef = useRef()


    return (
        <section className={`py-2 w-full mt-[20px] px-4 ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
            <section className="h-[674px] w-full  pt-4 pl-[]5px pr-[5px]">
                <TableContainer pageSelector={pageSelector} entryValue={entryValue}>
                        <table className="table-fixed pl-[10px] w-full flex flex-col">
                            <thead>
                                <tr className="flex w-full px-[5px] gap-[25px]">
                                    <th className="font-400  flex w-[68px]  text-[12px] leading-[15.62px] font-pushpennyBook">CODE</th>
                                    <th className="font-400  flex w-[140px] text-[12px] leading-[15.62px] font-pushpennyBook">OPERATION</th>
                                    <th className="font-400  flex w-[110px] text-[12px] leading-[15.62px] font-pushpennyBook">INITIATED BY</th>
                                    <th className="font-400  flex w-[110px] text-[12px] leading-[15.62px] font-pushpennyBook">AGENT/STAFF ID</th>
                                    <th className="font-400  flex w-[160px] text-[12px] leading-[15.62px] font-pushpennyBook">REASON FOR ACTION</th>
                                    <th className="font-400  flex w-[373px] text-[12px] leading-[15.62px] font-pushpennyBook">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6">
                                {approvalsData?.data.map((approval, index) => {
                                    return (
                                        <tr key={index} className="flex px-[5px] items-center border-b border-[#979797] gap-[25px] h-[60px]">
                                            <td className="font-pushpennyBook  flex w-[68px] font-400 text-[18px] leading-[14px] text-[#6E7883]">{approval.code}</td>
                                            <td className="font-pushpennyBook  flex w-[140px] font-400 text-[18px] leading-[14px] text-[#6E7883]">{approval.operation}</td>
                                            <td className="font-pushpennyBook  truncate inline-block max-w-[100px] font-400 text-[18px] leading-[14px] text-[#6E7883]">{approval.initiatedBy}</td>
                                            <td className="font-pushpennyBook  ml-[10px]  flex w-[110px] font-400 text-[18px] leading-[14px] text-[#6E7883]">{approval.identifier ? approval.identifier : "n/a"}</td>
                                            <td className="font-pushpennyBook  flex w-[160px] font-400 text-[18px] leading-[14px] text-[#6E7883]">{approval.description}</td>
                                            <td className="font-pushpennyBook  flex w-[373px] gap-[20px]">
                                                <div className="w-[137px] h-[36px]">
                                                    <UserButton type={approval.approvalStatus == "PENDING" ? "decline" : "edit"} onClick={() => { chargeEdit(true, "editCharges", { lowerBound: item.lowerBound, upperBound: item.upperBound, value: item.value, transactionType: item.transactionType, chargeType: item.chargeType }, item.id) }} />
                                                </div>
                                                <div className="w-[137px] h-[36px]">
                                                    <UserButton type={approval.approvalStatus == "PENDING" ? "accept" : "delete"} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    
                </TableContainer>
            </section>
        </section>
    )
}

Approval.Layout = ApprovalsLayoutTemplate