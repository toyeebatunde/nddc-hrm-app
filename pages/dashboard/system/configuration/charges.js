
import SubLayoutTemplate from "../../../../components/ConfigLayoutTemplate"
import ImageHolder from "../../../../components/ImageHolder"
import { useEffect } from "react"
import nookies from 'nookies'
import UserButton from "../../../../components/ButtonMaker"

export default function Settings({ charges, modals, setToken, setActiveDashboard, setActiveState, activeTab, setModalState, getModalButtonRef }) {

    useEffect(() => {
        setToken()
        setActiveDashboard("Configurations")
        setActiveState("1")
    }, [])


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
                <section className="h-[674px] w-full overflow-x-auto rounded-[10px] bg-brand-light-yellow pt-4 pl-2 pr-4">
                    <div className="w-[1115px] h-fit">

                        <table className="table-fixed w-full flex flex-col">
                            <thead>
                                <tr className="flex justify-around">
                                    <th className="font-400   flex w-[145px]  text-[12px] leading-[15.62px] font-pushpennyBook">TRANSACTION TYPE</th>
                                    <th className="font-400    flex w-[31px] text-[12px] leading-[15.62px] font-pushpennyBook">TYPE</th>
                                    <th className="font-400   flex w-[110px] text-[12px] leading-[15.62px] font-pushpennyBook">LOWER BOUND</th>
                                    <th className="font-400  flex w-[110px] text-[12px] leading-[15.62px] font-pushpennyBook">UPPER BOUND</th>
                                    <th className="font-400  flex w-[70px] text-[12px] leading-[15.62px] font-pushpennyBook">AMOUNT</th>
                                    <th className="font-400  flex w-[373px] text-[12px] leading-[15.62px] font-pushpennyBook">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6">
                                {charges.data.map((item, index) => {
                                    return (
                                        <tr key={index} className="flex justify-around h-[50px]">
                                            <td className="font-pushpennyBook  flex w-[145px] font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.transactionType}</td>
                                            <td className="font-pushpennyBook  flex w-[31px] font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.chargeType}</td>
                                            <td className="font-pushpennyBook  flex w-[110px] font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.lowerBound}</td>
                                            <td className="font-pushpennyBook  flex w-[110px] font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.upperBound}</td>
                                            <td className="font-pushpennyBook  flex w-[70px] font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.value == null ? "N/A" : item.value}</td>
                                            <td className="font-pushpennyBook  flex w-[373px] justify-between">
                                                <div className="w-[115px] h-[36px]">
                                                    <UserButton type="view" text="View" />
                                                </div>
                                                <div className="w-[107px] h-[36px]">
                                                    <UserButton type="edit" />
                                                </div>
                                                <div className="w-[130px] h-[36px]">
                                                    <UserButton type="delete" />
                                                </div>
                                            </td>
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



Settings.Layout = SubLayoutTemplate

export const getServerSideProps = async (context) => {
    const cookies = nookies.get(context)
    const response = await fetch(`https://3695-41-138-165-100.eu.ngrok.io/v1/charge/all?pageNo=1&pageSize=5`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${cookies.token}`
            }
        }
    )
    const charges = await response.json()
    return {
        props: {
            charges
        }
    }
}