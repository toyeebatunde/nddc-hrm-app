
import SubLayoutTemplate from "../../../../components/ConfigLayoutTemplate"
import ApprovalsLayoutTemplate from "../../../../components/ApprovalsLayoutTemplate"
import ImageHolder from "../../../../components/ImageHolder"
import { useEffect, useState } from "react"
import nookies from 'nookies'
import axios from "axios"
import useSWR, { mutate } from 'swr'
import { testEnv } from "../../../../components/Endpoints"
import UserButton from "../../../../components/ButtonMaker"
import TableContainer from "../../../../components/TableContainer"
export default function Products({ modals, setActiveState, setActiveDashboard, setActiveTab, setToken, setModalState, getModalButtonRef, editFormState, setLoading, entryValue, pageSelector }) {
    const [settingsData, setSettingsData] = useState()
    const [reload, setReload] = useState(true)
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/vas/buy_now_pay_later?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    // const router = useRouter()

    useEffect(() => {
        setActiveTab("VAS Products")
        setToken()
        setActiveDashboard("ValueAddedServices")
        setActiveState("2")
        if (!settingsData) {
            setLoading(true)
        }
        if (data) {
            setLoading(false)
            setSettingsData(data)
        }
        if (error) {
            console.log(error)
        }
    }, [data])

    useEffect(() => {
        mutate(`${testEnv}v1/setting/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`)
    }, [reload])

    function triggerReload() {
        setReload(!reload)
    }

    function settingEdit(modalState, modal, fields, id) {
        setModalState(modalState, modal)
        editFormState(fields, id)
    }

    function settingAction(e, action, edit, create, endpoint, body, token, closer, loader, modal, trigger) {
        if (action == "edit") {
            edit(e, endpoint, body, token, closer, loader, modal, trigger)
            return
        }
        create(e, endpoint, body, token, closer, loader, modal, trigger)
        // console.log("works")
    }

    return (
        <div className="">

            <section className={`py-2 w-full mt-[20px] px-4 ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <section className="min-h-[674px] w-full pt-4 pl-2 pr-4">
                    <TableContainer pageSelector={pageSelector} color="bg-[white]" entryValue={entryValue}>

                        <table className="table-fixed px-[5px] w-full">
                            <thead>
                                <tr className="">
                                    <th className="font-400   w-[121px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">NAME</th>
                                    <th className="font-400   w-[70px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">CODE</th>
                                    <th className="font-400   w-[120px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">AMOUNT</th>
                                    <th className="font-400   w-[90px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">CATEGORY</th>
                                    <th className="font-400   w-[190px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6 ">
                            {/* {authData?.data.map((item, index) => {
                                    return (
                                        <tr key={index} className=" h-[50px]">
                                            <td className="font-pushpennyBook    font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.code}</td>
                                            <td className="font-pushpennyBook    font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.description}</td>
                                            <td className="font-pushpennyBook    font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.codeCategory?.name || "n/a"}</td>
                                            <td className="font-pushpennyBook  flex  justify-start">
                                                <div className={`${item.approvalStatus == "PENDING" ? "hidden" : ""} w-[107px] h-[36px]`}>
                                                    <UserButton type="edit" onClick={(e) => { changeView(e, "edit", item.id) }} />
                                                </div>
                                                <div className={`${item.approvalStatus == "PENDING" ? "hidden" : ""} w-[130px] h-[36px]`}>
                                                    <UserButton type="delete" onClick={() => { authEdit(true, "action", { caution: deleteCaution, action: "delete", endPoint: `https://admapis-staging.payrail.co/v1/code/${item.id}/delete`, text: "Delete", onClick: patchApi, trigger: triggerReload, reason: true, reasontext: "" }, item.id) }} />
                                                </div>
                                                <div className={`w-[237px] border flex items-center justify-center h-[36px] font-[400] font-pushPenny bg-[black] text-[white] rounded-[24px] text-[18px] ${item.approvalStatus == "PENDING" ? "" : "hidden"}`}>Approval Pending</div>
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


Products.Layout = ApprovalsLayoutTemplate 



