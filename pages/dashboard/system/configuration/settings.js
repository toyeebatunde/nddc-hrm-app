
import SubLayoutTemplate from "../../../../components/ConfigLayoutTemplate"
import ImageHolder from "../../../../components/ImageHolder"
import { useEffect, useState } from "react"
import nookies from 'nookies'
import axios from "axios"
import useSWR from 'swr'
import { testEnv } from "../../../../components/Endpoints"
import UserButton from "../../../../components/ButtonMaker"
import TableContainer from "../../../../components/TableContainer"
export default function Settings({ modals, setActiveState, setActiveDashboard, setActiveTab, setToken, setModalState, getModalButtonRef, editFormState, setLoading, entryValue, pageSelector }) {

    const [settingsData, setSettingsData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/setting/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    // const router = useRouter()

    useEffect(() => {
        setActiveTab("Settings")
        setToken()
        setActiveDashboard("Configurations")
        setActiveState("1")
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

    function settingEdit(modalState, modal, fields, id) {
        setModalState(modalState, modal)
        editFormState(fields, id)
    }

    return (
        <div className="">
            <section className={`px-[40px] mdxl:px-[10px] pt-2 pb-2 w-fit md:w-full mt-8 h-fit lg:h-[61px] flex flex-col mdxl:flex-row justify-between items-center rounded-[48px] bg-[#F3F3F3] md:pr-[60px]`}>
                <section className="w-[354px] h-[40px] bg-white rounded-[20px] px-2 relative flex items-center justify-between">
                    <input className="search-tab rounded-[20px] w-[80%]" placeholder="Search member" />
                    <div className="w-[28px] h-[28px] relative">
                        <ImageHolder src="/icons/search-icon.svg" />
                    </div>
                </section>
                <section className="flex w-[354px] mt-4 mdxl:mt-0 justify-between">
                    <button ref={getModalButtonRef} onClick={() => { setModalState(true, "teamModal") }} className="flex font-pushpennyMedium font-500 text-[18px] leading-[23.44px] grow lg:w-[216px] h-[35px] rounded-[20px] items-center justify-center bg-gradient-to-r text-[#ffffff] from-[#EF6B25] to-[#F6BC18]">+ Create new configuration</button>
                </section>

            </section>
            <section className={`py-2 w-full mt-[20px] px-4 ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <section className="min-h-[674px] w-full pt-4 pl-2 pr-4">
                    <TableContainer pageSelector={pageSelector} entryValue={entryValue}>
                            <table className="table-fixed w-full flex flex-col">
                                <thead>
                                    <tr className="flex justify-around">
                                        <th className="font-400  flex w-[40%]  text-[12px] leading-[15.62px] font-pushpennyBook">NAME</th>
                                        <th className="font-400   flex w-[20%] text-[12px] leading-[15.62px] font-pushpennyBook">DESCRIPTION</th>
                                        <th className="font-400   flex w-[20%] text-[12px] leading-[15.62px] font-pushpennyBook">STATUS</th>
                                        <th className="font-400  flex w-[20%] text-[12px] leading-[15.62px] font-pushpennyBook">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody className="mt-6">
                                    {settingsData?.data.map((item, index) => {
                                        return (
                                            <tr key={index} className="flex justify-around h-[50px]">
                                                <td className="font-pushpennyBook flex w-[40%] font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.name}</td>
                                                <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.description ? item.description : "n/a"}</td>
                                                <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.enabled ? "Active" : "Inactive"}</td>
                                                <td className="font-pushpennyBook flex w-[20%] flex items-start font-400 text-[18px] leading-[14px] text-[#6E7883]">
                                                    <div className="w-[107px] h-[36px]">
                                                        <UserButton type="edit" onClick={() => { settingEdit(true, "editSetting", { name: item.name, description: item.description, value: item.value, type: item.type }, item.id) }} />
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
        </div>
    )
}

Settings.Layout = SubLayoutTemplate


