
import SubLayoutTemplate from "../../../../components/ConfigLayoutTemplate"
import ImageHolder from "../../../../components/ImageHolder"
import { useEffect } from "react"
import nookies from 'nookies'
export default function Settings({ modals, setActiveState, setActiveDashboard, settings, activeTab, setToken, setModalState, getModalButtonRef }) {

    useEffect(()=>{
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
                    <div className=" w-[250%] sm:w-[230%] md:w-[200%] mdxl:w-[180%] lg:w-[160%] xlg:w-[140%] xl:w-full h-[30px]">

                        <table className="table-fixed w-full flex flex-col">
                            <thead>
                                <tr className="flex justify-around">
                                    <th className="font-400  flex w-[20%]  text-[12px] leading-[15.62px] font-pushpennyBook">NAME</th>
                                    <th className="font-400   flex w-[20%] text-[12px] leading-[15.62px] font-pushpennyBook">DESCRIPTION</th>
                                    <th className="font-400   flex w-[20%] text-[12px] leading-[15.62px] font-pushpennyBook">STATUS</th>
                                    <th className="font-400  flex w-[20%] text-[12px] leading-[15.62px] font-pushpennyBook">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6">
                                {settings.data.map((item,index)=> {
                                    return (
                                        <tr key={index} className="flex justify-around h-[50px]">
                                        <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.name}</td>
                                        <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.description}</td>
                                        <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.enabled ? "Active" : "Inactive"}</td>
                                        <td className="font-pushpennyBook flex w-[20%] flex items-start font-400 text-[18px] leading-[14px] text-[#6E7883]">
                                            <button className="w-[107px] h-[36px] flex justify-between px-[20px] items-center text-white rounded-[24px] bg-black flex">
                                                <h2 className="font-[400] font-pushPenny text-[18px]">Edit</h2>
                                                <div className="w-[24px] h-[24px] relative">
                                                <ImageHolder src= '/icons/arrow.svg' />
                                                </div>
                                            </button>
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

export const getServerSideProps = async(context) => {
    const cookies = nookies.get(context)
    const response = await fetch(`https://3695-41-138-165-100.eu.ngrok.io/v1/setting/all?pageNo=1&pageSize=5`,
    {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${cookies.token}`
        }
    }
    )
    const settings = await response.json()
    return {
        props: {
            settings
        }
    }
}
