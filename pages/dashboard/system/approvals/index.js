

import { useState, useRef, useEffect } from "react"
import ApprovalsLayoutTemplate from "../../../../components/ApprovalsLayoutTemplate"
import axios from "axios"
import useSWR, {mutate} from 'swr'
import { testEnv } from "../../../../components/Endpoints"
import UserButton from "../../../../components/ButtonMaker"
import TableContainer from "../../../../components/TableContainer"
import { patchApi } from "../../../../components/Endpoints"

export default function Approval({ modals, setModalState, editFormState, setActiveDashboard, setActiveState, setToken, setLoading, entryValue, pageSelector, setActiveTab }) {
    const [createRole, setCreateRole] = useState(false)
    const [reload, setReload] = useState(true)
    const [approvalsData, setApprovalsData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/approval/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)




    useEffect(() => {
        setActiveTab("All")
        setToken()
        // setLoading(true)
        setActiveDashboard("Approvals")
        setActiveState("1")

        if (data) {
            // setLoading(false)
            setApprovalsData(data)

        }
    }, [data])

    useEffect(()=>{
        mutate(`${testEnv}v1/approval/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`)        
    }, [reload])

    function approvalHandler(modalState, modal, fields, id) {
        setModalState(modalState, modal)
        editFormState(fields, id)
    }

    function triggerReload() {
        setReload(!reload)
    }


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
                                                <div className={`w-[137px] h-[36px] ${approval.approvalStatus == "PENDING" ? "" : "hidden"}`}>
                                                    <UserButton type="decline"
                                                    onClick={() => { approvalHandler(true, "action", {caution: `You are about to decline a change from ${approval.initiatedBy} • ${approval.description}`, action: "decline", endPoint: `${testEnv}v1/approval/${approval.id}/accept?query=decline`, reason: false, onClick: patchApi, text: approval.approvalStatus == "PENDING" ? "Decline" : "Edit", trigger: triggerReload }, data.id) }}
                                                     />
                                                </div>
                                                <div className={`w-[137px] h-[36px] ${approval.approvalStatus == "PENDING" ? "" : "hidden"}`}>
                                                    <UserButton type="accept"
                                                    onClick={() => { approvalHandler(true, "action", { caution: `You are about to accept a change from ${approval.initiatedBy} • ${approval.description}`, action: "approve", endPoint: `${testEnv}v1/approval/${approval.id}/accept?query=accept`, reason: false, onClick: patchApi, text: approval.approvalStatus == "PENDING" ? "Accept" : "Delete", trigger: triggerReload }, data.id) }}
                                                     />
                                                </div>
                                                <div className={`w-[167px] flex items-center justify-center h-[36px] font-[400] font-pushPenny bg-[black] text-[white] rounded-[24px] text-[18px] ${approval.approvalStatus == "PENDING" ? "hidden" : ""}`}>{approval.approvalStatus == "DECLINE"? "DECLINED" : approval.approvalStatus}</div>
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