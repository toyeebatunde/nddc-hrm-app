
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
import useSWR, { mutate } from 'swr'
import axios from 'axios'
import { testEnv } from '../../../../components/Endpoints'
import jwt from 'jsonwebtoken'
import SubLayoutTemplate from '../../../../components/ConfigLayoutTemplate'
import TableContainer from '../../../../components/TableContainer'
import UserButton from '../../../../components/ButtonMaker'

export default function Roles({ modals, setModalState, setToken, setActiveDashboard, setActiveState, entryValue, pageSelector, setActiveTab }) {
    const [permissions, setPermissions] = useState([
        { name: false },
        { name: false },
        { name: false },
        { name: false },
        { name: false },
        { name: false },
        { name: false },
        { name: false },
        { name: false },
        { name: false },
        { name: false },
        { name: false },
        { name: false },
        { name: false },
        { name: false },
    ])
    const [newRole, setNewRole] = useState("")
    const [reload, setReload] = useState(true)
    const [createRole, setCreateRole] = useState(false)
    const [rolesData, setRolesData] = useState()
    const fetching = (url) => axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => res.data)
    const { data, error } = useSWR(`${testEnv}v1/role/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`, fetching)
    // const router = useRouter()


    function setRolePermissions(e, position, permission) {
        e.preventDefault()
        console.log(permissions[position])
        setPermissions([...permissions, permissions[position].name = permission])
    }

    function saveRole() {
        let allPermissions = []
        permissions.map((permission) => {
            if (permission.name) {
                allPermissions.push(permission.name)
                return
            }
        })
        axios.post(`${testEnv}v1/role/create`, {
            "name": newRole,
            "permissions": allPermissions
        },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
            .then(response => {
                debugger
                setCreateRole(false)
                triggerReload()
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        setActiveTab("Roles and Privileges")
        const decoded = jwt.decode(localStorage.getItem('token'))
        console.log(decoded)
        const permissions = decoded?.permissions?.split(',')
        console.log(permissions)
        setToken()
        setActiveDashboard("UserManagement")
        setActiveState("1")
        if (data) {
            setRolesData(data)
        }
        if (error) {
            console.log(error)
        }
    }, [data])

    useEffect(() => {
        mutate(`${testEnv}v1/role/all?pageNo=${entryValue.page}&pageSize=${entryValue.size}`)
    }, [reload])

    function triggerReload() {
        setReload(!reload)
    }

    useEffect(() => {
        setToken()
    }, [])



    const getModalRef = useRef()
    const getModalButtonRef = useRef()


    return (
        <div className={``}>

            <section className={`px-4 w-full justify-center ${modals.isOpen ? "blur-sm" : "blur-none"} flex`}>
                <section className={`px-[40px] w-fit md:w-full flex flex-col items-center mdxl:justify-between mdxl:flex-row mdxl:px-[10px] bg-[#F3F3F3] rounded-[48px] pt-2 pb-2 mt-8 h-fit lg:h-[61px]`}>
                    <section className=" w-[354px] h-[40px] bg-white rounded-[20px] px-2 relative flex items-center justify-between">
                        <input className="search-tab rounded-[20px] w-[80%]" placeholder="Search member" />
                        <div className="w-[28px] h-[28px] relative">
                            <ImageHolder src={searchIcon} />
                        </div>
                    </section>
                    <button ref={getModalButtonRef} onClick={() => { setCreateRole(true) }} className="flex mt-[10px] mdxl:mt-0 font-pushpennyMedium font-500 text-[18px] leading-[23.44px] w-[354px] h-[35px] rounded-[20px] items-center justify-center bg-gradient-to-r text-[#ffffff] from-[#EF6B25] to-[#F6BC18]">
                        + Create New Role
                    </button>
                </section>
            </section>

            <section className={`absolute create-role ${createRole ? "show" : ""} z-50 px-4 w-full flex flex-col h-full bg-white text-black top-[130px]`}>
                <button className='w-fit' onClick={() => { setCreateRole(false) }}>{"< Back"}</button>
                <form className="flex flex-col w-full  mt-5">
                    <section className="flex flex-col">
                        <p>Role name</p>
                        <p>What do you want to call this role?</p>
                        <section className="mt-[15px] w-[400px]">
                            <div className="flex items-center justify-start pl-2 w-full h-[62px] relative rounded-[28.5px] bg-[#F3F3F3]">
                                <label className="z-40 top-[-7px] absolute left-[30px] w-[59px] h-[14px] flex flex-col items-center justify-center" for="assign">
                                    <section className="w-full h-[50%] top-0 absolute bg-[#F3F3F3]"></section>
                                    <p className="z-30 font-400 text-[10px] leading-[13px] font-pushpennyBook">Assign role</p>
                                </label>
                                <input value={newRole} name="assign" className="bg-[#F3F3F3] h-[60%] w-[90%] rounded-[40px]" type="text"
                                    onChange={(e) => {
                                        setNewRole(e.target.value)
                                    }}
                                />
                            </div>
                        </section>
                    </section>

                    <section className="flex flex-col">
                        <section className="flex mt-4 flex-col">
                            <p className="font-500 text-[18px] leading-[23px] font-pushpennyMedium">System</p>
                            <RadioToggle parent={"System"} label={"User management"} permissions={permissions} setPermissions={setRolePermissions} position={0} access={{ yes: "USER_MANAGEMENT", no: false }} />
                            <RadioToggle parent={"System"} label={"Configurations"} permissions={permissions} setPermissions={setRolePermissions} position={1} access={{ yes: "CONFIGURATIONS", no: false }} />
                            <RadioToggle parent={"System"} label={"Approvals"} permissions={permissions} setPermissions={setRolePermissions} position={2} access={{ yes: "APPROVALS", no: false }} />
                            <RadioToggle parent={"System"} label={"Institutions"} permissions={permissions} setPermissions={setRolePermissions} position={3} access={{ yes: "INSTITUTIONS", no: false }} />

                        </section>
                        <section className="flex mt-4 flex-col">
                            <p className="font-500 text-[18px] leading-[23px] font-pushpennyMedium">Agency</p>
                            <RadioToggle parent={"Agency"} label={"Agent Management"} permissions={permissions} setPermissions={setRolePermissions} position={4} access={{ edit: "EDIT_AGENT_MANAGEMENT", view: "VIEW_AGENT_MANAGEMENT", hide: false }} />
                            <RadioToggle parent={"Agency"} label={"Customer Management"} permissions={permissions} setPermissions={setRolePermissions} position={5} access={{ edit: "EDIT_CUSTOMER_MANAGEMENT", view: "VIEW_CUSTOMER_MANAGEMENT", hide: false }} />
                            <RadioToggle parent={"Agency"} label={"Value Added Services"} permissions={permissions} setPermissions={setRolePermissions} position={6} access={{ edit: "EDIT_VALUE_ADDED_SERVICES", view: "VIEW_VALUE_ADDED_SERVICES", hide: false }} />
                            <RadioToggle parent={"Agency"} label={"Transactions"} permissions={permissions} setPermissions={setRolePermissions} position={7} access={{ edit: "EDIT_TRANSACTIONS", view: "VIEW_TRANSACTIONS", hide: false }} />
                            <RadioToggle parent={"Agency"} label={"Settlements"} permissions={permissions} setPermissions={setRolePermissions} position={8} access={{ edit: "EDIT_SETTLEMENTS", view: "VIEW_SETTLEMENTS", hide: false }} />
                            <RadioToggle parent={"Agency"} label={"Reconciliation"} permissions={permissions} setPermissions={setRolePermissions} position={9} access={{ edit: "EDIT_RECONCILIATION", view: "VIEW_RECONCILIATION", hide: false }} />
                            <RadioToggle parent={"Agency"} label={"POS Terminals"} permissions={permissions} setPermissions={setRolePermissions} position={10} access={{ edit: "EDIT_POS_TERMINAL", view: "VIEW_POS_TERMINALS", hide: false }} />


                        </section>
                        <section className="flex mt-4 flex-col">
                            <p className="font-500 text-[18px] leading-[23px] font-pushpennyMedium">Insights and Reports</p>
                            <RadioToggle parent={"Insight"} label={"Insights and Reports"} permissions={permissions} setPermissions={setRolePermissions} position={11} access={{ edit: "EDIT_REPORTS", view: "VIEW_REPORTS", hide: false }} />

                        </section>
                        <section className="flex mt-4 flex-col">
                            <p className="font-500 text-[18px] leading-[23px] font-pushpennyMedium">Support</p>
                            <RadioToggle parent={"Support"} label={"Ticket Management"} permissions={permissions} setPermissions={setRolePermissions} position={12} access={{ edit: "EDIT_TICKET_MANAGEMENT", hide: false }} />
                            <RadioToggle parent={"Support"} label={"Bulk Notification"} permissions={permissions} setPermissions={setRolePermissions} position={13} access={{ edit: "EDIT_BULK_NOTIFICATION", hide: false }} />
                            <RadioToggle parent={"Support"} label={"Audits"} permissions={permissions} setPermissions={setRolePermissions} position={14} access={{ edit: "EDIT_AUDITS", hide: false }} />

                        </section>
                        {/* <section className="flex mt-4 flex-col">
                            <p className="font-500 text-[18px] leading-[23px] font-pushpennyMedium">Loan</p>
                            <RadioToggle parent={"Loan"} label={"Loan Performance"} />
                            <RadioToggle parent={"Loan"} label={"Credit Call"} />
                        </section> */}
                        <div className=" flex w-[320px] justify-start self-end">
                            <div className='w-[120px] mt-[40px] h-[40px] rounded-[28.5px]'>
                                <UserButton onClick={saveRole} type="gradient" text="Save Role" />
                            </div>
                        </div>

                    </section>
                </form>
            </section>

            {/* <section className={`py-2 w-full mt-[20px] px-4 ${modals.isOpen ? "blur-sm" : "blur-none"} flex`}>
                <TableContainer pageSelector={pageSelector} entryValue={entryValue}>
                    <table className="table-fixed w-full">
                        <thead>
                            <tr className=" justify-around">
                                <th className="font-400 text-start  w-[20%]  text-[12px] leading-[15.62px] font-pushpennyBook"> ROLE NAME</th>
                                <th className="font-400 text-start  w-[20%] text-[12px] leading-[15.62px] font-pushpennyBook">TYPE</th>
                                <th className="font-400 text-start  w-[20%] text-[12px] leading-[15.62px] font-pushpennyBook">CREATED BY</th>
                                <th className="font-400 text-start  w-[20%] text-[12px] leading-[15.62px] font-pushpennyBook">TEAM MATES</th>
                            </tr>
                        </thead>
                        <tbody className="mt-6">
                            {rolesData?.data.map((role, index) => {
                                return (
                                    <tr key={index} className="h-[50px]">
                                        <td className="font-pushpennyBook  w-[20%]  font-400 text-[18px] leading-[14px] text-[#6E7883]">{role.name}</td>
                                        <td className="font-pushpennyBook  w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">{role.description || "n/a"}</td>
                                        <td className="font-pushpennyBook  w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">{role.createdBy || "n/a"}</td>
                                        <td className="font-pushpennyBook  w-[20%] items-start font-400 text-[18px] leading-[14px] text-[#6E7883]">
                                            {role.teamMembers}
                                        </td>
                                    </tr>
                                )
                            })}


                        </tbody>
                    </table>
                </TableContainer>
            </section> */}

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

Roles.Layout = SubLayoutTemplate