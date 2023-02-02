
import MetricLayoutTemplate from "../../../../../components/MetricLayoutTemplate";
// import ImageHolder from "../../../../components/ImageHolder";
import UserButton from "../../../../../components/ButtonMaker";
import { useEffect } from "react";

export default function Agents({ modals, setToken }) {

    useEffect(()=>{
        setToken()
    },[])

    return (
        <div className="w-full">
            <section className={`py-2 w-full mt-[20px] ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <section className="h-[674px] w-full overflow-x-auto rounded-[10px] bg-brand-light-yellow pt-4 pl-[5px]">
                    <div className="w-[1135px] h-fit">

                        <table className="table-fixed w-full flex flex-col">
                            <thead>
                                <tr className="flex justify-between">
                                    <th className="font-400   flex w-[100px]  text-[12px] leading-[15.62px] font-pushpennyBook">AGENT ID</th>
                                    <th className="font-400  ml-[10px]  flex w-[120px] text-[12px] leading-[15.62px] font-pushpennyBook">USERNAME</th>
                                    <th className="font-400  flex w-[100px] text-[12px] leading-[15.62px] font-pushpennyBook">TYPE</th>
                                    <th className="font-400  flex w-[100px] text-[12px] leading-[15.62px] font-pushpennyBook">NAME F/L</th>
                                    <th className="font-400  flex w-[120px] text-[12px] leading-[15.62px] font-pushpennyBook">PHONE NUMBER</th>
                                    <th className="font-400  flex w-[80px] break-words text-[12px] leading-[15.62px] font-pushpennyBook">STATUS/ ACTIVITIES</th>
                                    <th className="font-400  flex w-[75px] text-[12px] leading-[15.62px] font-pushpennyBook">CREATED ON</th>
                                    <th className="font-400  flex w-[75px] text-[12px] leading-[15.62px] font-pushpennyBook">LAST LOGIN</th>
                                    <th className="font-400  flex w-[100px] text-[12px] leading-[15.62px] font-pushpennyBook">STATE/LGA</th>
                                    <th className="font-400  flex w-[173px] text-[12px] leading-[15.62px] font-pushpennyBook">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6 ">
                                <tr className="flex justify-between h-[50px]">
                                    <td className="font-pushpennyBook flex w-[100px]  font-400 text-[14px] leading-[18px] text-[#6E7883]">AGL0000002</td>
                                    <td className="font-pushpennyBook flex w-[120px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">+2347039429722</td>
                                    <td className="font-pushpennyBook flex w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">Super Agent</td>
                                    <td className="font-pushpennyBook flex flex-col w-[100px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">
                                    <h2>
                                        Jolly
                                        </h2>
                                        <h2>
                                        Mensa
                                        </h2>
                                    </td>
                                    <td className="font-pushpennyBook flex w-[120px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">+2347039429722</td>
                                    <td className="font-pushpennyBook flex w-[80px]  font-400 text-[14px] flex-col leading-[14px] text-[#6E7883]">
                                        <h2>
                                            Activated
                                        </h2>
                                        <h2>
                                            Inactive
                                        </h2>
                                    </td>
                                    <td className="font-pushpennyBook flex w-[75px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">27-12-2021 06:48 PM</td>
                                    <td className="font-pushpennyBook flex w-[75px]  font-400 text-[14px] leading-[14px] text-[#6E7883]">27-12-2021 06:48 PM</td>
                                    <td className="font-pushpennyBook flex w-[100px] font-400 text-[14px] leading-[14px] flex-col text-[#6E7883]">
                                        <h2>
                                            Adamawa
                                        </h2>
                                        <h2>
                                            Damesa
                                        </h2>
                                    </td>
                                    <td className="font-pushpennyBook gap-[5px] flex w-[175px]  flex items-start">
                                        <div className="w-[80px] h-[36px]">
                                            <UserButton type="edit" />
                                        </div>
                                        <div className="w-[88px] h-[36px]">
                                            <UserButton type="view" text="View" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </section>
        </div>
    )
}

Agents.Layout = MetricLayoutTemplate