
import SubLayoutTemplate from "../../../../components/ConfigLayoutTemplate"
import ImageHolder from "../../../../components/ImageHolder"
import { useEffect, useState } from "react"
import nookies from 'nookies'
import UserButton from "../../../../components/ButtonMaker"
import Textfield from "../../../../components/TextField"

export default function Charges({ charges, modals, setToken, setActiveDashboard, setActiveState, activeTab, setModalState, getModalButtonRef }) {
    const [chargeView, setChargeView] = useState(false)
    const [view, setView] = useState(false)

    useEffect(() => {
        setToken()
        setActiveDashboard("Configurations")
        setActiveState("1")
    }, [])

    function changeView() {
        setView(true)
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
                    <button ref={getModalButtonRef} onClick={() => { setModalState(true, "teamModal") }} className="flex font-pushpennyMedium font-500 text-[18px] leading-[23.44px] grow lg:w-[216px] h-[35px] rounded-[20px] items-center justify-center bg-gradient-to-r text-[#ffffff] from-[#EF6B25] to-[#F6BC18]">+ Add new charges</button>
                </section>

            </section>
            <section className={`py-2 w-full mt-[20px] px-4 ${modals.isOpen ? "blur-sm" : "blur-none"} ${view ? "hidden" : "block"}`}>
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
                                                    <UserButton type="view" text="View" onClick={changeView} />
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
            <section className={`py-2 w-full h-fit mt-[20px] flex-col lg:flex-row lg:justify-between px-4 ${view ? "flex" : "hidden"}`}>
                <div className="w-full lg:w-[48%] min-h-[538px] flex flex-col  px-4 py-6">

                    <div className="w-full  rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#DDDDDD] pl-[30px] pr-[13px] ">
                        <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">Charge Details</h2>
                    </div>


                    <form className="flex bg-brand-light-yellow py-4 rounded-[10px] flex-col justify-between w-full mt-[10px] min-h-[333px]">

                        <section className="flex  flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                            <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                                <Textfield type="text" title="Lower Bound" bg="bg-white" />
                            </div>
                        </section>
                        <section className="flex  flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                            <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                                <Textfield type="text" title="Upper Bound" bg="bg-white" />
                            </div>
                        </section>
                        <section className="flex  flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                            <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                                <Textfield type="text" title="Transaction Type" bg="bg-white" />
                            </div>
                        </section>
                        <section className="flex flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                            <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                                <Textfield type="text" title="Charge Type" bg="bg-white" />
                            </div>
                        </section>
                        <section className="flex flex-col mt-[20px] lg:flex-row lg:justify-between gap-[20px] lg:gap-0 relative self-center items-center w-[95%]">
                            <div className="flex items-center justify-center w-full h-[62px] relative rounded-[28.5px]">
                                <Textfield type="text" title="Fee" bg="bg-white" />
                            </div>
                        </section>

                        <section className="flex justify-between mt-[15px] w-[90%] self-center relative w-full">
                            <div className="w-[126px] h-[47px] lg:w-[186px] lg:h-[57px]">
                                <UserButton text="Edit" type="gradient" />
                            </div>
                            <div className="w-[126px] h-[47px] lg:w-[186px] lg:h-[57px]">
                                <UserButton text="Save" bg="bg-[#DDDDDD]" textColor="text-[white]" />
                            </div>
                        </section>
                    </form>
                </div>

                <div className="w-full lg:w-[48%]  h-fit gap-[10px] flex flex-col px-4 py-6">

                    <div className="w-full rounded-[48px] h-[80px] lg:h-[61px] flex flex-col lg:flex-row justify-around items-center bg-[#F9F9F9] pl-[30px] pr-[13px] ">
                        <h2 className="font-pushpennyBook text-[18px] font-[400] leading-[14px]">Charge Splits</h2>
                        <div className="w-[134px] h-[35px]">
                            <UserButton type="gradient" text="+Add Split" />
                        </div>
                    </div>

                    <div className="grow w-full justify-around bg-brand-light-yellow rounded-[10px] p-4 flex flex-col">
                        <h2 className="font-pushpennyBook text-[12px] font-[400] leading-[14px] text-[#6E7883]">
                           All Splits are in percentage
                        </h2>
                        <ul className="flex justify-between border-b border-[#FBF4EB] w-full xl:w-[90%]">
                            <li className="font-pushpennyBook  text-[12px] font-[400] leading-[15px]">STATUS</li>
                            <li className="font-pushpennyBook text-[12px] font-[400] leading-[15px]">CREATED ON</li>
                            <li className="font-pushpennyBook text-[12px] font-[400] leading-[15px]">LAST LOGIN</li>
                            <li className="font-pushpennyBook text-[12px] font-[400] leading-[15px]">LIEN STATUS</li>
                        </ul>
                        <div className="flex justify-between w-full">
                            <div className="w-[40px] text-center   font-pushpennyBook text-[18px] font-[400] leading-[23px] text-[#6E7883] ">A</div>
                            <div className="w-[80px] xl:w-[100px]  font-pushpennyBook text-[18px] font-[400] leading-[23px] text-[#6E7883] ">
                                27-12-2021 06:48 PM
                            </div>
                            <div className="w-[80px] xl:w-[100px]  font-pushpennyBook text-[18px] font-[400] leading-[23px] text-[#6E7883] ">
                                27-12-2021 06:48 PM
                            </div>
                            <div className="w-[60px] xl:w-[100px] lg:w-[40px]  font-pushpennyBook text-[18px] font-[400] leading-[23px] text-[#6E7883] ">NO</div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}



Charges.Layout = SubLayoutTemplate

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