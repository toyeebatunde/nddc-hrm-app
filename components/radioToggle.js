import tick from '../public/icons/tick.svg'
import { useState } from 'react'
import ImageHolder from './ImageHolder'


export default function RadioToggle({ parent, label, permissions, setPermissions, position, access, part }) {
    const [userState, setUserState] = useState(false)
    // console.log("Permissions: ", permissions)

    function setPermission(e, state) {
        e.preventDefault()
        setUserState(state)
    }

    if (parent == "SYSTEM") {
        return (
            <div className="flex justify-between">
                <p className='font-pushpennyBook text-[14px] font-400 leading-[22px] text-[#6E7883]'>{label}</p>
                <div className=' w-[143px] flex justify-around'>
                    <section className={`flex gap-[10px] items-center`}>
                        <button onClick={(e) => { setPermissions(e, label, true) }} className={`w-[16px] border h-[16px] rounded-[50%] border border-[2px] border-[#8C8C8C] relative`}>
                            <div className={`w-full h-full ${permissions.includes(label) ? "" : "hidden"} rounded-inherit relative`}>
                                <ImageHolder src="/icons/role-tick.svg" />
                            </div>
                        </button>
                        <p className='font-400 text-[14px] leading-[18.23px font-pushpennyBook]'>Yes</p>
                    </section>
                    <section className={`flex gap-[10px] items-center`}>
                        <button onClick={(e) => { setPermissions(e, label, false) }} className={`w-[16px] border h-[16px] rounded-[50%] border border-[2px] border-[#8C8C8C] relative`}>
                            <div className={`w-full h-full ${permissions.includes(label) ? "hidden" : ""} rounded-inherit relative`}>
                                <ImageHolder src="/icons/role-tick.svg" />
                            </div>
                        </button>
                        <p className='font-400 text-[14px] leading-[18.23px font-pushpennyBook]'>No</p>
                    </section>
                </div>

            </div>
        )
    }
    if (parent == "SUPPORT") {
        return (
            <div className="flex justify-between">
                <p className='font-pushpennyBook text-[14px] font-400 leading-[22px] text-[#6E7883]'>{label}</p>
                <div className=' w-[143px] flex justify-around'>
                    <section className={`flex gap-[10px] items-center`}>
                        <button onClick={(e) => { setPermissions(e, "EDIT_" + label, true) }} className={`w-[16px] border h-[16px] rounded-[50%] border border-[2px] border-[#8C8C8C] relative`}>
                            <div className={`w-full h-full ${permissions.includes("EDIT_" + label) ? "" : "hidden"} rounded-inherit relative`}>
                                <ImageHolder src="/icons/role-tick.svg" />
                            </div>
                        </button>
                        <p className='font-400 text-[14px] leading-[18.23px font-pushpennyBook]'>Edit</p>
                    </section>
                    <section className={`flex gap-[10px] items-center`}>
                        <button onClick={(e) => { setPermissions(e, "EDIT_" + label, false) }} className={`w-[16px] border h-[16px] rounded-[50%] border border-[2px] border-[#8C8C8C] relative`}>
                            <div className={`w-full h-full ${permissions.includes("EDIT_" + label) ? "hidden" : ""} rounded-inherit relative`}>
                                <ImageHolder src="/icons/role-tick.svg" />
                            </div>
                        </button>
                        <p className='font-400 text-[14px] leading-[18.23px font-pushpennyBook]'>Hide</p>
                    </section>
                </div>

            </div>
        )
    }
    if (parent == "AGENCY" || parent == "INSIGHTS_AND_REPORTS" || parent == "LOAN") {
        return (
            <div className="flex justify-between">
                <p className='font-pushpennyBook text-[14px] font-400 leading-[22px] text-[#6E7883]'>{label}</p>
                <div className=' w-[198px] flex justify-around'>
                    <section className={`flex gap-[10px] items-center`}>
                        <button onClick={(e) => { setPermissions(e, "VIEW_" + label, true) }} className={`w-[16px] border h-[16px] rounded-[50%] border border-[2px] border-[#8C8C8C] relative`}>
                            <div className={`w-full h-full ${permissions.includes("VIEW_" + label) ? "" : "hidden"} rounded-inherit relative`}>
                                <ImageHolder src="/icons/role-tick.svg" />
                            </div>
                        </button>
                        <p className='font-400 text-[14px] leading-[18.23px font-pushpennyBook]'>View</p>
                    </section>
                    <section className={`flex gap-[10px] items-center`}>
                        <button onClick={(e) => { setPermissions(e, "EDIT_" + label, true) }} className={`w-[16px] border h-[16px] rounded-[50%] border border-[2px] border-[#8C8C8C] relative`}>
                            <div className={`w-full h-full ${permissions.includes("EDIT_" + label) ? "" : "hidden"} rounded-inherit relative`}>
                                <ImageHolder src="/icons/role-tick.svg" />
                            </div>
                        </button>
                        <p className='font-400 text-[14px] leading-[18.23px font-pushpennyBook]'>Edit</p>
                    </section>
                    <section className={`flex gap-[10px] items-center`}>
                        <button onClick={(e) => { setPermissions(e, "VIEW_" + label, false, "EDIT_" + label) }} className={`w-[16px] border h-[16px] rounded-[50%] border border-[2px] border-[#8C8C8C] relative`}>
                            <div className={`w-full h-full ${permissions.includes("VIEW_" + label) || permissions.includes("EDIT_" + label) ? "hidden" : ""} rounded-inherit relative`}>
                                <ImageHolder src="/icons/role-tick.svg" />
                            </div>
                        </button>
                        <p className='font-400 text-[14px] leading-[18.23px font-pushpennyBook]'>Hide</p>
                    </section>
                </div>

            </div>
        )
    }
}