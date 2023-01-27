import ImageHolder from '../../components/ImageHolder'
import directionDown from '../../public/icons/direction-down.svg'
import down from '../../public/icons/down.svg'
import arrowUpGreen from '../../public/icons/arrow-up-green-circle.svg'
import searchIcon from '../../public/icons/search-icon.svg'
import closeIcon from '../../public/icons/close-modal.svg'
import { useState, useRef, useEffect } from "react"
import tick from '../../public/icons/tick.svg'
import RadioToggle from "../../components/radioToggle"
import ButtonTab from "../../components/ButtonTab"

export default function UserManagement({ modals, setModalState }) {
    const [activeTab, setActiveTab] = useState("Team")
    const [createRole, setCreateRole] = useState(false)

    function setTab(tab) {
        setActiveTab(tab)
    }



    const getModalRef = useRef()
    const getModalButtonRef = useRef()

    const tabs = [
        "Team",
        "Roles and Privileges"
    ]


    return (
        <div className={`flex relative flex-col items-start pt-[60px] overflow-hidden w-full`}>
            <section className={`w-full flex px-4 justify-between ${modals.isOpen ? "blur-sm" : "blur-none"} `}>
                <h4 className="font-pushpennyMedium text-[36px] leading-[47px]">
                    System
                </h4>
            </section>
            <section className={`h-[44px]  flex flex-col w-full px-4 relative mt-5 ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <div className="flex justify-between w-[345px] relative">
                    {tabs.map((tab, index) => <ButtonTab key={index} name={tab} activeTab={activeTab} setTab={setTab} />)}

                </div>
                <div className="border-b-[0.5px] mt-auto z-10 border-[#979797]"></div>
            </section>
            <section className={`px-4 flex justify-center w-full ${modals.isOpen ? "blur-sm" : "blur-none"}`}>
                <section className={`px-[40px] mdxl:px-[10px] pt-2 pb-2 w-fit md:w-full mt-8 h-fit lg:h-[61px] ${activeTab == "Team" ? "flex" : "hidden"} flex-col mdxl:flex-row justify-between items-center rounded-[48px] bg-[#F3F3F3] md:pr-[60px]`}>
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

            <section className={`py-2 w-full mt-[20px] px-4 ${modals.isOpen ? "blur-sm" : "blur-none"} ${activeTab == "Team" ? "" : "hidden"}`}>
                <section className="h-[674px] w-full overflow-x-auto rounded-[10px] bg-brand-light-yellow pt-4 pl-2 pr-4">
                    <div className=" w-[250%] sm:w-[230%] md:w-[200%] mdxl:w-[180%] lg:w-[160%] xlg:w-[140%] xl:w-full h-[30px]">

                        <table className="table-fixed w-full flex flex-col">
                            <thead>
                                <tr className="flex justify-around">
                                    <th className="font-400  flex w-[20%]  text-[12px] leading-[15.62px] font-pushpennyBook">NAME</th>
                                    <th className="font-400   flex w-[20%] text-[12px] leading-[15.62px] font-pushpennyBook">EMAIL DETAILS</th>
                                    <th className="font-400   flex w-[20%] text-[12px] leading-[15.62px] font-pushpennyBook">ROLE</th>
                                    <th className="font-400  flex w-[20%] text-[12px] leading-[15.62px] font-pushpennyBook">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="mt-6">
                                <tr className="flex justify-around h-[50px]">
                                    <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">Olamide Olagunju</td>
                                    <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">mideola@angalafintech.com</td>
                                    <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">Super Admin</td>
                                    <td className="font-pushpennyBook flex w-[20%] flex items-start font-400 text-[18px] leading-[14px] text-[#6E7883]">
                                        <button>Change Privileges</button>
                                    </td>
                                </tr>
                                <tr className="flex justify-around h-[50px]">
                                    <td className="font-pushpennyBook flex w-[20%]  font-400 text-[18px] leading-[14px] text-[#6E7883]">Olamide Olagunju</td>
                                    <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">mideola@angalafintech.com</td>
                                    <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">Super Admin</td>
                                    <td className="font-pushpennyBook flex w-[20%] flex items-start font-400 text-[18px] leading-[14px] text-[#6E7883]">
                                        <button>Change Privileges</button>
                                    </td>
                                </tr>
                                <tr className="flex justify-around h-[50px]">
                                    <td className="font-pushpennyBook flex w-[20%]  font-400 text-[18px] leading-[14px] text-[#6E7883]">Olamide Olagunju</td>
                                    <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">mideola@angalafintech.com</td>
                                    <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">Super Admin</td>
                                    <td className="font-pushpennyBook flex w-[20%] flex items-start font-400 text-[18px] leading-[14px] text-[#6E7883]">
                                        <button>Change Privileges</button>
                                    </td>
                                </tr>
                                <tr className="flex justify-around h-[50px]">
                                    <td className="font-pushpennyBook flex w-[20%]  font-400 text-[18px] leading-[14px] text-[#6E7883]">Olamide Olagunju</td>
                                    <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">mideola@angalafintech.com</td>
                                    <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">Super Admin</td>
                                    <td className="font-pushpennyBook flex w-[20%] flex items-start font-400 text-[18px] leading-[14px] text-[#6E7883]">
                                        <button>Change Privileges</button>
                                    </td>
                                </tr>
                                <tr className="flex justify-around h-[50px]">
                                    <td className="font-pushpennyBook flex w-[20%]  font-400 text-[18px] leading-[14px] text-[#6E7883]">Olamide Olagunju</td>
                                    <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">mideola@angalafintech.com</td>
                                    <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">Super Admin</td>
                                    <td className="font-pushpennyBook flex w-[20%] flex items-start font-400 text-[18px] leading-[14px] text-[#6E7883]">
                                        <button>Change Privileges</button>
                                    </td>
                                </tr>
                                <tr className="flex justify-around h-[50px]">
                                    <td className="font-pushpennyBook flex w-[20%]  font-400 text-[18px] leading-[14px] text-[#6E7883]">Olamide Olagunju</td>
                                    <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">mideola@angalafintech.com</td>
                                    <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">Super Admin</td>
                                    <td className="font-pushpennyBook flex w-[20%] flex items-start font-400 text-[18px] leading-[14px] text-[#6E7883]">
                                        <button>Change Privileges</button>
                                    </td>
                                </tr>
                                <tr className="flex justify-around h-[50px]">
                                    <td className="font-pushpennyBook flex w-[20%]  font-400 text-[18px] leading-[14px] text-[#6E7883]">Olamide Olagunju</td>
                                    <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">mideola@angalafintech.com</td>
                                    <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">Super Admin</td>
                                    <td className="font-pushpennyBook flex w-[20%] flex items-start font-400 text-[18px] leading-[14px] text-[#6E7883]">
                                        <button>Change Privileges</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </section>

            <section className={`px-4 w-full justify-center ${modals.isOpen ? "blur-sm" : "blur-none"} ${activeTab == "Roles and Privileges" ? "flex" : "hidden"}`}>
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
                <p onClick={() => { setCreateRole(false) }}>{"< Back"}</p>
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
                                <input id="assign" name="assign" className="bg-[#F3F3F3] h-[60%] w-[90%] rounded-[40px]" type="text" />
                            </div>
                        </section>
                    </section>

                    <section className="flex flex-col">
                        <section className="flex mt-4 flex-col">
                            <p className="font-500 text-[18px] leading-[23px] font-pushpennyMedium">System</p>
                            <RadioToggle parent={"System"} label={"User management"} />
                            <RadioToggle parent={"System"} label={"Configurations"} />
                            <RadioToggle parent={"System"} label={"Institutions"} />
                            <RadioToggle parent={"System"} label={"Approvals"} />
                        </section>
                        <section className="flex mt-4 flex-col">
                            <p className="font-500 text-[18px] leading-[23px] font-pushpennyMedium">Agency</p>
                            <RadioToggle parent={"Agency"} label={"Agent Management"} />
                            <RadioToggle parent={"Agency"} label={"Customer Management"} />
                            <RadioToggle parent={"Agency"} label={"Fund Request"} />
                            <RadioToggle parent={"Agency"} label={"Value Added Services"} />
                            <RadioToggle parent={"Agency"} label={"Transactions"} />
                            <RadioToggle parent={"Agency"} label={"Settlements"} />
                            <RadioToggle parent={"Agency"} label={"Reconciliation"} />
                            <RadioToggle parent={"Agency"} label={"POS Terminals"} />

                        </section>
                        <section className="flex mt-4 flex-col">
                            <p className="font-500 text-[18px] leading-[23px] font-pushpennyMedium">Insights and Reports</p>
                            <RadioToggle parent={"Insights and Reports"} label={"Reports"} />
                        </section>
                        <section className="flex mt-4 flex-col">
                            <p className="font-500 text-[18px] leading-[23px] font-pushpennyMedium">Support</p>
                            <RadioToggle parent={"Support"} label={"Ticket Management"} />
                            <RadioToggle parent={"Support"} label={"Bulk Notification"} />
                            <RadioToggle parent={"Support"} label={"Audit"} />
                        </section>
                        <section className="flex mt-4 flex-col">
                            <p className="font-500 text-[18px] leading-[23px] font-pushpennyMedium">Loan</p>
                            <RadioToggle parent={"Loan"} label={"Loan Performance"} />
                            <RadioToggle parent={"Loan"} label={"Credit Call"} />
                        </section>
                        <div className=" flex w-[320px] justify-start self-end">
                            <button className="flex mt-[20px] items-center font-pushpennyMedium text-[14px] leading-[18px] font-500] justify-center pl-2 w-[120px] h-[40px] relative rounded-[28.5px] bg-gradient-to-r text-[#ffffff] from-[#EF6B25] to-[#F6BC18]">
                                Save Role
                            </button>
                        </div>

                    </section>
                </form>
            </section>

            <section className={`py-2 w-full mt-[20px] px-4 ${modals.isOpen ? "blur-sm" : "blur-none"} ${activeTab == "Roles and Privileges" ? "flex" : "hidden"}`}>
                <section className="h-[674px] w-full rounded-[10px] bg-brand-light-yellow pt-4 pl-2 pr-4">
                    <table className="table-fixed w-full flex flex-col">
                        <thead>
                            <tr className="flex justify-around">
                                <th className="font-400  flex w-[20%]  text-[12px] leading-[15.62px] font-pushpennyBook"> ROLE NAME</th>
                                <th className="font-400  flex w-[20%] text-[12px] leading-[15.62px] font-pushpennyBook">TYPE</th>
                                <th className="font-400  flex w-[20%] text-[12px] leading-[15.62px] font-pushpennyBook">CREATED BY</th>
                                <th className="font-400  flex w-[20%] text-[12px] leading-[15.62px] font-pushpennyBook">TEAM MATES</th>
                            </tr>
                        </thead>
                        <tbody className="mt-6">
                            <tr className="flex justify-around h-[50px]">
                                <td className="font-pushpennyBook flex w-[20%]  font-400 text-[18px] leading-[14px] text-[#6E7883]">Super Admin</td>
                                <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">Default</td>
                                <td className="font-pushpennyBook flex w-[20%] font-400 text-[18px] leading-[14px] text-[#6E7883]">Payrail</td>
                                <td className="font-pushpennyBook flex w-[20%] flex items-start font-400 text-[18px] leading-[14px] text-[#6E7883]">
                                    1
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </section>
            </section>

            {/* <section ref={getModalRef} className={`w-full left-0 z-50 h-full absolute ${modals.teamModal ? "block" : "hidden"}`}>
                <section className={`absolute bg-[#F9F9F9] z-50 top-[20%] left-[30%] flex-col px-8 py-8 w-[600px] h-[579px] rounded-[48px] bg-[#FFFFFF] flex`}>
                    <section className="flex justify-between">
                        <p className="font-pushpennyBold font-700 text-[28px] leading-[36.46px]">Invite a team mate</p>
                        <div onClick={() => { setModalState(false, "teamModal") }} className="w-[40px] h-[40px] relative cursor-pointer">
                            <ImageHolder src={closeIcon} />
                        </div>
                    </section>
                    <p className="font-pushpennyBook text-[18px] leading-[26px] mt-4">Send an invitation to join your company’s Payrail account</p>
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