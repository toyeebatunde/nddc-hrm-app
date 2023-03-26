
import SubLayoutTemplate from "../../../../components/ConfigLayoutTemplate"
import ImageHolder from "../../../../components/ImageHolder"
import { useEffect, useState } from "react"
import nookies from 'nookies'
import axios from "axios"
import useSWR, { mutate } from 'swr'
import { testEnv } from "../../../../components/Endpoints"
import UserButton from "../../../../components/ButtonMaker"
import TableContainer from "../../../../components/TableContainer"
export default function Vas({ modals, setActiveState, setActiveDashboard, setActiveTab, setToken, setModalState, getModalButtonRef, editFormState, setLoading, entryValue, pageSelector }) {
    const [settingsData, setSettingsData] = useState()
    const [reload, setReload] = useState(true)
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/vas/buy_now_pay_later?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    // const router = useRouter()

    useEffect(() => {
        setActiveTab("Agency")
        setToken()
        setActiveDashboard("Value Added Services")
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
                                    <th className="font-400   w-[121px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">CUSTOMER NAME</th>
                                    <th className="font-400   w-[115px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">EXPECTED HARVEST</th>
                                    <th className="font-400   w-[120px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">VAS LIMIT</th>
                                    <th className="font-400   w-[173px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">DOWN PAYMENT PERCENTAGE</th>
                                    <th className="font-400   w-[50px]  text-start  text-[12px] leading-[15.62px] font-pushpennyBook">STATUS</th>
                                    <th className="font-400   w-[173px] text-start text-[12px] leading-[15.62px] font-pushpennyBook">ACTION</th>
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

Vas.Layout = SubLayoutTemplate


