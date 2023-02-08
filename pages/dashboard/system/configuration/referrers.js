
import SubLayoutTemplate from "../../../../components/ConfigLayoutTemplate"
import ImageHolder from "../../../../components/ImageHolder"
import { useEffect, useState } from "react"
import nookies from 'nookies'
import UserButton from "../../../../components/ButtonMaker"
import Textfield from "../../../../components/TextField"

export default function Referrers({ referrers, modals, setToken, setActiveDashboard, setActiveState, activeTab, setModalState, getModalButtonRef, closeModals, editChargeState }) {
    const [chargeView, setChargeView] = useState({})
    const [view, setView] = useState(false)


    useEffect(() => {
        setToken()
        setActiveDashboard("Configurations")
        setActiveState("1")
    }, [])

    function referrerView(id) {
        if (view) {
            setView(false)
            return
        }
        setView(true)
        const currentView = charges.data.filter(charge => charge.id === id)
        setChargeView(currentView[0])
    }

    function chargeEdit(modalState, modal, fields, id) {
        setModalState(modalState, modal)
        editChargeState(fields, id)
    }


    return (
        <div className="">
            <section className={`px-[40px] mdxl:px-[10px] pt-2 pb-2 w-fit md:w-full mt-8 h-fit lg:h-[61px] ${view ? "hidden" : "flex"} flex-col mdxl:flex-row justify-between items-center rounded-[48px] bg-[#F3F3F3] md:pr-[60px]`}>
                <section className="w-[354px] h-[40px] bg-white rounded-[20px] px-2 relative flex items-center justify-between">
                    <input className="search-tab rounded-[20px] w-[80%]" placeholder="Search member" />
                    <div className="w-[28px] h-[28px] relative">
                        <ImageHolder src="/icons/search-icon.svg" />
                    </div>
                </section>
                <section className="flex w-[354px] mt-4 mdxl:mt-0 justify-between">
                    <button ref={getModalButtonRef} onClick={() => { setModalState(true, "teamModal") }} className="flex font-pushpennyMedium font-500 text-[18px] leading-[23.44px] grow lg:w-[216px] h-[35px] rounded-[20px] items-center justify-center bg-gradient-to-r text-[#ffffff] from-[#EF6B25] to-[#F6BC18]">
                        + Add new referrers
                    </button>
                </section>

            </section>
            <section className={`py-2 w-full mt-[20px] px-4 ${modals.isOpen ? "blur-sm" : "blur-none"} ${view ? "hidden" : "block"}`}>
                <section className="h-[674px] w-full overflow-x-auto rounded-[10px] bg-brand-light-yellow pt-4 pl-2 pr-4">
                    <div className=" w-[500px] lg:w-full h-fit border">

                        <table className="table-fixed w-full flex flex-col">
                            <thead>
                                <tr className="flex justify-between">
                                    <th className="font-400  flex w-[145px]  text-[12px] leading-[15.62px] font-pushpennyBook">REFERRERS NAME</th>
                                    <th className="font-400  flex border w-[150px] text-[12px] leading-[15.62px] font-pushpennyBook">AGENT TYPE</th>
                                    <th className="font-400  flex w-[373px] border text-[12px] leading-[15.62px] font-pushpennyBook">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6">
                                <tr className="flex justify-around h-[50px]">
                                    <td className="font-pushpennyBook  flex w-[145px] font-400 text-[18px] leading-[14px] text-[#6E7883]">item</td>
                                    <td className="font-pushpennyBook  flex w-[31px] font-400 text-[18px] leading-[14px] text-[#6E7883]">item</td>

                                    <td className="font-pushpennyBook  flex w-[373px] justify-between">
                                        {/* <div className="w-[115px] h-[36px]">
                                            <UserButton type="view" text="View" />
                                        </div>
                                        <div className="w-[107px] h-[36px]">
                                            <UserButton type="edit" />
                                        </div>
                                        <div className="w-[130px] h-[36px]">
                                            <UserButton type="delete" />
                                        </div> */}
                                    </td>
                                </tr>
                                {/* {charges.data.map((item, index) => {
                                    return (
                                        <tr key={index} className="flex justify-around h-[50px]">
                                            <td className="font-pushpennyBook  flex w-[145px] font-400 text-[18px] leading-[14px] text-[#6E7883]">item</td>
                                            <td className="font-pushpennyBook  flex w-[31px] font-400 text-[18px] leading-[14px] text-[#6E7883]">item</td>
                           
                                            <td className="font-pushpennyBook  flex w-[373px] justify-between">
                                                <div className="w-[115px] h-[36px]">
                                                    <UserButton type="view" text="View"  />
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
                                })} */}

                            </tbody>
                        </table>
                    </div>
                </section>
            </section>
        </div>
    )
}



Referrers.Layout = SubLayoutTemplate

export const getServerSideProps = async (context) => {
    const cookies = nookies.get(context)
    const response = await fetch(`http://admapis-staging.payrail.co/v1/referrer/all?pageNo=1&pageSize=5`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${cookies.token}`
            }
        }
    )
    const referrers = await response.json()
    return {
        props: {
            referrers
        }
    }
}