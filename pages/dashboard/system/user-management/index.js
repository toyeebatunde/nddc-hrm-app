
import ImageHolder from '../../../../components/ImageHolder'
// import directionDown from '../../../public/icons/direction-down.svg'
// import down from '../../../public/icons/down.svg'
// import arrowUpGreen from '../../../public/icons/arrow-up-green-circle.svg'
import searchIcon from '../../../../public/icons/search-icon.svg'
import closeIcon from '../../../../public/icons/close-modal.svg'
import { useState, useRef, useEffect } from "react"
import RadioToggle from "../../../../components/RadioToggle"
import ButtonTab from "../../../../components/ButtonTab"
import nookies from 'nookies'
import useSWR, {mutate} from 'swr'
import axios from 'axios'
import { testEnv } from '../../../../components/Endpoints'
import  jwt  from 'jsonwebtoken'
import SubLayoutTemplate from '../../../../components/ConfigLayoutTemplate'
import TableContainer from '../../../../components/TableContainer'

export default function UserManagement({ modals, setModalState, setToken, setActiveDashboard, setActiveState, entryValue, pageSelector, setActiveTab }) {
    // const [activeTab, setActiveTab] = useState("Team")
    const [createRole, setCreateRole] = useState(false)
    const [usersData, setUsersData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/user/all?pageNo=0&pageSize=10`, fetching)
    // const router = useRouter()

    useEffect(() => {
        setActiveTab("Team")
        const decoded =jwt.decode(localStorage.getItem('token'))
        console.log(decoded) 
        const permissions =decoded?.permissions?.split(',')
        console.log(permissions)    
        setToken()
        setActiveDashboard("UserManagement")
        setActiveState("1")
        if (data) {
            setUsersData(data)
        }
        if (error) {
            console.log(error)
        }
    }, [data])

    function setTab(tab) {
        setActiveTab(tab)
    }

    useEffect(() => {
        setToken()
    }, [])



    const getModalRef = useRef()
    const getModalButtonRef = useRef()

    const tabs = [
        "Team",
        "Roles and Privileges"
    ]


    return (
        <div className={``}>           
            <section className={`px-4 flex justify-center w-full ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <section className={`px-[40px] mdxl:px-[10px] pt-2 pb-2 w-fit md:w-full mt-8 h-fit lg:h-[61px] flex flex-col mdxl:flex-row justify-between items-center rounded-[48px] bg-[#F3F3F3] md:pr-[60px]`}>
                    <section className="w-[354px] h-[40px] bg-white rounded-[20px] px-2 relative flex items-center justify-between">
                        <input className="search-tab rounded-[20px] w-[80%]" placeholder="Search member" />
                        <div className="w-[28px] h-[28px] relative">
                            <ImageHolder src={searchIcon} />
                        </div>
                    </section>
                    <section className="flex w-[354px] mt-4 mdxl:mt-0 justify-between">
                        <p className="flex w-[45%] lg:w-[215px] h-[35px] items-center  font-500 text-[#6E7883] font-pushpennyMedium text-[16px]">Pending Invites · 0</p>
                        <button onClick={() => { setModalState(true, "teamModal") }} className="flex font-pushpennyMedium font-500 text-[18px] leading-[23.44px] grow lg:w-[216px] h-[35px] rounded-[20px] items-center justify-center bg-gradient-to-r text-[#ffffff] from-[#EF6B25] to-[#F6BC18]">+ Invite a team mate</button>
                    </section>

                </section>
            </section>

            <section className={`py-2 w-full mt-[20px] px-4 ${modals.isOpen ? "blur-sm" : "blur-none"} flex`}>
                <section className="h-[674px] w-full md:w-full overflow-x-auto rounded-[10px] bg-brand-light-yellow pt-4 pl-2 pr-4">
                    <div className=" w-[250%] sm:w-[230%] md:w-[200%] mdxl:w-[180%] lg:w-[160%] xlg:w-[140%] xl:w-full h-[30px]">

                        <table className="table-fixed w-[120%] md:w-full flex flex-col">
                            <thead>
                                <tr className="flex justify-around">
                                    <th className="font-400  flex w-[20%]  text-[12px] leading-[15.62px] font-pushpennyBook">NAME</th>
                                    <th className="font-400   flex w-[20%] text-[12px] leading-[15.62px] font-pushpennyBook">EMAIL DETAILS</th>
                                    <th className="font-400   flex w-[15%] md:w-[10%] text-[12px] leading-[15.62px] font-pushpennyBook">ROLE</th>
                                    <th className="font-400  flex w-[20%] text-[12px] leading-[15.62px] font-pushpennyBook">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6">
                                {usersData?.data.map((item, index) => {
                                    return (
                                        <tr key={index} className="flex justify-around h-[50px]">
                                            <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">{`${item.firstName} ${item.lastName}`}</td>
                                            <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.email}</td>
                                            <td className="font-pushpennyBook flex w-[15%] md:w-[10%] font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.role.name}</td>
                                            <td className="font-pushpennyBook flex w-[20%] flex items-start font-400 text-[18px] leading-[14px] text-[#6E7883]">
                                                <button>Change Privileges</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </section>    

        

           

            <section ref={getModalRef} className={`w-full left-0 z-50 h-full absolute ${modals.rolesModal ? "block" : "hidden"}`}>
                <section className={`absolute bg-[#F9F9F9] z-50 top-[20%] left-[30%] flex-col px-8 py-8 w-[600px] h-[579px] rounded-[48px] bg-[#FFFFFF] flex`}>
                    <section className="flex justify-between">
                        <p className="font-pushpennyBold font-700 text-[28px] leading-[36.46px]">Finance role</p>
                        <div onClick={() => { setModalState(false, "rolesModal") }} className="w-[40px] h-[40px] relative cursor-pointer">
                            <ImageHolder src={closeIcon} />
                        </div>
                    </section>
                    <p className="font-pushpennyBook text-[18px] leading-[26px] mt-4">Roles</p>
                    <form className="flex flex-col mt-10 justify-between w-full h-[333px]">
                        <section className="flex justify-between relative w-full">
                            <div className="flex items-center justify-start pl-2 w-[232px] h-[62px] relative rounded-[28.5px] bg-[#F3F3F3]">
                                <label className="z-40 absolute top-[-7px] left-[30px] w-[59px] h-[14px] flex flex-col items-center justify-center" for="firstname">
                                    <p className="z-30 font-400 text-[10px] leading-[13px] font-pushpennyBook">First Name</p>
                                </label>
                                <input id="firstname" name="firstname" className="bg-[#F3F3F3] h-[60%] rounded-[40px]" type="text" />
                            </div>
                            <div className="flex items-center justify-start pl-2 w-[232px] h-[62px] relative rounded-[28.5px] bg-[#F3F3F3]">
                                <label className="z-40 top-[-7px] absolute left-[30px] w-[59px] h-[14px] flex flex-col items-center justify-center" for="lastname">
                                    {/* <section className="w-full h-[50%] top-0 absolute bg-[#F3F3F3]"></section> */}
                                    <p className="z-30 font-400 text-[10px] leading-[13px] font-pushpennyBook">Last Name</p>
                                </label>
                                <input id="lastname" name="firstname" className="bg-[#F3F3F3] h-[60%] rounded-[40px]" type="text" />
                            </div>
                        </section>
                        <section>
                            <div className="flex items-center justify-start pl-2 w-full h-[62px] relative rounded-[28.5px] bg-[#F3F3F3]">
                                <label className="z-40 top-[-7px] absolute left-[30px] w-[59px] h-[14px] flex flex-col items-center justify-center" for="email">
                                    <section className="w-full h-[50%] top-0 absolute bg-[#F3F3F3]"></section>
                                    <p className="z-30 font-400 text-[10px] leading-[13px] font-pushpennyBook">email</p>
                                </label>
                                <input id="email" name="email" className="bg-[#F3F3F3] h-[60%] w-[90%] rounded-[40px]" type="text" />
                            </div>
                        </section>
                        <section>
                            <div className="flex items-center justify-start pl-2 w-full h-[62px] relative rounded-[28.5px] bg-[#F3F3F3]">
                                <label className="z-40 top-[-7px] absolute left-[30px] w-[59px] h-[14px] flex flex-col items-center justify-center" for="assign">
                                    <section className="w-full h-[50%] top-0 absolute bg-[#F3F3F3]"></section>
                                    <p className="z-30 font-400 text-[10px] leading-[13px] font-pushpennyBook">Assign role</p>
                                </label>
                                <input id="assign" name="assign" className="bg-[#F3F3F3] h-[60%] w-[90%] rounded-[40px]" type="text" />
                            </div>
                        </section>

                        <section className="flex justify-between relative w-full">
                            <div className="flex items-center font-pushpennyBook text-[14px] border border-[#F3F3F3] leading-[18px] font-400] justify-center pl-2 w-[186px] h-[57px] relative rounded-[28.5px]">
                                Cancel
                            </div>
                            <div className="flex items-center font-pushpennyBook text-[14px] leading-[18px] font-400] justify-center pl-2 w-[186px] h-[57px] relative rounded-[28.5px] bg-gradient-to-r text-[#ffffff] from-[#EF6B25] to-[#F6BC18]">
                                Send Invitations
                            </div>
                        </section>
                    </form>
                </section>

            </section>


        </div>
    )
}

UserManagement.Layout = SubLayoutTemplate