
import ImageHolder from '../../../../components/ImageHolder'
// import directionDown from '../../../public/icons/direction-down.svg'
// import down from '../../../public/icons/down.svg'
// import arrowUpGreen from '../../../public/icons/arrow-up-green-circle.svg'
import searchIcon from '../../../../public/icons/search-icon.svg'
import closeIcon from '../../../../public/icons/close-modal.svg'
import { useState, useRef, useEffect } from "react"
// import RadioToggle from "../../../../components/RadioToggle"
import ButtonTab from "../../../../components/ButtonTab"
import nookies from 'nookies'
import useSWR, { mutate } from 'swr'
import axios from 'axios'
import { testEnv } from '../../../../components/Endpoints'
import jwt from 'jsonwebtoken'
import SubLayoutTemplate from '../../../../components/ConfigLayoutTemplate'
import TableContainer from '../../../../components/TableContainer'
import { postApi, editApi, deleteApi } from '../../../../components/Endpoints'

export default function UserManagement({ modals, setModalState, editFormState, setToken, setActiveDashboard, setActiveState, entryValue, pageSelector, setActiveTab, setLoading, resetPage, search, searchField, resetSearchParams, setSearchParam }) {
    // const [activeTab, setActiveTab] = useState("Team")
    const [createRole, setCreateRole] = useState(false)
    const [reload, setReload] = useState(true)
    const [usersData, setUsersData] = useState()
    const [rolesData, setRolesData] = useState()
    const [roleNames, setRoleNames] = useState(["", ""])
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data: users, error: usersError } = useSWR(`${testEnv}v1/user/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    const { data: roles, error: rolesError } = useSWR(`${testEnv}v1/role/all?pageNo=${entryValue.page}&pageSize=15`, fetching)
    const { data: searchBarData, error: searchBarDataError } = useSWR(`${testEnv}v1/user/search?pattern=${searchField}&pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    // const router = useRouter()

    useEffect(() => {
        // setLoading(true)
        setActiveTab("Team")
        resetSearchParams()
        const decoded = jwt.decode(localStorage.getItem('token'))
        // console.log(decoded)
        // const permissions = decoded?.permissions?.split(',')
        // console.log(permissions)
        // setToken()
        setActiveDashboard("Staff")
        setActiveState("0")
        if (users) {
            setLoading(false)
            setUsersData(users)
        }
        // if (roles) {
        //     setRolesData(roles)
        //     const rolesList = roles?.data.map(item => item.name)
        //     rolesList.unshift("Select a Role")
        //     setRoleNames(rolesList)
        // }
    }, [users])

    useEffect(() => {
        resetPage()
    }, [])

    useEffect(() => {
        // setLoading(true)
        // setActiveTab("Team")
        // setToken()
        // setActiveDashboard("UserManagement")
        // setActiveState("1")
        // if (users) {
        //     setLoading(false)
        //     setUsersData(users)
        // }
        if (roles) {
            setRolesData(roles)
            const rolesList = roles?.data.map(item => item.name)
            rolesList.unshift("Select a Role")
            setRoleNames(rolesList)
        }
    }, [roles])

    useEffect(() => {
        if (searchBarDataError) {
            console.log(searchBarDataError)
        }
    }, [searchBarData])

    function triggerReload() {
        setReload(!reload)
    }

    useEffect(() => {
        setToken()
    }, [])

    function addTeamMateForm(modalState, modal, fields, id) {
        setModalState(modalState, modal)
        editFormState(fields, id)
    }



    const getModalRef = useRef()
    const getModalButtonRef = useRef()

    return (
        <div className={`borde p-[5px] flex flex-col`}>
            <section className={`px-4 flex justify-center w-full ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <section className={`px-[40px] mdxl:px-[10px] pt-2 pb-2 w-fit md:w-full mt-8 h-fit lg:h-[61px] flex flex-col mdxl:flex-row justify-between items-center rounded-[48px] bg-[#F3F3F3] md:pr-[60px]`}>
                    <section className="w-[354px] h-[40px] bg-white rounded-[20px] px-2 relative flex items-center justify-between">
                        <input onChange={(e) => { setSearchParam(e) }} className="search-tab rounded-[20px] w-[80%]" placeholder="Search member" />
                        <div className="w-[28px] h-[28px] relative">
                            <ImageHolder src={searchIcon} />
                        </div>
                    </section>
                    <section className="flex  w-[354px] mt-4 mdxl:mt-0 justify-between">
                        <p className="flex w-[45%] lg:w-[215px] h-[35px] items-center  font-500 text-[#6E7883] font-pushpennyMedium text-[16px]">Pending Invites · 0</p>
                        <button onClick={() => {
                            addTeamMateForm(true, "teamModal",
                                {
                                    firstName: "",
                                    lastName: "",
                                    email: "",
                                    phone: "",
                                    assignRole: "",
                                    endPoint: `${testEnv}v1/user/add_user`,
                                    onClick: postApi,
                                    trigger: triggerReload,
                                    loadState: setLoading,
                                    selectOptions: roleNames,
                                    privileges: false
                                },
                                0
                            )
                        }} className="flex font-pushpennyMedium font-500 text-[18px] leading-[23.44px] grow lg:w-[216px] h-[35px] rounded-[20px] items-center justify-center bg-[#2dcd7c] text-white lg:px-[2px]">
                            + Invite a team mate
                        </button>
                    </section>

                </section>
            </section>

            <section className={`py-2 w-full mt-[20px] px-4 borde overflow-hidden`}>
                <TableContainer pageSelector={pageSelector} entryValue={entryValue}>
                    <table className="table-fixed w-full">
                        <thead>
                            <tr className="">
                                <th className="font-400 text-start   w-[108px]  text-[12px] leading-[15.62px] font-pushpennyBook">NAME</th>
                                <th className="font-400 text-start  w-[158px]  text-[12px] leading-[15.62px] font-pushpennyBook">EMAIL DETAILS</th>
                                <th className="font-400 text-start  w-[205px] text-[12px] leading-[15.62px] font-pushpennyBook">ROLE</th>
                                <th className="font-400 text-start w-[100px] pl-[20px] text-[12px] leading-[15.62px] font-pushpennyBook">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="mt-6">
                            {searchField == "" ?
                                usersData?.data.map((item, index) => {
                                    return (
                                        <tr key={index} className="h-[50px]">
                                            <td className="font-pushpennyBook  font-400 text-[18px] leading-[14px] text-[#6E7883]">{`${item.firstName} ${item.lastName}`}</td>
                                            <td className="font-pushpennyBook   font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.email}</td>
                                            <td className="font-pushpennyBook truncate inline-block w-[205px] font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.role.name}</td>
                                            <td className="font-pushpennyBook pl-[20px] h-[40px]  items-center font-400 text-[18px] leading-[14px] text-[#6E7883]">
                                                <button onClick={() => {
                                                    addTeamMateForm(true, "teamModal",
                                                        {
                                                            firstName: item.firstName,
                                                            lastName: item.lastName,
                                                            email: "n/a",
                                                            assignRole: "",                                                            
                                                            endPoint: `${testEnv}v1/user/${item.id}/delete`,
                                                            onClick: {delete: deleteApi, update: editApi},
                                                            trigger: triggerReload,
                                                            loadState: setLoading,
                                                            selectOptions: roleNames,
                                                            heading:"Update user privileges",
                                                            privileges: true
                                                        },
                                                        item.id
                                                    )
                                                }}
                                                >Change Privileges</button>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                searchBarData?.data.map((item, index) => {
                                    return (
                                        <tr key={index} className="h-[50px]">
                                            <td className="font-pushpennyBook  font-400 text-[18px] leading-[14px] text-[#6E7883]">{`${item.firstName} ${item.lastName}`}</td>
                                            <td className="font-pushpennyBook   font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.email}</td>
                                            <td className="font-pushpennyBook truncate inline-block w-[205px] font-400 text-[18px] leading-[14px] text-[#6E7883]">{item.role.name}</td>
                                            <td className="font-pushpennyBook pl-[20px] h-[40px]  items-center font-400 text-[18px] leading-[14px] text-[#6E7883]">
                                                <button >Change Privileges</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </TableContainer>
            </section>





            {/* <section ref={getModalRef} className={`w-full left-0 z-50 h-full absolute ${modals.rolesModal ? "block" : "hidden"}`}>
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

            </section> */}


        </div>
    )
}

UserManagement.Layout = SubLayoutTemplate